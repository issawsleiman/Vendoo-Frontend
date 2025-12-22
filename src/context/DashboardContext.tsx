// this will hold all dashboard context

import { createContext, useContext, useState, type ReactNode } from "react";

interface DashboardContextProps {
  // Tracks whether the dashboard mobile navigation is open or closed
  dashboardMobileMenuState: boolean;
  setDashboardMobileMenuState: (state: boolean) => void;

  selectedDashboardItem: string | null;
  setSelectedDashboardItem: (index: string) => void;

  isEditingState: boolean | null;
  setEditingState: (state: boolean) => void;
}

const DashboardContext = createContext<DashboardContextProps | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [dashboardMobileMenuState, setDashboardMobileMenuState] =
    useState(false);

  const [selectedDashboardItem, setSelectedDashboardItem] = useState<
    string | null
  >("Dashboard");

  const [isEditingState, setEditingState] = useState<boolean | null>(false);

  return (
    <DashboardContext
      value={{
        dashboardMobileMenuState: dashboardMobileMenuState,
        setDashboardMobileMenuState: setDashboardMobileMenuState,
        selectedDashboardItem: selectedDashboardItem,
        setSelectedDashboardItem: setSelectedDashboardItem,
        isEditingState: isEditingState,
        setEditingState: setEditingState,
      }}
    >
      {children}
    </DashboardContext>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  // Throw error if the hook is used outside of PublicProvider
  if (!context) {
    throw new Error("useDashboardContext must be used within a PublicProvider");
  }
  return context;
}
