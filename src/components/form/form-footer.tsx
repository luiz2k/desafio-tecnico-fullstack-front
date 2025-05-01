import { twMerge } from "tailwind-merge";

type FormFooterProps = React.HTMLAttributes<HTMLDivElement>;

export function FormFooter({ children, className, ...props }: FormFooterProps) {
  return (
    <div className={twMerge("grid gap-2", className)} {...props}>
      {children}
    </div>
  );
}
