import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUpRight,
  Heart,
} from "lucide-react";
import { useLandingContext } from "../../../context/LandingContext";
import { useThemeContext } from "../../../context/ThemeContext";
import {
  PrimaryColorDark,
  PrimaryColorWhite,
  TextColorDark,
  TextColorWhite,
  MutedTextColorDark,
  MutedTextColorWhite,
  AccentColorDark,
  AccentColorWhite,
  BorderColorDark,
  BorderColorWhite,
  SecondaryColorDark,
  SecondaryColorWhite,
} from "../../../utils/constants/colors";
import { VendooLogo } from "../../../widgets/VendooLogo";
import VendooButton from "../../../widgets/VendooButton";

export default function LandingFooter() {
  const currentTheme = useThemeContext();
  const publicContext = useLandingContext();

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  const navigationLinks = [
    { text: "Home", path: "/home", navKey: "Home" },
    { text: "About", path: "/about", navKey: "About" },
    { text: "Pricing", path: "/pricing", navKey: "Pricing" },
    { text: "Contact", path: "/contact", navKey: "Contact" },
  ];

  const legalLinks = [
    { text: "Privacy Policy", path: "/privacy-policy", blank: true },
    { text: "Terms of Service", path: "/terms-of-service", blank: true },
    // { text: "Cookie Policy", path: "/cookie-policy", blank: true },
  ];

  // const resourceLinks = [
  //   { text: "Help Center", path: "/help" },
  //   { text: "Documentation", path: "/docs" },
  //   { text: "API Reference", path: "/api" },
  //   { text: "Status", path: "/status" },
  // ];

  return (
    <footer
      style={{
        backgroundColor: currentTheme.isDark
          ? PrimaryColorDark
          : PrimaryColorWhite,
      }}
      className="relative overflow-hidden"
    >
      {/* Decorative gradient */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${
              currentTheme.isDark ? AccentColorDark : AccentColorWhite
            }, transparent)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <VendooLogo />
            <p
              style={{
                color: currentTheme.isDark
                  ? MutedTextColorDark
                  : MutedTextColorWhite,
              }}
              className="text-sm leading-relaxed max-w-xs"
            >
              Empowering sellers worldwide with powerful e-commerce tools.
              Simplify your business and focus on growth.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  style={{
                    backgroundColor: currentTheme.isDark
                      ? "rgba(255, 255, 255, 0.05)"
                      : "rgba(0, 0, 0, 0.03)",
                    borderColor: currentTheme.isDark
                      ? BorderColorDark
                      : BorderColorWhite,
                  }}
                  className="p-3 rounded-xl border transition-all duration-300"
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                    backgroundColor: currentTheme.isDark
                      ? AccentColorDark
                      : AccentColorWhite,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon
                    size={18}
                    style={{
                      color: currentTheme.isDark
                        ? TextColorDark
                        : TextColorWhite,
                    }}
                    strokeWidth={1.5}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4
              style={{
                color: currentTheme.isDark ? TextColorDark : TextColorWhite,
              }}
              className="font-bold text-sm uppercase tracking-wider mb-4"
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <FooterLink
                    text={link.text}
                    linkTo={link.path}
                    onClick={() =>
                      publicContext.setSelectedLandingNavLink(link.navKey)
                    }
                  />
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          {/* <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4
              style={{
                color: currentTheme.isDark ? TextColorDark : TextColorWhite,
              }}
              className="font-bold text-sm uppercase tracking-wider mb-4"
            >
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <FooterLink text={link.text} linkTo={link.path} />
                </li>
              ))}
            </ul>
          </motion.div> */}

          {/* Legal Links */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4
              style={{
                color: currentTheme.isDark ? TextColorDark : TextColorWhite,
              }}
              className="font-bold text-sm uppercase tracking-wider mb-4"
            >
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <FooterLink
                    text={link.text}
                    linkTo={link.path}
                    isTargetBlank={link.blank}
                    onClick={() => publicContext.setSelectedLandingNavLink("")}
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          style={{
            backgroundColor: currentTheme.isDark
              ? SecondaryColorDark
              : SecondaryColorWhite,
            borderColor: currentTheme.isDark
              ? BorderColorDark
              : BorderColorWhite,
          }}
          className="rounded-2xl border p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 text-center md:text-left">
              <h3
                style={{
                  color: currentTheme.isDark ? TextColorDark : TextColorWhite,
                }}
                className="text-xl font-bold mb-2"
              >
                Stay Updated
              </h3>
              <p
                style={{
                  color: currentTheme.isDark
                    ? MutedTextColorDark
                    : MutedTextColorWhite,
                }}
                className="text-sm"
              >
                Subscribe to our newsletter for tips, updates, and exclusive
                offers.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  backgroundColor: currentTheme.isDark
                    ? PrimaryColorDark
                    : PrimaryColorWhite,
                  borderColor: currentTheme.isDark
                    ? BorderColorDark
                    : BorderColorWhite,
                  color: currentTheme.isDark ? TextColorDark : TextColorWhite,
                }}
                className="px-4 py-3 rounded-xl border flex-1 min-w-[200px] focus:outline-none focus:ring-2 transition-all"
              />
              <VendooButton
                className="w-full"
                children={
                  <div className="w-full flex flex-row justify-center items-center gap-1">
                    <Mail size={16} />
                    Subscribe
                  </div>
                }
              />
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div
          style={{
            backgroundColor: currentTheme.isDark
              ? BorderColorDark
              : BorderColorWhite,
          }}
          className="h-px w-full mb-8"
        />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p
            style={{
              color: currentTheme.isDark
                ? MutedTextColorDark
                : MutedTextColorWhite,
            }}
            className="text-sm flex items-center gap-2"
          >
            © {new Date().getFullYear()} Vendoo. Made with
            <Heart
              size={14}
              fill={currentTheme.isDark ? AccentColorDark : AccentColorWhite}
              style={{
                color: currentTheme.isDark ? AccentColorDark : AccentColorWhite,
              }}
            />
            All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              style={{
                color: currentTheme.isDark
                  ? MutedTextColorDark
                  : MutedTextColorWhite,
              }}
              className="text-sm hover:opacity-70 transition-opacity"
            >
              Sitemap
            </a>
            <a
              href="#"
              style={{
                color: currentTheme.isDark
                  ? MutedTextColorDark
                  : MutedTextColorWhite,
              }}
              className="text-sm hover:opacity-70 transition-opacity"
            >
              Accessibility
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  text: string;
  linkTo: string;
  isTargetBlank?: boolean;
  onClick?: () => void;
}

function FooterLink({
  text,
  linkTo,
  isTargetBlank = false,
  onClick,
}: FooterLinkProps) {
  const currentTheme = useThemeContext();

  return (
    <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
      <Link
        to={linkTo}
        target={isTargetBlank ? "_blank" : ""}
        replace={isTargetBlank}
        onClick={onClick}
        style={{
          color: currentTheme.isDark ? MutedTextColorDark : MutedTextColorWhite,
        }}
        className="text-sm hover:opacity-70 transition-opacity inline-flex items-center gap-1 group"
      >
        {text}
        {isTargetBlank && (
          <ArrowUpRight
            size={14}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          />
        )}
      </Link>
    </motion.div>
  );
}
