import React, { createContext, useState } from "react";
import * as Toast from "@radix-ui/react-toast";

export const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = ({ title, description, type = "success" }) => {
    const id = crypto.randomUUID();

    setToasts((prev) => [...prev, { id, title, description, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Toast.Provider swipeDirection="right">
        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            className="bg-surface border border-border rounded-2xl p-4 shadow-xl"
          >
            <Toast.Title className="font-semibold">{toast.title}</Toast.Title>

            <Toast.Description className="text-sm text-text-muted">
              {toast.description}
            </Toast.Description>
          </Toast.Root>
        ))}

        <Toast.Viewport
          className="
          fixed bottom-6 right-6
          w-[380px]
          flex flex-col gap-3
          z-[9999]
        "
        />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
