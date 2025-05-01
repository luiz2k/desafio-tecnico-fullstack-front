import { twMerge } from "tailwind-merge";

type FormBodyProps = React.HTMLAttributes<HTMLDivElement>;

export function FormBody({ children, className, ...props }: FormBodyProps) {
  return (
    <div className={twMerge("space-y-4", className)} {...props}>
      {children}
    </div>
  );
}
