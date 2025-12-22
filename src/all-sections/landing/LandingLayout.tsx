import { Outlet } from "react-router-dom";

import { useLandingContext } from "../../context/LandingContext";
import { useThemeContext } from "../../context/ThemeContext";
import {
  SecondaryColorDark,
  SecondaryColorWhite,
} from "../../utils/constants/colors";
import { HEADER_HEIGHT } from "../../utils/constants/layout";
import LandingHeader from "./header&Footer/LandingHeader";
import LandingFooter from "./header&Footer/LandingFooter";

// Here is the main landing layout of the site
export default function LandingLayout() {
  const currentTheme = useThemeContext();
  const publicContext = useLandingContext();

  // const [showVendooBot, setShowVendooBot] = useState(false);

  return (
    <>
      {/* Landing header */}
      <LandingHeader />
      {/* Main Container */}
      <section
        style={{
          marginTop: `${HEADER_HEIGHT}px`,
          backgroundColor: `${
            currentTheme.isDark ? SecondaryColorDark : SecondaryColorWhite
          }`,
        }}
        className=" select-none"
        onClick={() => publicContext.setShowingLandingMobileNavigation(false)}
      >
        {/* {showVendooBot && (
          <LandingBot
            isOpen={showVendooBot}
            onClose={() => setShowVendooBot(!showVendooBot)}
          />
        )} */}
        {/* This renders the child route page */}
        <Outlet />
      </section>

      {/*  bot icon */}
      {/* <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileTap={{ scale: 1.2, translateY: -10 }}
        exit={{ scale: 1 }}
        transition={{
          duration: 0.4,
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        className="fixed bottom-10 right-5 w-14 h-14 flex items-center justify-center rounded-full cursor-pointer shadow-lg drop-shadow-2xl"
      >
        <img
          src="/icons/ic_bot.png"
          alt="chatbot_icon"
          onClick={() => {
            setShowVendooBot(!showVendooBot);
          }}
        />
      </motion.div> */}

      {/* Landing Footer Footer */}
      <LandingFooter />
    </>
  );
}
