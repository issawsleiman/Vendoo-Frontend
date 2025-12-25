import { useEffect, useMemo } from "react";
import { useThemeContext } from "../../../context/ThemeContext";
import { useDashboardContext } from "../../../context/DashboardContext";
import { DASHBOARD_PG_NAME } from "./layout";
import { useShopStore } from "../../../store/useShopStore";
import { useShopContext } from "../../../context/ShopContext";
import { useUserStore } from "../../../store/useUserStore";

export default function DashboardPage() {
  const { colors } = useThemeContext();
  const { getShopByUserID } = useShopContext();
  const shopStore = useShopStore();
  const userStore = useUserStore();
  const { setSelectedDashboardItem } = useDashboardContext();

  const userID = useMemo(
    () => userStore.profile?.userID,
    [userStore.profile?.userID]
  );

  useEffect(() => {
    if (!userID) return;
    if (shopStore.shop !== null) {
      console.log("ShopDetails fetched from store");
      return;
    }

    console.log("Fetching ShopDetails from server");
    const getShopDetails = async (id: string) => {
      try {
        const shopDetails = await getShopByUserID(id);
        console.log("Shop Details:", shopDetails);
        shopStore.setUserShop(shopDetails);
      } catch (error) {
        console.error("Failed to fetch shop details:", error);
      }
    };
    getShopDetails(userID!);
  }, [userID, shopStore.shop]);

  useEffect(() => {
    setSelectedDashboardItem(DASHBOARD_PG_NAME);
  }, [setSelectedDashboardItem]);

  return (
    <div
      className="w-full h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: colors.bgColor }}
    >
      <div className="text-center">
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
