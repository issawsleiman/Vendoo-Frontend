import { TestimonialSection } from "../sections/TestimonialSection";
import { LandingStatsSection } from "../sections/StatsSection";
import FeaturesSection from "./FeaturesPage";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useLandingContext } from "../../../context/LandingContext";
import { useThemeContext } from "../../../context/ThemeContext";
import { useUserStore } from "../../../store/useUserStore";
import {
  SecondaryColorDark,
  SecondaryColorWhite,
  AccentColorDark,
  AccentColorWhite,
  MutedTextColorDark,
  MutedTextColorWhite,
  PrimaryColorDark,
  PrimaryColorWhite,
  SaleBadgeColorDark,
} from "../../../utils/constants/colors";
import { howItWorksSteps } from "../../../utils/constants/lists";
import {
  DASHBOARD_ROUTE_NAME,
  STORE_CREATE_ROUTE_NAME,
  AUTHENTICATE_ROUTE_NAME,
} from "../../../utils/constants/pageNames";
import { containerVariants } from "../../../variants/containerVariants";
import VendooButton from "../../../widgets/VendooButton";

export default function HomeLandingPage() {
  const currentTheme = useThemeContext();
  const publicContext = useLandingContext();
  const navigate = useNavigate();

  useEffect(() => {
    publicContext.setSelectedLandingNavLink("Home");
  }, [publicContext]);

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 30 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.6,
  //       ease: [0.22, 1, 0.36, 1],
  //     },
  //   },
  // };

  return (
    <>
      <LandingHeroSection />
      <FeaturesSection />
      <LandingStatsSection />
      <TestimonialSection />

      {/* How It Works Section */}
      <section
        style={{
          backgroundColor: currentTheme.isDark
            ? SecondaryColorDark
            : SecondaryColorWhite,
        }}
        className="w-full py-32 px-6 relative overflow-hidden"
      >
        {/* Decorative gradient background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
            style={{
              background: currentTheme.isDark
                ? AccentColorDark
                : AccentColorWhite,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span
                style={{
                  color: currentTheme.isDark
                    ? AccentColorDark
                    : AccentColorWhite,
                  borderColor: currentTheme.isDark
                    ? AccentColorDark
                    : AccentColorWhite,
                }}
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold border mb-6"
              >
                Simple Process
              </span>
            </motion.div>

            <h2
              style={{
                color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            >
              Get Started in 3 Simple Steps
            </h2>

            <p
              style={{
                color: currentTheme.isDark
                  ? MutedTextColorDark
                  : MutedTextColorWhite,
              }}
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Launch your online store and start selling in minutes with our
              streamlined setup process
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {howItWorksSteps.map((step, index) => (
              <motion.div key={step.title} className="relative group">
                <div
                  style={{
                    backgroundColor: currentTheme.isDark
                      ? PrimaryColorDark
                      : PrimaryColorWhite,
                    borderColor: currentTheme.isDark
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.06)",
                  }}
                  className="h-full p-8 rounded-2xl border transition-all duration-500 hover:shadow-2xl hover:scale-105"
                >
                  {/* Step number badge */}
                  <div
                    style={{
                      backgroundColor: currentTheme.isDark
                        ? AccentColorDark
                        : AccentColorWhite,
                    }}
                    className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg"
                  >
                    <span
                      style={{ color: currentTheme.isDark ? "black" : "white" }}
                    >
                      {index + 1}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div
                      style={{
                        backgroundColor: currentTheme.isDark
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.03)",
                      }}
                      className="p-6 rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    >
                      <step.FeatureIcon
                        style={{
                          color: currentTheme.isDark
                            ? AccentColorDark
                            : AccentColorWhite,
                        }}
                        className="w-12 h-12"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h3
                    style={{
                      color: currentTheme.isDark ? "white" : "black",
                    }}
                    className="text-2xl font-bold mb-4 text-center"
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      color: currentTheme.isDark
                        ? MutedTextColorDark
                        : MutedTextColorWhite,
                    }}
                    className="text-base leading-relaxed text-center"
                  >
                    {step.description}
                  </p>
                </div>

                {/* Connection line (desktop only) */}
                {index < howItWorksSteps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-16 -right-6 lg:-right-12 w-12 lg:w-24 h-0.5 opacity-20"
                    style={{
                      backgroundColor: currentTheme.isDark
                        ? AccentColorDark
                        : AccentColorWhite,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          backgroundColor: currentTheme.isDark
            ? PrimaryColorDark
            : PrimaryColorWhite,
        }}
        className="w-full py-32 px-6 relative overflow-hidden"
      >
        {/* Gradient background effects */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${
                currentTheme.isDark ? AccentColorDark : AccentColorWhite
              } 0%, transparent 70%)`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span
                style={{
                  backgroundColor: currentTheme.isDark
                    ? AccentColorDark
                    : AccentColorWhite,
                  color: currentTheme.isDark ? "black" : "white",
                }}
                className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-8 shadow-lg"
              >
                START YOUR FREE TRIAL
              </span>
            </motion.div>

            <h2
              style={{
                color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
              }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight"
            >
              Ready to Grow Your Business?
            </h2>

            <p
              style={{
                color: currentTheme.isDark
                  ? MutedTextColorDark
                  : MutedTextColorWhite,
              }}
              className="max-w-2xl mx-auto text-lg md:text-xl mb-10 leading-relaxed"
            >
              Join thousands of successful sellers worldwide. Start your journey
              today with a
              <span className="font-semibold"> risk-free 14-day trial</span>. No
              credit card required, cancel anytime.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <VendooButton
                children="Start Your Free Trial"
                onClick={() => {
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

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <p
                  style={{
                    color: currentTheme.isDark
                      ? MutedTextColorDark
                      : MutedTextColorWhite,
                  }}
                  className="text-sm flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  No credit card required
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function LandingHeroSection() {
  const currentTheme = useThemeContext();
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${
              currentTheme.isDark ? AccentColorDark : AccentColorWhite
            }, transparent)`,
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${
              currentTheme.isDark ? SaleBadgeColorDark : AccentColorWhite
            }, transparent)`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20">
        {/* Text Content */}
        <motion.div
          className="flex flex-col items-center md:items-start text-center md:text-left space-y-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span
              style={{
                backgroundColor: currentTheme.isDark
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
                color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
              }}
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm"
            >
              ✨ The Complete E-Commerce Solution
            </span>
          </motion.div>

          <motion.h1
            style={{
              color: currentTheme.isDark
                ? SaleBadgeColorDark
                : AccentColorWhite,
            }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Manage Your Business{" "}
            <span className="relative inline-block">
              Effortlessly
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-3 opacity-30"
                style={{
                  backgroundColor: currentTheme.isDark
                    ? AccentColorDark
                    : AccentColorWhite,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>
          </motion.h1>

          <motion.p
            style={{
              color: currentTheme.isDark
                ? MutedTextColorDark
                : MutedTextColorWhite,
            }}
            className="text-lg sm:text-xl max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Vendoo empowers you to showcase your products beautifully, expand
            your customer reach, and take complete control of your digital
            storefront — all within one secure, intuitive platform.
          </motion.p>

          <motion.div
            className="flex flex-col items-center sm:flex-row gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <VendooButton
                children="Start Selling Now →"
                onClick={() => {
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
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div
          className="hidden md:flex items-center justify-center"
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <motion.img
              src="../assets/landing/landing_image.svg"
              alt="Vendoo platform dashboard"
              className="w-full h-auto max-w-lg drop-shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />

            {/* Decorative floating elements */}
            <motion.div
              className="absolute -top-10 -right-10 w-20 h-20 rounded-2xl opacity-20 blur-xl"
              style={{
                backgroundColor: currentTheme.isDark
                  ? AccentColorDark
                  : AccentColorWhite,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
