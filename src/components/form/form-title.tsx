import { twMerge } from "tailwind-merge";

type FormTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export function FormTitle({ children, className, ...props }: FormTitleProps) {
  return (
    <h1 className={twMerge("text-3xl font-bold", className)} {...props}>
      {children}
    </h1>
  );
}
