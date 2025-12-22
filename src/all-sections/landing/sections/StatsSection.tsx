import { animate, motion, useInView } from "framer-motion";

import { useRef, useEffect } from "react";
import { useThemeContext } from "../../../context/ThemeContext";
import {
  SecondaryColorDark,
  SecondaryColorWhite,
  SaleBadgeColorDark,
  AccentColorWhite,
  MutedTextColorDark,
  MutedTextColorWhite,
} from "../../../utils/constants/colors";
import { containerVariants } from "../../../variants/containerVariants";

interface Stats {
  number: number;
  label: string;
}

export function LandingStatsSection() {
  // getting current theme
  const currentTheme = useThemeContext();
  const stats: Stats[] = [
    { number: 100000, label: "Sellers Trusting Us" },
    { number: 1500000, label: "Products Listed" },
    { number: 500000, label: "Orders Processed Monthly" },
  ];
  return (
    <section
      style={{
        backgroundColor: `${
          currentTheme.isDark ? SecondaryColorDark : SecondaryColorWhite
        }`,
      }}
      className="w-full py-24 px-6"
    >
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -150px 0px" }}
      >
        {stats.map((stat, i) => (
          <StatsListItem key={i} number={stat.number} label={stat.label} />
        ))}
      </motion.div>
    </section>
  );
}

function StatsListItem({ label, number }: Stats) {
  // getting current theme
  const currentTheme = useThemeContext();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div key={label} variants={itemVariants} className="flex flex-col">
      <span
        style={{
          color: `${
            currentTheme.isDark ? SaleBadgeColorDark : AccentColorWhite
          }`,
        }}
        className="text-5xl font-extrabold"
      >
        <AnimatedCounter to={number} />
      </span>
      <p
        style={{
          color: `${
            currentTheme.isDark ? MutedTextColorDark : MutedTextColorWhite
          }`,
        }}
        className="text-lg mt-2"
      >
        {label}
      </p>
    </motion.div>
  );
}

function AnimatedCounter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const node = ref.current as HTMLSpanElement;
      const controls = animate(0, to, {
        duration: 1,
        ease: "easeInOut",
        onUpdate(value) {
          node.textContent = Math.round(value).toLocaleString();
        },
      });
      return () => controls.stop();
    }
  }, [isInView, to]);

  return <span ref={ref}>0</span>;
}
