import { useEffect } from "react";
import { useLandingContext } from "../../../context/LandingContext";
import { useThemeContext } from "../../../context/ThemeContext";
import type Feature from "../../../models/Feature";
import {
  SecondaryColorDark,
  SecondaryColorWhite,
  BorderColorDark,
  BorderColorWhite,
  PrimaryColorDark,
  PrimaryColorWhite,
  SaleBadgeColorDark,
  AccentColorWhite,
  TextColorDark,
  TextColorWhite,
  MutedTextColorDark,
  MutedTextColorWhite,
} from "../../../utils/constants/colors";
import { featuresList } from "../../../utils/constants/lists";
import SectionHeadingText from "../../../widgets/SectionHeadingText";

interface FeatureProps {
  item: Feature;
}

export default function FeaturesPage() {
  const currentTheme = useThemeContext();
  const publicContext = useLandingContext();

  // setting landing page
  useEffect(() => {
    publicContext.setSelectedLandingNavLink("Features");
  });

  return (
    <section
      className={`min-h-screen flex flex-col items-center py-24 px-6 bg-${
        currentTheme.isDark ? SecondaryColorDark : SecondaryColorWhite
      }
      }`}
    >
      <SectionHeadingText
        title={"Powerful Features Built for Sellers"}
        description="Discover the tools that help you manage your store, boost visibility,
        and grow sales — all in one platform."
      />

      <FeaturesSection />
    </section>
  );
}

export function FeatureCard({ item }: FeatureProps) {
  const currentTheme = useThemeContext();

  return (
    <div
      style={{
        borderWidth: 1,
        borderColor: `${
          currentTheme.isDark ? BorderColorDark : BorderColorWhite
        }`,
        backgroundColor: `${
          currentTheme.isDark ? PrimaryColorDark : PrimaryColorWhite
        }`,
      }}
      className={`
        group w-full p-8 rounded-2xl cursor-pointer 
        shadow-md hover:shadow-xl 
        transition-all duration-300 ease-in-out
        hover:scale-[1.03]
      `}
    >
      {/* Icon */}
      <div
        style={{
          backgroundColor: `${
            currentTheme.isDark ? PrimaryColorDark : PrimaryColorWhite
          }`,
        }}
        className={`
          flex items-center justify-center w-16 h-16 rounded-xl mb-6 
          group-hover:scale-110
          transition-all duration-300 ease-in-out
        `}
      >
        <item.FeatureIcon
          size={32}
          color={currentTheme.isDark ? SaleBadgeColorDark : AccentColorWhite}
          strokeWidth={1.5}
          className="
            transition-all duration-300 
            group-hover:rotate-12
            w-full
          "
        />
      </div>

      {/* Title */}
      <h3
        style={{
          color: `${currentTheme.isDark ? TextColorDark : TextColorWhite}`,
        }}
        className="font-semibold text-xl mb-3 tracking-tight"
      >
        {item.title}
      </h3>

      {/* Description */}
      <p
        style={{
          color: `${
            currentTheme.isDark ? MutedTextColorDark : MutedTextColorWhite
          }`,
        }}
        className="text-sm leading-relaxed"
      >
        {item.desc}
      </p>
    </div>
  );
}
export function FeaturesSection() {
  return (
    <div className="grid md:grid-cols-2 gap-6 m-1">
      {featuresList.map((featureItem, i) => (
        <FeatureCard key={i} item={featureItem} />
      ))}
    </div>
  );
}
