import { motion } from "framer-motion";
import { useThemeContext } from "../context/ThemeContext";
import {
  TextColorDark,
  TextColorWhite,
  AccentColorDark,
  AccentColorWhite,
} from "../utils/constants/colors";

interface headerProps {
  title: string;
  description: string;
}

// This is the title & description section heading for each page
export default function SectionHeadingText({
  title,
  description,
}: headerProps) {
  const currentTheme = useThemeContext();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h2
        style={{
          color: `${currentTheme.isDark ? TextColorDark : TextColorWhite}`,
        }}
        className="text-3xl md:text-4xl font-bold mb-3"
      >
        {title}
      </h2>
      <p
        style={{
          color: `${currentTheme.isDark ? AccentColorDark : AccentColorWhite}`,
        }}
        className=" max-w-2xl mx-auto"
      >
        {description}
      </p>
    </motion.div>
  );
}
