import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import {
  SaleBadgeColorDark,
  AccentColorWhite,
} from "../utils/constants/colors";

interface VendooButtonProps {
  className?: string;
  linkTo?: string;
  onClick?: () => void;
  children: React.ReactNode;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function VendooButton({
  className = "",
  linkTo,
  children: text,
  onClick,
  isDisabled = false,
  type = "button",
}: VendooButtonProps) {
  // Get the current theme
  const currentTheme = useThemeContext();

  // Determine background color based on theme
  const backgroundColor = currentTheme.isDark
    ? SaleBadgeColorDark
    : AccentColorWhite;

  const textColor = currentTheme.isDark ? "black" : "white";

  const buttonClasses = `px-8 py-3 rounded-full font-semibold text-center cursor-pointer overflow-hidden select-none shadow-lg ${className}`;

  // This wrapper adds motion effects to the button/link
  // Render Link if linkTo is provided, else render button
  const MotionWrapper = (
    <motion.div
      className={`w-fit select-none ${className} `}
      whileHover={{ scale: !isDisabled ? 1.05 : undefined }}
      whileTap={{ scale: !isDisabled ? 0.95 : undefined }}
    >
      {linkTo ? (
        <Link
          to={`/${linkTo}`}
          onClick={onClick}
          style={{ backgroundColor, color: textColor }}
          className={buttonClasses}
        >
          {text}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          style={{ backgroundColor, color: textColor }}
          className={buttonClasses}
          disabled={isDisabled}
        >
          {text}
        </button>
      )}
    </motion.div>
  );

  return MotionWrapper;
}
