import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./dialog-core";

export const Modal = ({
  children,
  title,
  description,
  isOpen,
  onOpenChange,
}: {
  children?: ReactNode;
  title: string;
  description: string | ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="flex flex-col items-center justify-center">
          <DialogHeader className="text-xl font-bold">{title}</DialogHeader>
          <DialogDescription className="text-md">
            {description}
          </DialogDescription>
        </div>

        {children && <DialogFooter>{children}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
