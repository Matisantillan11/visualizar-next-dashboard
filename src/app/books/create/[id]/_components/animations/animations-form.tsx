import Dropzone from "@/components/ui/dropzone";
import FormInput from "@/components/ui/form-input";
import { useCallback } from "react";

const DEFAULT_ANIMATION_FOLDER = "animations";

interface Animation {
  animationName: string;
  animationUrls: string[];
}

interface AnimationsFormProps {
  label: string;
  animations: Animation[];
  setAnimations: (animations: Animation[]) => void;
  required?: boolean;
  requestId?: string;
  onUploadComplete?: (url: string) => void;
  onFileRemoved?: (url: string) => void;
}

export const AnimationsForm = ({
  label,
  animations,
  setAnimations,
  required,
  requestId,
  onUploadComplete,
  onFileRemoved,
}: AnimationsFormProps) => {
  const handleAddField = () => {
    setAnimations([
      ...animations,
      {
        animationName: "",
        animationUrls: [],
      },
    ]);
  };

  const handleNameChange = (index: number, name: string) => {
    const newAnimations = [...animations];
    newAnimations[index].animationName = name;
    setAnimations(newAnimations);
  };

  const handleUploadComplete = useCallback(
    (url: string, index: number) => {
      if (onUploadComplete) onUploadComplete(url);

      const newAnimations = [...animations];
      const currentUrls = newAnimations[index].animationUrls || [];

      // Check if URL is already present to avoid duplicates if necessary
      if (!currentUrls.includes(url)) {
        if (currentUrls.length === 1 && currentUrls[0] === "") {
          newAnimations[index].animationUrls = [url];
        } else {
          newAnimations[index].animationUrls = [...currentUrls, url];
        }

        setAnimations(newAnimations);
      }
    },
    [animations, onUploadComplete, setAnimations],
  );

  const handleFileRemoved = useCallback(
    (url: string, index: number) => {
      if (onFileRemoved) onFileRemoved(url);

      const newAnimations = [...animations];
      const currentUrls = newAnimations[index].animationUrls || [];
      newAnimations[index].animationUrls = currentUrls.filter((a) => a !== url);
      setAnimations(newAnimations);
    },
    [animations, onFileRemoved, setAnimations],
  );

  const slugify = (text: string) => {
    return text
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-");
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-body-sm font-medium text-dark dark:text-white">
          {label}
          {required && <span className="ml-1 select-none text-red">*</span>}
        </p>

        <button
          type="button"
          onClick={handleAddField}
          className="text-sm font-medium text-primary hover:underline"
        >
          Agregar animación
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {animations.map((field, index) => {
          const safeName = field.animationName
            ? slugify(field.animationName)
            : `anim-${index}`;
          const folderPath = `${DEFAULT_ANIMATION_FOLDER}/${requestId}/${safeName}`;

          return (
            <div
              key={index}
              className="flex w-full flex-col gap-4 rounded-lg border border-stroke p-4 dark:border-dark-3"
            >
              <FormInput
                name={`animation-name-${index}`}
                label="Nombre de la animación"
                placeholder="Nombre de la animación"
                type="text"
                required
                value={field.animationName}
                onChange={(e) => handleNameChange(index, e.target.value)}
              />

              <div className="flex gap-4">
                <div className="flex-1">
                  <Dropzone
                    folder={folderPath}
                    onUploadComplete={(url: string) =>
                      handleUploadComplete(url, index)
                    }
                    onFileRemoved={(url: string) =>
                      handleFileRemoved(url, index)
                    }
                    maxFiles={1}
                    allowedFileTypes={["model/obj"]}
                    required
                    label="Modelo (.obj)"
                    height={200}
                    disabled={field.animationName === ""}
                  />
                </div>
                <div className="flex-1">
                  <Dropzone
                    folder={folderPath}
                    onUploadComplete={(url: string) =>
                      handleUploadComplete(url, index)
                    }
                    onFileRemoved={(url: string) =>
                      handleFileRemoved(url, index)
                    }
                    maxFiles={1}
                    allowedFileTypes={["image/png"]}
                    required
                    label="Imagen (.png)"
                    height={200}
                    disabled={field.animationName === ""}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
