import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type FormWrapperProps = React.FormHTMLAttributes<HTMLFormElement>;

export const FormWrapper = forwardRef<HTMLFormElement, FormWrapperProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <form
        className={twMerge(
          "w-full max-w-md space-y-8 rounded-md bg-white p-8 shadow-lg",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </form>
    );
  },
);

FormWrapper.displayName = "FormWrapper";
