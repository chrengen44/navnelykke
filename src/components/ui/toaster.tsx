
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        duration: 5000,
        style: {
          background: "white",
          color: "black",
          border: "1px solid #e2e8f0",
        },
      }}
    />
  );
}
