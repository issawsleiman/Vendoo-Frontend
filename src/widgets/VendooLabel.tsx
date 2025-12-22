import { useThemeContext } from "../context/ThemeContext";
import { TextColorDark, TextColorWhite } from "../utils/constants/colors";

interface LabelProps {
  /** The text content of the label */
  text: string;

  /** The id of the input this label is associated with */
  htmlFor?: string;
  className?: string;
}

export default function VendooLabel({ text, htmlFor }: LabelProps) {
  // getting current theme
  const currentTheme = useThemeContext();
  return (
    <label
      htmlFor={htmlFor}
      style={{
        color: `${currentTheme.isDark ? TextColorDark : TextColorWhite}`,
      }}
      className="inline-block w-full text-l md:text-2xl lg:text-2xl font-medium pb-2"
    >
      {text}
    </label>
  );
}
