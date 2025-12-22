interface TextButtonProps {
  text: string;
  textColor?: string;
  className?: string;
  onClick: () => void;
  type?: "submit" | "button";
}

export const TextButton = ({
  text,
  onClick,
  textColor = "black",
  className,
  type,
}: TextButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    className={`text-xs cursor-pointer underline ${className}`}
    style={{ color: `${textColor}` }}
  >
    {text}
  </button>
);
