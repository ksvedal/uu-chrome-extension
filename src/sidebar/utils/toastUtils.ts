// toastUtils.ts
import { toast, ToastOptions, Slide } from 'react-toastify';

const defaultOptions: ToastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    progress: undefined,
    closeButton: false,
    transition: Slide,
    toastId: "the-toasht",
    icon: false
};

export function successToast(message: string, options?: ToastOptions) {
    toast.success(message, { ...defaultOptions, ...options });
}

export function errorToast(message: string, options?: ToastOptions) {
    toast.error(message, { ...defaultOptions, ...options });
}

export function infoToast(message: string, options?: ToastOptions) {
    toast.info(message, { ...defaultOptions, ...options });
}
