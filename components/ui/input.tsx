import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl border border-white/15 bg-neutral-900/70 px-4 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-white/30",
        className
      )}
      {...props}
    />
  );
}
