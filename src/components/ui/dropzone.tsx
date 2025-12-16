"use client";

import { storeFile } from "@/lib/storage";
import Uppy from "@uppy/core";
import "@uppy/core/css/style.min.css";
// DragDrop is removed in Uppy 5.x. We use Dashboard or implement useDropzone.
// We will use Dashboard as it is the standard and easiest integration.
// @ts-ignore
import "@uppy/dashboard/css/style.min.css";
import DashboardComponent from "@uppy/react/dashboard";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

interface DropzoneProps {
  bucketName?: string;
  folder?: string;
  allowedFileTypes?: string[];
  maxFiles?: number;
  onUploadComplete?: (url: string) => void;
  onFileRemoved?: (url: string) => void;
  label?: string;
  required?: boolean;
  height?: number;
  disabled?: boolean;
}

const SUPABASE_Url = process.env.NEXT_PUBLIC_SUPABASE_URL;

export default function Dropzone({
  bucketName = "visualizar-attachments",
  folder = "uploads",
  allowedFileTypes = ["image/*", ".obj"],
  maxFiles = 1,
  onUploadComplete,
  onFileRemoved,
  label,
  required,
  height = 300,
  disabled = false,
}: DropzoneProps) {
  const { theme } = useTheme();

  // We use useState to initialize Uppy ensuring it is created only once per component mount.
  const [uppy] = useState(() => {
    const uppyInstance = new Uppy({
      id: "uppy-dropzone",
      autoProceed: false,
      restrictions: {
        maxNumberOfFiles: maxFiles,
        allowedFileTypes: allowedFileTypes,
      },
      // Note: Uppy restrictions are checked when files are added.
    });

    return uppyInstance;
  });

  // Handle refs for folder and bucket to access latest values in event handlers if needed
  // However, Uppy event handlers are persistent.
  // Ideally, we should update the meta when file is added using the current props.
  // Since we create Uppy once, we need to listen to 'file-added' and update meta.

  // We can use a ref to store current props
  const propsRef = React.useRef({
    folder,
    bucketName,
    onUploadComplete,
    onFileRemoved,
  });

  useEffect(() => {
    propsRef.current = { folder, bucketName, onUploadComplete, onFileRemoved };
  }, [folder, bucketName, onUploadComplete, onFileRemoved]);

  useEffect(() => {
    // Add event listeners
    const onFileAdded = async (file: any) => {
      try {
        const { folder, bucketName } = propsRef.current;

        const cleanName = file.name
          ? file.name
              .toLowerCase()
              .replace(/[^a-z0-9.]/g, "-")
              .replace(/-+/g, "-")
          : "unnamed";

        const objectName = `${folder}/${cleanName}`.replace(/\/{2,}/g, "/");

        // Store meta for file removal logic
        uppy.setFileMeta(file.id, {
          bucketName: bucketName,
          objectName: objectName,
          contentType: file.type || "application/octet-stream",
        });

        // Set state to uploading
        uppy.setFileState(file.id, {
          progress: {
            uploadStarted: Date.now(),
            uploadComplete: false,
            percentage: 0,
            bytesUploaded: 0,
            bytesTotal: file.size,
          },
        });

        // Upload directly to Supabase
        const uploadedUrl = await storeFile(file.data, bucketName, objectName);

        if (uploadedUrl) {
          // Mark complete in Uppy
          uppy.setFileState(file.id, {
            progress: {
              uploadStarted: Date.now(),
              uploadComplete: true,
              percentage: 100,
              bytesUploaded: file.size,
              bytesTotal: file.size,
            },
          });
          uppy.emit("upload-success", file, {
            status: 200,
            body: {},
            uploadURL: uploadedUrl,
          });

          if (propsRef.current.onUploadComplete) {
            propsRef.current.onUploadComplete(uploadedUrl);
          }
        } else {
          throw new Error("Upload failed, no URL returned");
        }
      } catch (err: any) {
        console.error("Error in onFileAdded upload:", err);
        uppy.emit("upload-error", file, err);
      }
    };

    const onFileRemoved = (file: any) => {
      const { objectName, bucketName: metaBucketName } = file.meta;
      // Only trigger removal if we have the objectName (meaning it was prepared/uploaded)
      if (objectName && propsRef.current.onFileRemoved) {
        const finalBucket = metaBucketName || propsRef.current.bucketName;
        // Reconstruct URL to pass to removal handler
        const publicUrl =
          `${SUPABASE_Url}/storage/v1/object/public/${finalBucket}/${objectName}`.replace(
            /([^:]\/)\/+/g,
            "$1",
          );
        propsRef.current.onFileRemoved(publicUrl);
      }
    };

    uppy.on("file-added", onFileAdded);
    uppy.on("file-removed", onFileRemoved);

    return () => {
      uppy.off("file-added", onFileAdded);
      uppy.off("file-removed", onFileRemoved);
    };
  }, [uppy]); // Only run once as uppy instance is stable

  return (
    <div className="w-full">
      {label ? (
        <p className="text-body-sm font-medium text-dark dark:text-white">
          {label}
          {required && <span className="mx-2 text-red-500">*</span>}
        </p>
      ) : null}

      <div className="relative mt-3 w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary">
        <DashboardComponent
          uppy={uppy}
          theme={theme === "dark" ? "dark" : "light"}
          width="100%"
          height={height}
          hideUploadButton
          showRemoveButtonAfterComplete
          note={`Allowed: ${allowedFileTypes.join(", ")}`}
          className="z-10 h-full max-h-[300px] min-h-[250px]"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
