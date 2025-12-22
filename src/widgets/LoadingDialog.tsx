import { Loader2 } from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";
import { SaleBadgeColorDark, AccentColorDark } from "../utils/constants/colors";

export default function LoadingDialog() {
  const isDark = useThemeContext().isDark;
  return (
    <div
      className="min-h-screen flex justify-center items-center p-10"
      style={
        {
          // backgroundColor: `${isDark ? SecondaryColorDark : SecondaryColorWhite}`,
        }
      }
    >
      <Loader2
        className="animate-spin"
        size={40}
        color={isDark ? SaleBadgeColorDark : AccentColorDark}
      />
    </div>
  );
}
