import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ header, footer, children, className, ...props }) => {
  return (
    <div
      className={cn(
        "border rounded-lg shadow-sm bg-background text-foreground",
        className
      )}
      {...props}
    >
      {header && (
        <div className="border-b p-4">
          {header}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
      {footer && (
        <div className="border-t p-4">
          {footer}
        </div>
      )}
    </div>
  );
};

export { Card };
