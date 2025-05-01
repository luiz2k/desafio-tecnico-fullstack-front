type FormSubtitleProps = React.HTMLAttributes<HTMLParagraphElement>;

export function FormSubtitle({
  children,
  className,
  ...props
}: FormSubtitleProps) {
  return (
    <p className={className} {...props}>
      {children}
    </p>
  );
}
