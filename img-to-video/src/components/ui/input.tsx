import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

const Input: React.FC<InputProps> = ({
  variant = "default",
  size = "md",
  className,
  ...props
}) => {
  const baseStyles =
    "block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    default: "border border-input bg-background text-foreground",
    outline: "border-2 border-primary bg-transparent text-foreground",
  };

  const sizeStyles = {
    sm: "h-8 px-2 text-sm",
    md: "h-10 px-3 text-base",
    lg: "h-12 px-4 text-lg",
  };

  return (
    <input
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    />
  );
};

export { Input };
