import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, helperText, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-secondary-700"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`
            block w-full rounded-md border-0 py-1.5 px-3 text-secondary-900 
            shadow-sm ring-1 ring-inset ring-secondary-300 placeholder:text-secondary-400 
            focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6
            ${error ? "ring-red-300 focus:ring-red-500" : ""}
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="text-sm text-secondary-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
