import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../../context/ThemeContext";
import { useUserStore } from "../../../store/useUserStore";
import {
  SecondaryColorDark,
  SecondaryColorWhite,
  SaleBadgeColorDark,
  AccentColorWhite,
  MutedTextColorDark,
  MutedTextColorWhite,
} from "../../../utils/constants/colors";
import {
  DASHBOARD_ROUTE_NAME,
  STORE_CREATE_ROUTE_NAME,
  AUTHENTICATE_ROUTE_NAME,
} from "../../../utils/constants/pageNames";
import VendooButton from "../../../widgets/VendooButton";

export function LandingHeroSection() {
  const currentTheme = useThemeContext();
  const navigate = useNavigate();

  return (
    <section className="flex min-h-screen flex-col-reverse items-center justify-evenly md:justify-between  px-6 md:flex-row md:px-12 lg:px-24">
      {/* Text Content Block */}
      <div
        style={{
          backgroundColor: `${
            currentTheme.isDark ? SecondaryColorDark : SecondaryColorWhite
          }`,
        }}
        id="home"
        className="flex w-full flex-col items-center justify-center text-center md:w-3/5 md:items-start md:text-left"
      >
        <motion.h1
          style={{
            color: `${
              currentTheme.isDark ? SaleBadgeColorDark : AccentColorWhite
            }`,
          }}
          className="text-4xl font-extrabold sm:text-6xl mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          Manage Your Business Effortlessly
        </motion.h1>

        <motion.p
          style={{
            color: `${
              currentTheme.isDark ? MutedTextColorDark : MutedTextColorWhite
            }`,
          }}
          className="max-w-2xl text-lg text-grey-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Vendoo helps you showcase your products, grow your customer base, and
          take control of your digital store — all in one secure platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <VendooButton
            children={"Start Selling Now"}
            onClick={() => {
              // checking if the user logged in to redirect to dashboard
              // otherwise to authentication page
              if (useUserStore.getState().profile != null) {
                if (useUserStore.getState().profile?.hasShop) {
                  return navigate(DASHBOARD_ROUTE_NAME);
                }
                return navigate(STORE_CREATE_ROUTE_NAME);
              } else {
                return navigate(AUTHENTICATE_ROUTE_NAME);
              }
            }}
          />
        </motion.div>
      </div>

      {/* Image Block */}
      <div className=" hidden md:flex w-full items-center justify-center pt-10 md:w-2/5 md:pt-0">
        <motion.img
          src="../assets/landing/landing_image.svg"
          alt="Vendoo platform dashboard"
          className="w-full h-auto max-w-lg p-5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </section>
  );
}
