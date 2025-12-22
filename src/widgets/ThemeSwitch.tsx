import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useThemeContext } from "../context/ThemeContext";
import { SaleBadgeColorDark, AccentColorDark } from "../utils/constants/colors";

export default function ThemeSwitch() {
  const thee = useThemeContext();

  return (
    <motion.div
      onClick={() => thee.setThemeToggle()}
      className="cursor-pointer"
      whileTap={{ scale: 0.8 }}
    >
      {thee.isDark ? (
        <motion.div
          key="sun"
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 50 }}
          transition={{ duration: 0.3 }}
        >
          <Sun size={35} color={SaleBadgeColorDark} />
        </motion.div>
      ) : (
        <motion.div
          key="moon"
          initial={{ opacity: 0, rotate: 360 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          <Moon size={35} color={AccentColorDark} />
        </motion.div>
      )}
    </motion.div>
  );
}
