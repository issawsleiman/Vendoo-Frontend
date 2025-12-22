import { Bell, Search, Menu } from "lucide-react";

import { useDashboardContext } from "../../../context/DashboardContext";
import { useThemeContext } from "../../../context/ThemeContext";
import { Outlet } from "react-router-dom";
import { VendooIconButton } from "../../../widgets/VendooIconButton";
import { VendooInput } from "../../../widgets/VendooInput";

import { motion } from "framer-motion";
import DashboardSideBar from "./sidebar";
import { UserAvatar } from "./UserAvatar";

// all dashboard pages names
export const DASHBOARD_PG_NAME = "Dashboard";
export const DASHBOARD_PG_CATEGORIES_NAME = "Categories";
export const DASHBOARD_PG_CUSTOMERS_NAME = "Customers";
export const DASHBOARD_PG_ORDERS_NAME = "Orders";
export const DASHBOARD_PG_PRODUCTS_NAME = "Products";
export const DASHBOARD_PG_PROFILE_NAME = "Profile";

export default function DashboardLayout() {
  const dashboardContext = useDashboardContext();

  const isDark = useThemeContext().isDark;
  const colors = useThemeContext().colors;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Overlay */}
      {dashboardContext.dashboardMobileMenuState && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => dashboardContext.setDashboardMobileMenuState(false)}
        />
      )}

      {/* Sidebar */}
      <DashboardSideBar isDark={isDark} onClose={() => {}} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className="border-b shrink-0"
          style={{
            borderColor: colors.borderColor,
            backgroundColor: colors.cardBgColor,
          }}
        >
          <div className="px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() =>
                    dashboardContext.setDashboardMobileMenuState(true)
                  }
                  className="lg:hidden p-2 rounded-lg transition-colors hover:opacity-80"
                  style={{ backgroundColor: isDark ? "#374151" : "#f1f5f9" }}
                >
                  <Menu size={24} style={{ color: colors.textColor }} />
                </button>
                <motion.div
                  key={dashboardContext.selectedDashboardItem}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2
                    className="text-xl lg:text-2xl font-bold"
                    style={{ color: colors.textColor }}
                  >
                    {dashboardContext.selectedDashboardItem}
                  </h2>
                  <p
                    className="text-sm hidden sm:block"
                    style={{ color: colors.mutedTextColor }}
                  >
                    Monitor your store performance
                  </p>
                </motion.div>
              </div>

              <div className="flex items-center gap-2 lg:gap-3">
                <div className="hidden md:block">
                  <VendooInput
                    type="text"
                    name="dashboard-search"
                    value=""
                    id="dashboard-search"
                    key={"dashboard-search"}
                    hintText="Search"
                    onChange={() => {}}
                    PrefixIcon={Search}
                  />
                </div>

                <VendooIconButton Icon={Bell} onClick={() => {}} />
                <UserAvatar />
              </div>
            </div>
          </div>
        </header>
        {/* Dashboard Content */}
        <Outlet />
      </main>
    </div>
  );
}
