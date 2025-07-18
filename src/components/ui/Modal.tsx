import React, { ReactNode } from "react";
import { XCircle } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "default" | "lg" | "xl";
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "default",
}) => {
  if (!isOpen) return null;

  const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
    sm: "max-w-md",
    default: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-xl ${sizeClasses[size]} w-full mx-4 max-h-[90vh] overflow-y-auto`}
      >
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-red-600 transition-colors"
              aria-label="Close modal"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
