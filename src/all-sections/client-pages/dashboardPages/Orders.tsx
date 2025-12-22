import { useEffect } from "react";
import { useDashboardContext } from "../../../context/DashboardContext";
import { useThemeContext } from "../../../context/ThemeContext";
import { DASHBOARD_PG_ORDERS_NAME } from "./layout";
import { PackageX } from "lucide-react";

export default function OrdersPage() {
  const { colors } = useThemeContext();
  const { setSelectedDashboardItem } = useDashboardContext();

  useEffect(() => {
    setSelectedDashboardItem(DASHBOARD_PG_ORDERS_NAME);
  }, []);

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: colors.bgColor }}
    >
      <div className="text-center max-w-md">
        <div
          className="mx-auto mb-6 w-14 h-14 flex items-center justify-center rounded-full"
          style={{ backgroundColor: colors.cardBgColor }}
        >
          <PackageX size={28} style={{ color: colors.mutedTextColor }} />
        </div>

        <h1 className="text-3xl font-bold" style={{ color: colors.textColor }}>
          No Orders Yet
        </h1>

        <p className="mt-3 text-sm" style={{ color: colors.mutedTextColor }}>
          You haven’t received any orders yet. When customers place orders,
          they’ll appear here.
        </p>
      </div>

      <div
        className="mt-10 rounded-xl px-8 py-6 text-center border"
        style={{
          backgroundColor: colors.cardBgColor,
          borderColor: colors.borderColor,
        }}
      >
        <p className="text-sm" style={{ color: colors.mutedTextColor }}>
          Start promoting your products to get your first order 🚀
        </p>
      </div>
    </div>
  );
}
