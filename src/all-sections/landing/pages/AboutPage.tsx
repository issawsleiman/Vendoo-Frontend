import { useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Users, Zap, Shield, TrendingUp, Heart } from "lucide-react";

import { useThemeContext } from "../../../context/ThemeContext";
import {
  SecondaryColorDark,
  SecondaryColorWhite,
  AccentColorDark,
  AccentColorWhite,
  TextColorDark,
  TextColorWhite,
  MutedTextColorDark,
  MutedTextColorWhite,
  PrimaryColorDark,
  PrimaryColorWhite,
  BorderColorDark,
  BorderColorWhite,
} from "../../../utils/constants/colors";
import { useLandingContext } from "../../../context/LandingContext";

// About Page
export default function AboutPage() {
  const currentTheme = useThemeContext();
  const publicContext = useLandingContext();

  useEffect(() => {
    publicContext.setSelectedLandingNavLink("About");
  }, [publicContext]);

  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To empower sellers with the tools they need to succeed in the digital marketplace.",
    },
    {
      icon: Users,
      title: "Community First",
      description:
        "Building a supportive community where every seller can thrive and grow together.",
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "Providing a safe, secure platform that protects both sellers and buyers.",
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Fast & Efficient",
      description:
        "Streamlined workflows that save you time and boost productivity.",
    },
    {
      icon: TrendingUp,
      title: "Scale Your Business",
      description:
        "Tools designed to grow with you, from first sale to enterprise level.",
    },
    {
      icon: Heart,
      title: "Built with Care",
      description:
        "Every feature crafted with attention to detail and user experience in mind.",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: currentTheme.isDark
          ? SecondaryColorDark
          : SecondaryColorWhite,
      }}
      className="w-full min-h-screen relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{
                color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
                borderColor: currentTheme.isDark
                  ? AccentColorDark
                  : AccentColorWhite,
              }}
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold border mb-6"
            >
              About Us
            </span>
          </motion.div>

          <h1
            style={{
              color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            Welcome to Vendoo
          </h1>

          <p
            style={{
              color: currentTheme.isDark
                ? MutedTextColorDark
                : MutedTextColorWhite,
            }}
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Vendoo is a powerful, easy-to-use platform for buying and selling
            items online. Whether you're a casual seller or a professional
            vendor, Vendoo helps you manage listings, track sales, and reach
            customers with efficiency and confidence.
          </p>
        </motion.div>

        {/* Values Section */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              color: currentTheme.isDark ? TextColorDark : TextColorWhite,
            }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            What We Stand For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                style={{
                  backgroundColor: currentTheme.isDark
                    ? PrimaryColorDark
                    : PrimaryColorWhite,
                  borderColor: currentTheme.isDark
                    ? BorderColorDark
                    : BorderColorWhite,
                }}
                className="rounded-2xl border p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <div
                  style={{
                    backgroundColor: currentTheme.isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.05)",
                  }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                  <value.icon
                    size={32}
                    style={{
                      color: currentTheme.isDark
                        ? AccentColorDark
                        : AccentColorWhite,
                    }}
                    strokeWidth={1.5}
                  />
                </div>

                <h3
                  style={{
                    color: currentTheme.isDark ? TextColorDark : TextColorWhite,
                  }}
                  className="text-xl font-bold mb-3"
                >
                  {value.title}
                </h3>

                <p
                  style={{
                    color: currentTheme.isDark
                      ? MutedTextColorDark
                      : MutedTextColorWhite,
                  }}
                  className="text-sm leading-relaxed"
                >
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div
          style={{
            backgroundColor: currentTheme.isDark
              ? PrimaryColorDark
              : PrimaryColorWhite,
            borderColor: currentTheme.isDark
              ? BorderColorDark
              : BorderColorWhite,
          }}
          className="rounded-3xl border p-10 md:p-16 mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2
              style={{
                color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
              }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Our Story
            </h2>

            <div
              style={{
                color: currentTheme.isDark
                  ? MutedTextColorDark
                  : MutedTextColorWhite,
              }}
              className="space-y-4 text-base md:text-lg leading-relaxed"
            >
              <p>
                Vendoo was born from a simple idea: selling online should be
                easy, efficient, and accessible to everyone. We saw sellers
                struggling with complicated tools and fragmented platforms, and
                we knew there had to be a better way.
              </p>

              <p>
                Today, Vendoo serves thousands of sellers worldwide, from
                individuals selling a few items to professional vendors managing
                extensive inventories. Our platform continues to evolve based on
                your feedback, always staying focused on what matters most:
                helping you succeed.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              color: currentTheme.isDark ? TextColorDark : TextColorWhite,
            }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Why Choose Vendoo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                style={{
                  backgroundColor: currentTheme.isDark
                    ? "rgba(255, 255, 255, 0.02)"
                    : "rgba(0, 0, 0, 0.02)",
                  borderColor: currentTheme.isDark
                    ? BorderColorDark
                    : BorderColorWhite,
                }}
                className="rounded-2xl border p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <feature.icon
                  size={28}
                  style={{
                    color: currentTheme.isDark
                      ? AccentColorDark
                      : AccentColorWhite,
                  }}
                  strokeWidth={1.5}
                  className="mb-4"
                />

                <h3
                  style={{
                    color: currentTheme.isDark ? TextColorDark : TextColorWhite,
                  }}
                  className="text-xl font-bold mb-3"
                >
                  {feature.title}
                </h3>

                <p
                  style={{
                    color: currentTheme.isDark
                      ? MutedTextColorDark
                      : MutedTextColorWhite,
                  }}
                  className="text-sm leading-relaxed"
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
            }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to Start Selling?
          </h2>

          <p
            style={{
              color: currentTheme.isDark
                ? MutedTextColorDark
                : MutedTextColorWhite,
            }}
            className="text-lg mb-8 max-w-2xl mx-auto"
          >
            Join thousands of successful sellers who trust Vendoo for their
            online business.
          </p>

          <motion.a
            href="/authenticate"
            style={{
              backgroundColor: currentTheme.isDark
                ? AccentColorDark
                : AccentColorWhite,
              color: currentTheme.isDark ? "black" : "white",
            }}
            className="inline-block px-8 py-4 rounded-xl font-semibold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today →
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
