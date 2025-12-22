import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useThemeContext } from "../../../context/ThemeContext";
import type { Testimonial } from "../../../models/Testimonial";
import {
  SecondaryColorDark,
  SecondaryColorWhite,
  MutedTextColorDark,
  SaleBadgeColorDark,
  MutedTextColorWhite,
  AccentColorDark,
  AccentColorWhite,
} from "../../../utils/constants/colors";
import { testimonials } from "../../../utils/constants/lists";
import { containerVariants } from "../../../variants/containerVariants";

export function TestimonialSection() {
  return (
    <motion.div
      variants={containerVariants}
      initial={"hidden"}
      whileInView={"visible"}
      viewport={{ once: true, margin: "10px 10px -150px 0px" }}
      className="max-w-6xl md:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ml-5 mr-5"
    >
      {testimonials.map((testimonial, i) => (
        <TestimonialCard
          key={i}
          id={testimonial.id}
          quote={testimonial.quote}
          name={testimonial.name}
          title={testimonial.title}
          stars={testimonial.stars}
        />
      ))}
    </motion.div>
  );
}

export function TestimonialCard({ title, quote, name, stars }: Testimonial) {
  // getting current theme
  const currentTheme = useThemeContext();
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      key={name}
      variants={itemVariants}
      style={{
        backgroundColor: `${
          currentTheme.isDark ? SecondaryColorDark : SecondaryColorWhite
        }`,
        borderColor: `${currentTheme.isDark ? MutedTextColorDark : "#e5e7eb"}`,
      }}
      className="flex flex-col p-6 rounded-lg shadow-lg border"
    >
      <div className="flex mb-14">
        {[...Array(stars)].map((_, i) => (
          <Star
            key={i}
            style={{ color: SaleBadgeColorDark, fill: SaleBadgeColorDark }}
            className="w-5 h-5"
          />
        ))}
      </div>
      <h1
        style={{
          color: `${currentTheme.isDark ? "White" : "Black"}`,
        }}
      >
        {name}
      </h1>
      <p
        style={{
          color: `${
            currentTheme.isDark ? MutedTextColorDark : MutedTextColorWhite
          }`,
        }}
        className="text-lg italic mb-6"
      >
        "{quote}"
      </p>
      <span
        style={{
          color: `${currentTheme.isDark ? "White" : "Black"}`,
        }}
        className="font-bold text-lg"
      >
        {name}
      </span>
      <span
        style={{
          color: `${currentTheme.isDark ? AccentColorDark : AccentColorWhite}`,
        }}
        className="text-sm"
      >
        {title}
      </span>
    </motion.div>
  );
}
