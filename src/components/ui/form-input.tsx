import * as React from "react";

import { cn } from "@/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="flex  flex-col gap-2 justify-start">
        <label className="text-start">{label}</label>
        <div className="flex flex-col">
          <input
            type={type}
            className={cn(
              "flex h-8 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ",
              className,
              error ? "border-red-500" : ""
            )}
            ref={ref}
            {...props}
          />
          {error && <span className="text-sm text-red-500 text-start">{error}</span>}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
