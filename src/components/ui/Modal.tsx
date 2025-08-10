import React, { ReactNode, useEffect, useState, useCallback } from "react";
import { XCircle } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  headerContent?: ReactNode;
  footerContent?: ReactNode;
  size?: "sm" | "default" | "lg" | "xl";
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  headerContent,
  footerContent,
  size = "default",
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsAnimating(false);
    // Delay the actual close to allow animation to complete
    setTimeout(onClose, 300);
  }, [onClose]);

  // Close on background click
  const handleBackgroundClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const sizeClasses: Record<NonNullable<ModalProps["size"]>, string> = {
    sm: "w-80",
    default: "w-96",
    lg: "w-[500px]",
    xl: "w-[600px]",
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 transition-opacity duration-300 flex items-center justify-end z-50 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleBackgroundClick}
    >
      <div
        className={`bg-white h-full ${sizeClasses[size]} flex flex-col transform transition-transform duration-300 ease-in-out ${
          isAnimating ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="flex-shrink-0 p-6 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
            <button
              onClick={handleClose}
              className="text-slate-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50 rounded-full"
              aria-label="Close modal"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
          {/* Additional header content */}
          {headerContent && (
            <div className="text-sm text-slate-600">{headerContent}</div>
          )}
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 p-6 overflow-y-auto">{children}</div>

        {/* Footer Section */}
        {footerContent && (
          <div className="flex-shrink-0 p-6 border-t border-slate-200 bg-slate-50">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
