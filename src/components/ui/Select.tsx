import React, { ReactNode, ChangeEvent } from "react";

type SelectProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  className?: string;
};

const Select: React.FC<SelectProps> = ({
  value,
  onChange,
  children,
  className = "",
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 ${className}`}
    >
      {children}
    </select>
  );
};

export default Select;
