import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

export function VendooLogo({ shouldLightMode }: { shouldLightMode?: boolean }) {
  const { isDark } = useThemeContext();
  const navigate = useNavigate();

  // Decide logo source
  const logoSrc =
    !shouldLightMode && isDark
      ? "../assets/vendoo_logo_trans_white.png"
      : "../assets/vendoo_logo_trans.png";

  return (
    <img
      src={logoSrc}
      alt="Vendoo Logo"
      className="w-24 md:w-40 cursor-pointer"
      onClick={() => navigate("/home")}
    />
  );
}
