import { create } from "zustand";

export type ToastType = "info" | "error";

export interface ToastConfig {
  replacePrevious?: boolean;
}

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  config?: ToastConfig;
}

interface ToastStoreState {
  toasts: ToastItem[];
  addToast: (message: string, type?: ToastType, config?: ToastConfig) => void;
  removeToast: (id: string) => void;
}

const useToastStore = create<ToastStoreState>((set) => ({
  toasts: [], // 여기서 애니메이션이 초기화 되는듯??
  addToast: (message, type = "info", config = { replacePrevious: false }) => {
    const id = Date.now().toString();

    set((state) => {
      if (config.replacePrevious) {
        return { toasts: [{ id, message, type, config }] };
      } else {
        return { toasts: [...state.toasts, { id, message, type, config }] };
      }
    });
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }));
  }
}));

export default useToastStore;

