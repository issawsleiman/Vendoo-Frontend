import { X, Settings, Store } from "lucide-react";
import { useDashboardContext } from "../../../context/DashboardContext";
import { useUserStore } from "../../../store/useUserStore";
import {
  TextColorDark,
  TextColorWhite,
  MutedTextColorDark,
  MutedTextColorWhite,
} from "../../../utils/constants/colors";
import { dashboardNavList } from "../../../utils/constants/lists";
import { NavListTile } from "./list/NavListTile";

import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useShopStore } from "../../../store/useShopStore";
import { useThemeContext } from "../../../context/ThemeContext";

interface DashboardSidebarProps {
  isDark: boolean;
  onClose: () => void;
}

export default function DashboardSideBar({ isDark }: DashboardSidebarProps) {
  const dashboardContext = useDashboardContext();
  const shopStore = useShopStore();
  const { colors } = useThemeContext();

  const navigate = useNavigate();

  const translateX = dashboardContext.dashboardMobileMenuState
    ? "translate-x-0"
    : "-translate-x-full";

  return (
    <aside
      className={`w-64 flex flex-col ${translateX} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 transition-transform duration-300 border-r`}
      style={{
        backgroundColor: colors.bgColor,
        borderColor: colors.borderColor,
      }}
    >
      {/* Logo */}
      <div
        className="h-16 px-6 flex items-center justify-between border-b"
        style={{ borderColor: colors.borderColor }}
      >
        <div className="px-4 py-5 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <h1
                className="text-lg font-bold  tracking-wide"
                style={{ color: colors.textColor }}
              >
                {formatShopName(shopStore.shop?.shopName) || "My Shop"}
              </h1>
              <span className="text-xs text-gray-400">Seller Dashboard</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => dashboardContext.setDashboardMobileMenuState(false)}
          className="lg:hidden p-2 rounded-lg hover:opacity-80 transition-colors"
          style={{ backgroundColor: isDark ? "#374151" : "#f1f5f9" }}
        >
          <X
            size={20}
            style={{ color: isDark ? TextColorDark : TextColorWhite }}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {dashboardNavList.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              dashboardContext.setSelectedDashboardItem(item.label);
              dashboardContext.setDashboardMobileMenuState(false);
              navigate(`/${item.id}`);
            }}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all hover:opacity-80 cursor-pointer"
            style={{
              backgroundColor:
                item.label === dashboardContext.selectedDashboardItem
                  ? isDark
                    ? "#1e40af20"
                    : "#dbeafe"
                  : "transparent",
            }}
          >
            <NavListTile item={item} />
            {item.badge && (
              <span className="bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div
        className="p-4 border-t space-y-2"
        style={{ borderColor: colors.borderColor }}
      >
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:opacity-80"
          style={{
            backgroundColor: isDark ? "#374151" : "#f1f5f9",
            color: isDark ? TextColorDark : TextColorWhite,
          }}
          onClick={() => {
            dashboardContext.setSelectedDashboardItem("Settings");
            dashboardContext.setDashboardMobileMenuState(false);
            navigate("/settings");
          }}
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>

        <UserAccountInfo
          isDark={isDark}
          onClick={() => {
            dashboardContext.setSelectedDashboardItem("profile");
            navigate(`/profile`);
            dashboardContext.setDashboardMobileMenuState(false);
          }}
        />
      </div>
    </aside>
  );
}

interface UserAccountInfoProps {
  isDark: boolean;
  onClick: () => void;
}
function UserAccountInfo({ isDark, onClick }: UserAccountInfoProps) {
  const user = useUserStore();

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer"
      style={{
        backgroundColor: isDark ? "#374151" : "#f1f5f9",
      }}
      onClick={() => onClick()}
    >
      <UserAvatar />
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold truncate"
          style={{ color: isDark ? TextColorDark : TextColorWhite }}
        >
          {user.profile?.name}
        </p>
        <p
          className="text-xs truncate"
          style={{ color: isDark ? MutedTextColorDark : MutedTextColorWhite }}
        >
          {user.profile?.email}
        </p>
      </div>
    </div>
  );
}
function UserAvatar() {
  const userStore = useUserStore();
  return (
    <Avatar
      src={userStore.profile!.image!}
      alt={userStore.profile?.name?.charAt(0)}
      sx={{ xs: 120, s: 120, md: 120, lg: 100 }}
    />
  );
}
/**
 * Formats shop name to proper case (e.g., "iwstech" → "IWS Tech")
 */
const formatShopName = (name: string | undefined): string => {
  if (!name) return "";

  // If it's all lowercase and contains no spaces, try to intelligently split
  if (name === name.toLowerCase() && !name.includes(" ")) {
    // Common patterns: "iwstech" → "IWS Tech"
    // You can customize this based on your needs
    return name
      .split(/(?=[A-Z])|(?<=\d)(?=[a-zA-Z])|(?<=[a-zA-Z])(?=\d)/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // Otherwise, just capitalize first letter of each word
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
