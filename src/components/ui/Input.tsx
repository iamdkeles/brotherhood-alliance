import { useState, forwardRef } from "react";
import { Check, Loader2 } from "lucide-react";

interface InputProps {
  name: string;
  value: string | number;
  placeholder: string;
  label?: string;
  labelTextColor?: string;
  rules?: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  isLoading?: boolean;
  withAction?: boolean;
  required?: boolean;
  actionIndicator?: React.ReactNode;
  $height?: 40 | 44 | 48;
  background?: string;
  opacity?: number;
  onValidate?: (value: string) => void;
  validateSuccess?: boolean | null;
  validateError?: boolean | null;
  className?: string;
}

const heightMapping: Record<number, string> = {
  40: "h-10",
  44: "h-11",
  48: "h-12",
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      value,
      type,
      placeholder,
      label,
      error,
      rules,
      disabled,
      isLoading,
      onChange = () => {},
      withAction,
      actionIndicator,
      required = false,
      $height = 48,
      background,
      opacity,
      labelTextColor = "#344054",
      onValidate,
      validateSuccess,
      validateError,
      className = "",
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [debounceTimeout, setDebounceTimeout] =
      useState<NodeJS.Timeout | null>(null);

    const heightClass = $height ? heightMapping[$height] : "";

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prevState) => !prevState);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      // Call the provided onChange function if exists
      if (onChange) {
        onChange(e);
      }

      // Clear the previous timeout
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      // Set a new timeout for validation if the onValidate function is provided
      if (onValidate) {
        const timeout = setTimeout(() => {
          onValidate(newValue);
        }, 1000); // 1 second debounce time

        setDebounceTimeout(timeout);
      }
    };

    return (
      <div className={`block relative ${error ? "px-2 py-1" : "p-1"}`}>
        {label && (
          <div className="flex mb-1.5">
            <span
              className="text-sm font-medium"
              style={{ color: labelTextColor }}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </span>
          </div>
        )}

        <div className="relative">
          <input
            ref={ref}
            type={type === "password" && isPasswordVisible ? "text" : type}
            name={name}
            value={value}
            placeholder={placeholder}
            className={`
              w-full bg-transparent outline-none text-gray-900 border transition px-3 rounded
              hover:ring-1 hover:ring-blue-200 focus:ring-1 focus:ring-blue-200 block 
              placeholder:text-gray-500 py-2
              ${error ? "border-red-500" : "border-gray-300"}
              ${heightClass}
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              ${className}
            `
              .replace(/\s+/g, " ")
              .trim()}
            style={{
              backgroundColor: background || "transparent",
              opacity: opacity !== undefined ? opacity : 1,
            }}
            onChange={handleChange}
            disabled={disabled}
          />

          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Loader2 size={18} className="text-gray-400 animate-spin" />
            </div>
          )}

          {/* Custom action indicator */}
          {withAction && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {actionIndicator}
            </div>
          )}

          {/* Password visibility toggle */}
          {type === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 hover:text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? "🙈" : "👁️"}
            </button>
          )}

          {/* Validation success */}
          {validateSuccess && !isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Check className="text-emerald-500" size={16} />
            </div>
          )}

          {/* Validation error */}
          {validateError && !isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="text-red-500">✗</span>
            </div>
          )}
        </div>

        {/* Helper text or rules */}
        <div className="flex flex-col space-y-2">
          {!error && rules && (
            <span className="text-xs text-gray-500">{rules}</span>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-1">
            <span className="text-sm text-red-600">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
