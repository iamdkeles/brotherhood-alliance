import React, { FC } from "react";

interface CheckCircleIconProps {
  className?: string;
}

const CheckCircleIcon: FC<CheckCircleIconProps> = ({
  className = "w-6 h-6 text-primary-600 mt-1 mr-3 flex-shrink-0",
}) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default CheckCircleIcon;
