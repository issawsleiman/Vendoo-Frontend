import { useEffect } from "react";
import { useThemeContext } from "../../../context/ThemeContext";
import { useDashboardContext } from "../../../context/DashboardContext";
import { DASHBOARD_PG_NAME } from "./layout";
import { useShopStore } from "../../../store/useShopStore";

export default function DashboardPage() {
  const { colors } = useThemeContext();
  const shopStore = useShopStore();
  const { setSelectedDashboardItem } = useDashboardContext();

  useEffect(() => {
    setSelectedDashboardItem(DASHBOARD_PG_NAME);
  }, [setSelectedDashboardItem]);

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: colors.bgColor }}
    >
      <div className="text-center">
        <p>Hii {shopStore.shop?.shopName}</p>
        <h1 className="text-3xl font-bold" style={{ color: colors.textColor }}>
          Dashboard
        </h1>
        <p className="mt-2 text-sm" style={{ color: colors.mutedTextColor }}>
          Overview of your business performance
        </p>
      </div>

      <div
        className="mt-10 rounded-xl px-8 py-6 text-center shadow border"
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
          The dashboard overview is currently under development.
        </p>
      </div>
    </div>
  );
}
