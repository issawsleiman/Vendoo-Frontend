import { X, Settings } from "lucide-react";
import { useDashboardContext } from "../../../context/DashboardContext";
import { useUserStore } from "../../../store/useUserStore";
import {
  BorderColorDark,
  BorderColorWhite,
  PrimaryColorDark,
  PrimaryColorWhite,
  TextColorDark,
  TextColorWhite,
  MutedTextColorDark,
  MutedTextColorWhite,
} from "../../../utils/constants/colors";
import { dashboardNavList } from "../../../utils/constants/lists";
import { NavListTile } from "./list/NavListTile";

import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { VendooLogo } from "../../../widgets/VendooLogo";

interface DashboardSidebarProps {
  isDark: boolean;
  onClose: () => void;
}

export default function DashboardSideBar({ isDark }: DashboardSidebarProps) {
  const dashboardContext = useDashboardContext();

  const navigate = useNavigate();

  const borderColor = isDark ? BorderColorDark : BorderColorWhite;
  const bgColor = isDark ? PrimaryColorDark : PrimaryColorWhite;

  const translateX = dashboardContext.dashboardMobileMenuState
    ? "translate-x-0"
    : "-translate-x-full";

  return (
    <aside
      className={`w-64 flex flex-col ${translateX} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 transition-transform duration-300 border-r`}
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      {/* Logo */}
      <div
        className="h-16 px-6 flex items-center justify-between border-b"
        style={{ borderColor: borderColor }}
      >
        <VendooLogo />
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
        style={{ borderColor: borderColor }}
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
