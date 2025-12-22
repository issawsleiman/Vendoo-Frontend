import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

// Context Imports
import { useLandingContext } from "../../../context/LandingContext";
import { useThemeContext } from "../../../context/ThemeContext";

// Color Constants
import {
  PrimaryColorDark,
  PrimaryColorWhite,
  AccentColorDark,
  AccentColorWhite,
  MobileMenuColorDark,
  MobileMenuColorWhite,
  TextColorWhite,
  TextColorDark,
  SaleBadgeColorDark,
  PriceColorDark,
} from "../../../utils/constants/colors";

// Layout Constants
import { HEADER_HEIGHT } from "../../../utils/constants/layout";

// Utility Functions and Hooks
import getValidRouteName from "../../../utils/functions/getValidRouteName";
import { useHideOnScroll } from "../../../utils/useEffects";

// Widget Components
import ThemeSwitch from "../../../widgets/ThemeSwitch";
import { VendooLogo } from "../../../widgets/VendooLogo";
import VendooButton from "../../../widgets/VendooButton";

// Constants
import { navLinks } from "../../../utils/constants/lists";

/**
 * LandingHeader Component
 *
 * Main navigation header for the landing page with responsive design.
 * Features:
 * - Auto-hide on scroll functionality
 * - Theme switching capability
 * - Responsive mobile menu with hamburger toggle
 * - Animated transitions using Framer Motion
 * - Active link highlighting
 *
 * @returns {JSX.Element} The rendered landing header component
 */
export default function LandingHeader() {
  // Custom hook to handle header visibility on scroll
  const isShowingHeader = useHideOnScroll();

  // Theme context for dark/light mode
  const currentTheme = useThemeContext();

  // Landing page context for navigation state management
  const publicContext = useLandingContext();

  /**
   * Determines the background color based on current theme
   */
  const headerBackgroundColor = currentTheme.isDark
    ? PrimaryColorDark
    : PrimaryColorWhite;

  /**
   * Determines the mobile menu background color based on current theme
   */
  const mobileMenuBackgroundColor = currentTheme.isDark
    ? MobileMenuColorDark
    : MobileMenuColorWhite;

  /**
   * Gets the navigation link color based on selection and theme
   * @param {string} item - The navigation item name
   * @returns {string} The appropriate color for the link
   */
  const getNavLinkColor = (item: any) => {
    if (publicContext.selectedLandingNavLink === item) {
      return PrimaryColorWhite;
    }
    return currentTheme.isDark ? PrimaryColorWhite : PrimaryColorDark;
  };

  /**
   * Gets the navigation link background color based on selection and theme
   * @param {string} item - The navigation item name
   * @returns {string|undefined} The appropriate background color or undefined
   */
  const getNavLinkBackgroundColor = (item: any) => {
    if (publicContext.selectedLandingNavLink === item) {
      return currentTheme.isDark ? AccentColorDark : AccentColorWhite;
    }
    return undefined;
  };

  /**
   * Gets the mobile navigation link color based on selection and theme
   * @param {string} link - The navigation link name
   * @returns {string} The appropriate color for the mobile link
   */
  const getMobileNavLinkColor = (link: any) => {
    if (publicContext.selectedLandingNavLink === link) {
      return TextColorWhite;
    }
    return currentTheme.isDark ? TextColorDark : TextColorWhite;
  };

  /**
   * Gets the mobile navigation link background color based on selection and theme
   * @param {string} link - The navigation link name
   * @returns {string|undefined} The appropriate background color or undefined
   */
  const getMobileNavLinkBackgroundColor = (link: any) => {
    if (publicContext.selectedLandingNavLink === link) {
      return currentTheme.isDark ? SaleBadgeColorDark : PriceColorDark;
    }
    return undefined;
  };

  /**
   * Handles navigation link click
   * Updates the selected navigation link in context
   * @param {string} item - The clicked navigation item
   */
  const handleNavLinkClick = (item: any) => {
    publicContext.setSelectedLandingNavLink(item);
  };

  /**
   * Handles mobile navigation link click
   * Updates the selected link and closes the mobile menu
   * @param {string} link - The clicked navigation link
   */
  const handleMobileNavLinkClick = (link: any) => {
    publicContext.setSelectedLandingNavLink(link);
    publicContext.setShowingLandingMobileNavigation(false);
  };

  /**
   * Handles authentication button click
   * Clears the selected navigation link and closes mobile menu
   */
  const handleAuthButtonClick = () => {
    publicContext.setSelectedLandingNavLink("");
    publicContext.setShowingLandingMobileNavigation(false);
  };

  /**
   * Toggles the mobile navigation menu visibility
   */
  const toggleMobileMenu = () => {
    publicContext.setShowingLandingMobileNavigation(
      !publicContext.isShowingLandingMobileNavigation
    );
  };

  return (
    // Main Landing Header
    <motion.header
      style={{
        height: `${HEADER_HEIGHT}px`,
        backgroundColor: headerBackgroundColor,
      }}
      className="fixed lg:fixed top-0 left-0 w-full shadow-lg z-100 backdrop-blur-lg select-none"
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: isShowingHeader ? 0 : -100,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        {/* Logo Section */}
        <VendooLogo />

        {/* Theme Switch Toggle */}
        <ThemeSwitch />

        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex space-x-4" aria-label="Main navigation">
          {navLinks.map((item) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              key={item}
            >
              <Link
                style={{
                  color: getNavLinkColor(item),
                  backgroundColor: getNavLinkBackgroundColor(item),
                }}
                to={getValidRouteName({ text: item })}
                onClick={() => handleNavLinkClick(item)}
                className="px-4 py-2 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 ease-in-out text-center"
                aria-current={
                  publicContext.selectedLandingNavLink === item
                    ? "page"
                    : undefined
                }
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Desktop Authentication Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <VendooButton
            children="Login/Register"
            linkTo="authenticate"
            onClick={() => publicContext.setSelectedLandingNavLink("")}
          />
        </div>

        {/* Mobile Hamburger Menu Toggle Button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-link-hover-bg transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={publicContext.isShowingLandingMobileNavigation}
        >
          {publicContext.isShowingLandingMobileNavigation ? (
            <X
              size={26}
              color={currentTheme.isDark ? "white" : "black"}
              aria-hidden="true"
            />
          ) : (
            <Menu
              size={26}
              color={currentTheme.isDark ? "white" : "black"}
              aria-hidden="true"
            />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Navigation Menu */}
      <div
        style={{
          backgroundColor: mobileMenuBackgroundColor,
        }}
        className={`backdrop-blur-2xl absolute top-20 left-0 pb-5 p-10 w-full rounded-b-2xl lg:hidden transform origin-top transition-transform duration-300 ease-in-out ${
          publicContext.isShowingLandingMobileNavigation
            ? "translate-x-0"
            : "translate-x-full"
        }`}
        aria-hidden={!publicContext.isShowingLandingMobileNavigation}
      >
        {/* Mobile Navigation Links Container */}
        <div className="flex flex-col items-center py-4 space-y-3">
          {navLinks.map((link) => (
            <div
              key={link.toLowerCase()}
              onClick={() => handleMobileNavLinkClick(link)}
              className="px-6 py-2 rounded-md text-center font-medium transition-colors duration-200"
            >
              <Link
                style={{
                  color: getMobileNavLinkColor(link),
                  backgroundColor: getMobileNavLinkBackgroundColor(link),
                }}
                to={getValidRouteName({ text: link })}
                className="px-6 py-2 rounded-md text-center font-medium transition-colors duration-200"
                aria-current={
                  publicContext.selectedLandingNavLink === link
                    ? "page"
                    : undefined
                }
              >
                {link}
              </Link>
            </div>
          ))}

          {/* Mobile Authentication Button Section */}
          <div className="flex flex-col items-center space-y-3 pt-4 border-t border-gray-200 w-full">
            <VendooButton
              children="Login/Register"
              linkTo="authenticate"
              onClick={handleAuthButtonClick}
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
