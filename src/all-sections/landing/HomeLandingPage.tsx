import { useEffect } from "react";

import FeaturesSection from "./pages/FeaturesPage";

import { motion } from "framer-motion";
import { useLandingContext } from "../../context/LandingContext";
import { useThemeContext } from "../../context/ThemeContext";
import {
  SecondaryColorDark,
  SecondaryColorWhite,
  AccentColorDark,
  AccentColorWhite,
  MutedTextColorDark,
  MutedTextColorWhite,
  PrimaryColorDark,
  PrimaryColorWhite,
} from "../../utils/constants/colors";
import { howItWorksSteps } from "../../utils/constants/lists";
import { containerVariants } from "../../variants/containerVariants";
import { LandingHeroSection } from "./sections/HeroSection";
import { LandingStatsSection } from "./sections/StatsSection";
import { TestimonialSection } from "./sections/TestimonialSection";

export default function HomeLandingPage() {
  const currentTheme = useThemeContext();
  const publicContext = useLandingContext();

  // setting landing page
  useEffect(() => {
    publicContext.setSelectedLandingNavLink("Home");
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Main Landing Section
  return (
    <>
      <LandingHeroSection />
      <FeaturesSection />
      <LandingStatsSection />
      <TestimonialSection />
      <section
        style={{
          backgroundColor: `${
            currentTheme.isDark ? SecondaryColorDark : SecondaryColorWhite
          }`,
        }}
        className="w-full py-24 px-6"
      >
        <motion.h3
          style={{
            color: `${
              currentTheme.isDark ? AccentColorDark : AccentColorWhite
            }`,
          }}
          className="w-full text-center text-3xl md:text-4xl font-bold mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8 }}
        >
          Get Started in 3 Simple Steps
        </motion.h3>

        <motion.div
          className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -150px 0px" }}
        >
          {howItWorksSteps.map((step) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className="flex-1 flex flex-col items-center text-center p-6"
            >
              {/* This will now render the correct lucide icon */}
              <step.FeatureIcon
                style={{
                  color: `${
                    currentTheme.isDark ? AccentColorDark : AccentColorWhite
                  }`,
                }}
                className="text-6xl mb-6"
              />
              <h4
                style={{
                  color: `${currentTheme.isDark ? "White" : "Black"}`,
                }}
                className="text-2xl font-bold mb-3"
              >
                {step.title}
              </h4>
              <p
                style={{
                  color: `${
                    currentTheme.isDark
                      ? MutedTextColorDark
                      : MutedTextColorWhite
                  }`,
                }}
                className="text-lg"
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
      <section
        style={{
          backgroundColor: `${
            currentTheme.isDark ? PrimaryColorDark : PrimaryColorWhite
          }`,
        }}
        className="w-full py-32 px-6 flex flex-col justify-center items-center text-center rounded-2xl"
      >
        <motion.h2
          style={{
            color: `${
              currentTheme.isDark ? AccentColorDark : AccentColorWhite
            }`,
          }}
          className="text-4xl sm:text-5xl font-extrabold  mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.8 }}
        >
          Ready to Grow Your Business?
        </motion.h2>

        <motion.p
          style={{
            color: `${
              currentTheme.isDark ? MutedTextColorDark : MutedTextColorWhite
            }`,
          }}
          className="max-w-xl text-lg mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          Join thousands of successful sellers. Get started today with a
          no-risk, 14-day free trial. No credit card required.
        </motion.p>
      </section>
    </>
  );
}
