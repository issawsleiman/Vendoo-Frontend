import { createContext, useContext, useState } from "react";
import {
  AccentColorDark,
  AccentColorWhite,
  BorderColorDark,
  BorderColorWhite,
  MutedTextColorDark,
  MutedTextColorWhite,
  PrimaryColorDark,
  PrimaryColorWhite,
  SecondaryColorDark,
  SecondaryColorWhite,
  TextColorDark,
  TextColorWhite,
} from "../utils/constants/colors";

interface ThemeColors {
  bgColor: string;
  textColor: string;
  cardBgColor: string;
  borderColor: string;
  mutedTextColor: string;
  accentColor: string;
}

interface Theme {
  // Whether dark mode is currently on or off
  isDark: boolean;

  // Function to toggle between light/dark
  setThemeToggle: () => void;

  colors: ThemeColors;
}

// Create the context with an initial null value (no provider yet)
const ThemeContext = createContext<Theme | null>(null);

// Create a provider component to wrap app and manage theme state
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // useState to store whether dark mode is activ
  const [isDarkTheme, setDarkTheme] = useState(() => {
    // Checking Local Storage for saved theme preference
    const savedTheme = localStorage.getItem("isDarkTheme");
    return savedTheme ? savedTheme === "true" : false;
  });

  // function that flips the current theme value
  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
    localStorage.setItem("isDarkTheme", (!isDarkTheme).toString());
  };

  const colors: ThemeColors = {
    bgColor: isDarkTheme ? SecondaryColorDark : SecondaryColorWhite,
    textColor: isDarkTheme ? TextColorDark : TextColorWhite,
    cardBgColor: isDarkTheme ? PrimaryColorDark : PrimaryColorWhite,
    borderColor: isDarkTheme ? BorderColorDark : BorderColorWhite,
    mutedTextColor: isDarkTheme ? MutedTextColorDark : MutedTextColorWhite,
    accentColor: isDarkTheme ? AccentColorDark : AccentColorWhite,
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark: isDarkTheme,
        setThemeToggle: toggleTheme,
        colors: colors,
      }}
    >
      <div
        className={`min-h-screen transition-colors duration-500 ${
          isDarkTheme ? PrimaryColorDark : PrimaryColorWhite
        }`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme anywhere
export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
