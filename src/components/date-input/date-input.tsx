import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type DateInputProps = React.InputHTMLAttributes<HTMLInputElement> & {};

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="date"
        className={twMerge(
          "peer h-[38px] w-full select-none rounded-md border border-surface bg-transparent px-2.5 py-2 text-sm text-black shadow-sm outline-none ring ring-transparent transition-all duration-300 ease-in placeholder:text-foreground/60 hover:border-primary hover:ring-primary/10 focus:border-primary focus:outline-none focus:ring-primary/10 disabled:pointer-events-none disabled:opacity-50 aria-disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[error=true]:border-error data-[success=true]:border-success data-[icon-placement=end]:pe-9 data-[icon-placement=start]:ps-9 dark:text-white",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

DateInput.displayName = "DateInput";
