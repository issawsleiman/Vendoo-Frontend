import { useEffect, useState } from "react";
import { useLandingContext } from "../context/LandingContext";

// Navigation bar showing/hiding effect
export function useHideOnScroll(): boolean {
  const publicContext = useLandingContext();

  const [isShowing, setShowing] = useState(true);
  const [latestScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // getting the scroll Y from window
      const currentYPosition = window.scrollY;

      if (currentYPosition > latestScrollY && currentYPosition > 50) {
        // scrolling down
        setShowing(false);
      } else {
        // scrolling up
        setShowing(true);
      }
      // hiding mobile nav if open
      if (publicContext.isShowingLandingMobileNavigation) {
        publicContext.setShowingLandingMobileNavigation(false);
      }

      setLastScrollY(currentYPosition);
    };

    // adding the scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("hover", handleScroll),
        [latestScrollY, publicContext];
    };
  });

  return isShowing;
}

// Navigation hamburger Menu state
export function shouldShowMobileMenu(): boolean {
  const [open, setOpen] = useState(false);
  setOpen(!open);

  return open;
}
