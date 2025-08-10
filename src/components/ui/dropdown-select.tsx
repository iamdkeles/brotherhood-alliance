import { useState, useRef, useEffect, forwardRef } from "react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import Image from "next/image";

export interface IOption {
  id: string | number;
  label: string;
  image?: string;
  value?: string | boolean | number | null;
}

interface SelectProps {
  $height?: 40 | 44 | 48;
  name: string;
  label?: string;
  placeholder: string;
  info?: string;
  options: IOption[];
  selectedOption?: IOption | null;
  error?: string;
  disabled?: boolean;
  isLoading?: boolean;
  required?: boolean;
  onChange: (option: IOption) => void;
  background?: string;
  staticText?: string;
  textColor?: string;
}

const heightMapping: Record<number, string> = {
  40: "h-10",
  44: "h-11",
  48: "h-12",
};

const DropdownSelect = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      name,
      label,
      placeholder,
      info,
      options,
      selectedOption,
      error,
      disabled,
      isLoading,
      $height = 48,
      onChange,
      required = false,
      background,
      staticText,
      textColor,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filter, setFilter] = useState(selectedOption?.label || "");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSelect = (option: IOption) => {
      onChange(option);
      setIsOpen(false);
      setFilter("");
    };

    const heightClass = $height ? heightMapping[$height] : "";

    const filteredOptions =
      isOpen && filter === selectedOption?.label
        ? options
        : options.filter((option) =>
            option.label.toLowerCase().includes(filter.toLowerCase())
          );

    return (
      <div
        id={name}
        ref={ref || dropdownRef}
        className={`block w-full relative ${error ? "px-2 py-1" : "p-1"}`}
        style={{
          backgroundColor: background ? `${background}` : "transparent",
        }}
      >
        {label && (
          <div className="flex mb-1.5">
            <span className="text-sm font-medium text-gray-700">
              {label} {required && <span className="text-red-500">*</span>}
            </span>
          </div>
        )}

        <div className="relative">
          {isOpen ? (
            <div
              className={`relative w-full flex items-center rounded border hover:ring-1 hover:ring-blue-200 focus-within:ring-2 focus-within:ring-blue-200 pl-3 pr-10 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
            >
              {selectedOption?.image && (
                <div className="flex relative w-10 h-4 mr-2 overflow-hidden">
                  <Image
                    src={selectedOption.image}
                    alt=""
                    className="object-cover"
                  />
                </div>
              )}
              <input
                style={{ color: textColor || "#111827" }}
                type="text"
                className={`relative w-full cursor-default rounded bg-inherit py-1.5 pl-3 text-left outline-none border-none ${heightClass}`}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                autoFocus
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-3">
                {isLoading ? (
                  <Loader2 size={18} className="text-gray-400 animate-spin" />
                ) : (
                  <ChevronDown size={14} className="text-gray-400" />
                )}
              </div>
            </div>
          ) : (
            <button
              style={{ color: textColor || "#111827" }}
              type="button"
              className={`relative w-full cursor-default rounded bg-transparent pl-3 pr-10 text-left border hover:ring-1 hover:ring-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                error ? "border-red-500" : "border-gray-300"
              } ${heightClass} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
              aria-haspopup="listbox"
              aria-expanded={isOpen}
              aria-labelledby="listbox-label"
              onClick={() => !disabled && setIsOpen(!isOpen)}
              disabled={disabled}
            >
              <div className="flex items-center gap-3">
                {selectedOption?.image && (
                  <div className="flex relative w-10 h-4 overflow-hidden">
                    <Image
                      src={selectedOption.image}
                      alt=""
                      className="object-cover"
                    />
                  </div>
                )}
                {staticText ? (
                  <span className="w-full block truncate">{staticText}</span>
                ) : (
                  <>
                    {selectedOption?.label ? (
                      <span className="w-full block truncate">
                        {selectedOption?.label}
                      </span>
                    ) : (
                      <span className="w-full block truncate text-gray-500">
                        {placeholder}
                      </span>
                    )}
                  </>
                )}
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-3">
                {isLoading ? (
                  <Loader2 size={18} className="text-gray-400 animate-spin" />
                ) : (
                  <ChevronDown size={14} className="text-gray-400" />
                )}
              </div>
            </button>
          )}

          <div className="flex flex-col space-y-2">
            {!error && info && (
              <span className="text-xs text-gray-500">{info}</span>
            )}
          </div>

          {error && (
            <div className="mt-1">
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}

          {isOpen && (
            <ul
              className="absolute z-10 mt-1 max-h-56 w-full min-w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option.id}
                    className="relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-blue-50"
                    id={`listbox-option-${option.id}`}
                    role="option"
                    aria-selected={option.id === selectedOption?.id}
                    onClick={() => handleSelect(option)}
                  >
                    <div className="flex items-center">
                      {option.image && (
                        <div className="flex relative w-10 h-4 overflow-hidden mr-3">
                          <Image
                            src={option.image}
                            alt=""
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span
                        className={`ml-3 block truncate ${
                          option.id === selectedOption?.id
                            ? "font-semibold"
                            : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                    </div>
                    {option.id === selectedOption?.id && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                        <Check size={16} />
                      </span>
                    )}
                  </li>
                ))
              ) : (
                <li className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-500">
                  No options found
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    );
  }
);

DropdownSelect.displayName = "DropdownSelect";

export default DropdownSelect;
