import { useEffect } from "react";
import { useThemeContext } from "../../../context/ThemeContext";
import { useLandingContext } from "../../../context/LandingContext";
import { motion } from "framer-motion";
import { CheckCircle, Star, TrendingUp, Zap } from "lucide-react";
import type { Pricing } from "../../../models/Pricing";
import {
  SecondaryColorDark,
  SecondaryColorWhite,
  AccentColorDark,
  BorderColorDark,
  BorderColorWhite,
  TextColorDark,
  TextColorWhite,
  PrimaryColorDark,
  PriceColorDark,
  PriceColorWhite,
  PrimaryColorWhite,
  AccentColorWhite,
} from "../../../utils/constants/colors";
import { pricingList } from "../../../utils/constants/lists";
import VendooButton from "../../../widgets/VendooButton";

export default function PricingPage() {
  const currentTheme = useThemeContext();
  const publicContext = useLandingContext();

  useEffect(() => {
    publicContext.setSelectedLandingNavLink("Pricing");
  }, [publicContext]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // const cardVariants = {
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
    <section
      style={{
        backgroundColor: currentTheme.isDark
          ? SecondaryColorDark
          : SecondaryColorWhite,
      }}
      className="py-32 px-6 relative overflow-hidden"
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${
              currentTheme.isDark ? AccentColorDark : AccentColorWhite
            }, transparent)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
                color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
                borderColor: currentTheme.isDark
                  ? AccentColorDark
                  : AccentColorWhite,
              }}
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold border mb-6"
            >
              Flexible Plans
            </span>
          </motion.div>

          <h2
            style={{
              color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Simple, Transparent Pricing
          </h2>

          <p
            style={{
              color: currentTheme.isDark ? TextColorDark : TextColorWhite,
            }}
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-80"
          >
            Choose a plan that fits your selling needs. Start free, scale as you
            grow, and upgrade anytime without hassle.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pricingList.map((pricingItem, i) => (
            <motion.div key={i}>
              <PricingCard
                name={pricingItem.name}
                price={pricingItem.price}
                desc={pricingItem.desc}
                features={pricingItem.features}
                highlighted={pricingItem.highlighted}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Banner */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p
            style={{
              color: currentTheme.isDark ? TextColorDark : TextColorWhite,
            }}
            className="text-sm opacity-70 mb-4"
          >
            Trusted by over 10,000+ sellers worldwide
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {[
              { label: "14-Day Free Trial", icon: Zap },
              { label: "No Credit Card Required", icon: CheckCircle },
              { label: "Cancel Anytime", icon: Star },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <item.icon
                  style={{
                    color: currentTheme.isDark
                      ? AccentColorDark
                      : AccentColorWhite,
                  }}
                  size={16}
                />
                <span
                  style={{
                    color: currentTheme.isDark ? TextColorDark : TextColorWhite,
                  }}
                  className="text-sm font-medium"
                >
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function PricingCard({
  name,
  price,
  desc,
  features,
  highlighted,
}: Pricing) {
  const currentTheme = useThemeContext();

  return (
    <motion.div
      style={{
        backgroundColor: currentTheme.isDark
          ? PrimaryColorDark
          : PrimaryColorWhite,
        borderColor: highlighted
          ? currentTheme.isDark
            ? AccentColorDark
            : AccentColorWhite
          : currentTheme.isDark
          ? BorderColorDark
          : BorderColorWhite,
      }}
      className={`relative rounded-3xl border-2 p-8 flex flex-col h-full transition-all duration-500 ${
        highlighted ? "shadow-2xl" : "shadow-lg hover:shadow-xl"
      }`}
      whileHover={{
        y: highlighted ? 0 : -8,
        scale: highlighted ? 1 : 1.02,
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Popular Badge */}
      {highlighted && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full shadow-lg"
          style={{
            backgroundColor: currentTheme.isDark
              ? AccentColorDark
              : AccentColorWhite,
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <Star
              size={14}
              fill={currentTheme.isDark ? "black" : "white"}
              style={{ color: currentTheme.isDark ? "black" : "white" }}
            />
            <span
              style={{
                color: currentTheme.isDark ? "black" : "white",
              }}
              className="text-xs font-bold uppercase tracking-wide"
            >
              Most Popular
            </span>
          </div>
        </motion.div>
      )}

      {/* Decorative corner accent */}
      {highlighted && (
        <div
          className="absolute top-0 right-0 w-24 h-24 opacity-10 rounded-bl-full"
          style={{
            background: `radial-gradient(circle at top right, ${
              currentTheme.isDark ? AccentColorDark : AccentColorWhite
            }, transparent)`,
          }}
        />
      )}

      {/* Plan Name */}
      <div className="mb-6">
        <h3
          style={{
            color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
          }}
          className="text-2xl font-bold mb-2"
        >
          {name}
        </h3>
        <p
          style={{
            color: currentTheme.isDark ? TextColorDark : TextColorWhite,
          }}
          className="text-sm opacity-70"
        >
          {desc}
        </p>
      </div>

      {/* Price */}
      <div className="mb-8">
        <div className="flex items-baseline gap-2">
          <span
            style={{
              color: currentTheme.isDark ? PriceColorDark : PriceColorWhite,
            }}
            className="text-5xl font-extrabold tracking-tight"
          >
            {price.split("/")[0]}
          </span>
          {price.includes("/") && (
            <span
              style={{
                color: currentTheme.isDark ? TextColorDark : TextColorWhite,
              }}
              className="text-lg opacity-60"
            >
              /{price.split("/")[1]}
            </span>
          )}
        </div>
      </div>

      {/* Features List */}
      <ul className="flex-1 space-y-4 mb-8">
        {features.map((feature, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <div
              className="shrink-0 mt-0.5"
              style={{
                color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
              }}
            >
              <CheckCircle size={20} strokeWidth={2.5} />
            </div>
            <span
              style={{
                color: currentTheme.isDark ? TextColorDark : TextColorWhite,
              }}
              className="text-sm leading-relaxed"
            >
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* CTA Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <VendooButton
          className="w-full"
          children={highlighted ? "Start Free Trial" : "Get Started"}
          onClick={() => {}}
        />
      </motion.div>

      {/* Additional Info for Highlighted Plan */}
      {highlighted && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2">
            <TrendingUp
              size={14}
              style={{
                color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
              }}
            />
            <p
              style={{
                color: currentTheme.isDark ? TextColorDark : TextColorWhite,
              }}
              className="text-xs opacity-70"
            >
              Save 20% with annual billing
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
