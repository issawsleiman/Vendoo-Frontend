import { createContext, useContext, useState, type ReactNode } from "react";

export type AuthType = "Login" | "Register";

// ---------------------------
// Interface: Public
// ---------------------------
// Defines the shape of the context that will be shared across the app
interface Public {
  // Tracks the currently selected landing page navigation link
  selectedLandingNavLink: string;

  // Function to update the currently selected navigation link
  setSelectedLandingNavLink: (value: string) => void;

  // Tracks whether the mobile navigation menu is open or closed
  isShowingLandingMobileNavigation: boolean;

  // Function to toggle the mobile navigation menu
  setShowingLandingMobileNavigation: (isShowing: boolean) => void;

  // Tracks the auth type chose in authentication screen
  selectedAuthType: AuthType;

  // Function to toggle the authentication type
  setSelectedAuthType: (type: AuthType) => void;

  // Tracks the loading after the user log in
  isLoading: boolean;
  // Function to update the loading status of authentication
  setLoadingStatus: (isLoading: boolean) => void;
}

// ---------------------------
// Context
// ---------------------------
// Create the context with initial value null.
// Components consuming this context must be wrapped by PublicProvider
const LandingContext = createContext<Public | null>(null);

// ---------------------------
// Provider Component
// ---------------------------
export function PublicProvider({ children }: { children: ReactNode }) {
  // ---------------------------
  // State: selected navigation link
  // Default is "Home"
  // ---------------------------
  const [selectedLandingNavLink, setSelectedLandingNavLink1] = useState("Home");

  // ---------------------------
  // State: mobile menu visibility
  // Default is false (menu closed)
  // ---------------------------

  const selectNavLink = (item: string) => {
    setSelectedLandingNavLink1(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isShowingMobileNavigation, setShowingMobileNavigation] =
    useState(false);

  // --------------------------
  // State: Auth type
  // Default is Login
  const [selectedAuthType, setSelectedAuthType] = useState<AuthType>("Login");

  // ---------------------
  const [isLoading, setLoadingStatus] = useState(false);

  // ---------------------------
  // Provide the context values to all children
  // ---------------------------
  return (
    <LandingContext.Provider
      value={{
        selectedLandingNavLink: selectedLandingNavLink,
        setSelectedLandingNavLink: selectNavLink,
        setShowingLandingMobileNavigation: setShowingMobileNavigation,
        isShowingLandingMobileNavigation: isShowingMobileNavigation,
        selectedAuthType: selectedAuthType,
        setSelectedAuthType: setSelectedAuthType,
        isLoading: isLoading,
        setLoadingStatus: setLoadingStatus,
      }}
    >
      {children}
    </LandingContext.Provider>
  );
}

// ---------------------------
// Custom hook for easy context consumption
// ---------------------------
export function useLandingContext() {
  const context = useContext(LandingContext);

  // Throw error if the hook is used outside of PublicProvider
  if (!context) {
    throw new Error("usePublicContext must be used within a PublicProvider");
  }

  return context;
}
