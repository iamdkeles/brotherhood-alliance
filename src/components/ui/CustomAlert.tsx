import React from "react";
import { AlertCircle } from "lucide-react";

interface CustomAlertProps {
  type?: "error" | "success" | "info";
  message: string;
}

const colorMap = {
  error: "bg-red-100 text-red-700 border-red-300",
  success: "bg-primary-100 text-primary-700 border-primary-500",
  info: "bg-secondary-100 text-secondary-700 border-secondary-500",
};

const iconMap = {
  error: <AlertCircle className="w-5 h-5 text-red-500" />,
  success: <AlertCircle className="w-5 h-5 text-primary-600" />,
  info: <AlertCircle className="w-5 h-5 text-secondary-600" />,
};

const CustomAlert: React.FC<CustomAlertProps> = ({
  type = "info",
  message,
}) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium ${colorMap[type]}`}
    >
      {iconMap[type]}
      <p>{message}</p>
    </div>
  );
};

export default CustomAlert;
