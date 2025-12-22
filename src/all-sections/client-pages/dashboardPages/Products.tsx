import { useEffect } from "react";
import { useDashboardContext } from "../../../context/DashboardContext";
import { useThemeContext } from "../../../context/ThemeContext";
import { DASHBOARD_PG_PRODUCTS_NAME } from "./layout";

export default function ProductsPage() {
  const { colors } = useThemeContext();
  const { setSelectedDashboardItem } = useDashboardContext();

  useEffect(() => {
    setSelectedDashboardItem(DASHBOARD_PG_PRODUCTS_NAME);
  }, [setSelectedDashboardItem]);

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: colors.bgColor }}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold" style={{ color: colors.textColor }}>
          Products
        </h1>
        <p className="mt-2 text-sm" style={{ color: colors.mutedTextColor }}>
          Manage your product catalog
        </p>
      </div>

      <div
        className="mt-10 rounded-lg px-8 py-6 text-center shadow"
        style={{
          backgroundColor: colors.cardBgColor,
          borderColor: colors.borderColor,
        }}
      >
        <p
          className="text-lg font-semibold"
          style={{ color: colors.textColor }}
        >
          🚧 Coming Soon
        </p>
        <p className="mt-2 text-sm" style={{ color: colors.mutedTextColor }}>
          Product management is currently under development.
        </p>
      </div>
    </div>
  );
}
