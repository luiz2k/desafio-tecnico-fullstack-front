import { twMerge } from "tailwind-merge";

type FormHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export function FormHeader({ children, className, ...props }: FormHeaderProps) {
  return (
    <div className={twMerge("space-y-1 text-center", className)} {...props}>
      {children}
    </div>
  );
}
