import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

type CardSectionProps = {
  children: ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hover = false,
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-slate-200 ${
        hover ? "hover:shadow-md transition-shadow" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardSectionProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`p-6 border-b border-slate-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardSectionProps> = ({
  children,
  className = "",
}) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export const CardTitle: React.FC<CardSectionProps> = ({
  children,
  className = "",
}) => {
  return (
    <h3 className={`text-lg font-semibold text-slate-900 ${className}`}>
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<CardSectionProps> = ({
  children,
  className = "",
}) => {
  return <p className={`text-slate-600 ${className}`}>{children}</p>;
};
