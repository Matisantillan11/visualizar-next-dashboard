import { toast as sonnerToast } from "sonner";

type ToastOptions = {
  title?: string;
  description?: string;
  duration?: number;
};

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    return sonnerToast.success(message, {
      description: options?.description,
      duration: options?.duration ?? 4000,
    });
  },
  error: (message: string, options?: ToastOptions) => {
    return sonnerToast.error(message, {
      description: options?.description,
      duration: options?.duration ?? 4000,
    });
  },
};

