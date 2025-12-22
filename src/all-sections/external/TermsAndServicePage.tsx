import { motion } from "framer-motion";
import { FileText, Clock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useThemeContext } from "../../context/ThemeContext";
import {
  SecondaryColorDark,
  SecondaryColorWhite,
  TextColorDark,
  TextColorWhite,
  AccentColorDark,
  AccentColorWhite,
  MutedTextColorDark,
  MutedTextColorWhite,
  PrimaryColorDark,
  PrimaryColorWhite,
  BorderColorDark,
  BorderColorWhite,
} from "../../utils/constants/colors";
import { termsConditionsList } from "../../utils/constants/lists";
import { VendooLogo } from "../../widgets/VendooLogo";
import LandingFooter from "../landing/header&Footer/LandingFooter";
import VendooListTile from "../landing/listItem/TermsAndPrivacyList";

export default function TermsPage() {
  const { isDark } = useThemeContext();
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: isDark ? SecondaryColorDark : SecondaryColorWhite,
      }}
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${
              isDark ? AccentColorDark : AccentColorWhite
            }, transparent)`,
          }}
        />
      </div>

      <section className="relative z-10 py-12 px-5 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            {/* Back Button & Logo */}
            <div className="flex items-center justify-between mb-12">
              <VendooLogo />

              <motion.button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{
                  color: isDark ? MutedTextColorDark : MutedTextColorWhite,
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.03)"
                    : "rgba(0, 0, 0, 0.03)",
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={16} />
                Back
              </motion.button>
            </div>

            {/* Hero Card */}
            <motion.div
              style={{
                backgroundColor: isDark ? PrimaryColorDark : PrimaryColorWhite,
                borderColor: isDark ? BorderColorDark : BorderColorWhite,
              }}
              className="rounded-3xl border-2 p-8 md:p-12 relative overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Decorative corner */}
              <div
                className="absolute top-0 right-0 w-40 h-40 opacity-5 rounded-bl-full"
                style={{
                  background: `radial-gradient(circle at top right, ${
                    isDark ? AccentColorDark : AccentColorWhite
                  }, transparent)`,
                }}
              />

              <div className="relative z-10">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="mb-6"
                >
                  <span
                    style={{
                      backgroundColor: isDark
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.05)",
                      color: isDark ? AccentColorDark : AccentColorWhite,
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                  >
                    <FileText size={14} />
                    Legal Agreement
                  </span>
                </motion.div>

                {/* Title */}
                <h1
                  style={{ color: isDark ? AccentColorDark : AccentColorWhite }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                >
                  Terms of Service
                </h1>

                {/* Description */}
                <p
                  style={{
                    color: isDark ? MutedTextColorDark : MutedTextColorWhite,
                  }}
                  className="text-base md:text-lg leading-relaxed max-w-3xl"
                >
                  Welcome to{" "}
                  <span
                    className="font-bold"
                    style={{
                      color: isDark ? AccentColorDark : AccentColorWhite,
                    }}
                  >
                    Vendoo
                  </span>
                  . By using our website and services, you agree to comply with
                  and be bound by the following terms and conditions.
                </p>

                {/* Last Updated */}
                <motion.div
                  className="flex items-center gap-2 mt-8 pt-6 border-t"
                  style={{
                    borderColor: isDark ? BorderColorDark : BorderColorWhite,
                    color: isDark ? MutedTextColorDark : MutedTextColorWhite,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Clock size={16} />
                  <span className="text-sm">Last updated: October 2025</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content List */}
          <motion.div
            className="space-y-6 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {termsConditionsList.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <VendooListTile
                  item={{ title: item.title, description: item.description }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Important Notice Section */}
          <motion.div
            style={{
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.02)"
                : "rgba(0, 0, 0, 0.02)",
              borderColor: isDark ? BorderColorDark : BorderColorWhite,
            }}
            className="rounded-2xl border-2 p-8 mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start gap-4">
              <div
                style={{
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.05)",
                }}
                className="p-3 rounded-xl flex-shrink-0"
              >
                <FileText
                  size={24}
                  style={{ color: isDark ? AccentColorDark : AccentColorWhite }}
                />
              </div>
              <div>
                <h3
                  style={{ color: isDark ? TextColorDark : TextColorWhite }}
                  className="text-lg font-bold mb-2"
                >
                  Important Notice
                </h3>
                <p
                  style={{
                    color: isDark ? MutedTextColorDark : MutedTextColorWhite,
                  }}
                  className="text-sm leading-relaxed"
                >
                  By accessing or using Vendoo's services, you acknowledge that
                  you have read, understood, and agree to be bound by these
                  Terms of Service. If you do not agree with any part of these
                  terms, please do not use our services.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            style={{
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.02)"
                : "rgba(0, 0, 0, 0.02)",
              borderColor: isDark ? BorderColorDark : BorderColorWhite,
            }}
            className="rounded-2xl border-2 p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              style={{ color: isDark ? TextColorDark : TextColorWhite }}
              className="text-xl font-bold mb-3"
            >
              Questions About Our Terms?
            </h3>
            <p
              style={{
                color: isDark ? MutedTextColorDark : MutedTextColorWhite,
              }}
              className="text-sm mb-6"
            >
              If you have any questions or need clarification, our team is here
              to help.
            </p>
            <motion.a
              href="mailto:support@vendoo.com"
              style={{
                color: isDark ? AccentColorDark : AccentColorWhite,
              }}
              className="inline-flex items-center gap-2 font-semibold text-sm hover:opacity-80 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support →
            </motion.a>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
