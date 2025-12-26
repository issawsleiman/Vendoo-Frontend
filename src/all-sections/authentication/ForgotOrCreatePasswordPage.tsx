import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, Shield } from "lucide-react";

import { useThemeContext } from "../../context/ThemeContext";
import {
  AccentColorDark,
  AccentColorWhite,
  MutedTextColorDark,
  MutedTextColorWhite,
  PrimaryColorDark,
  PrimaryColorWhite,
  SecondaryColorDark,
  SecondaryColorWhite,
  BorderColorDark,
  BorderColorWhite,
} from "../../utils/constants/colors";

import { useLandingContext } from "../../context/LandingContext";
import { useEffect, useState, type FormEvent } from "react";
import { useAuthManager } from "../../context/AuthContext";
import VendooButton from "../../widgets/VendooButton";
import { VendooInput } from "../../widgets/VendooInput";
import VendooLabel from "../../widgets/VendooLabel";
import { VendooLogo } from "../../widgets/VendooLogo";

/**
 * ForgotOrCreatePasswordPage
 *
 * This component serves as a unified wrapper for both the "Forgot Password" and
 * "Create New Password" pages, sharing the same layout and styling for consistency.
 */

export default function ForgotOrCreatePasswordPage({
  isCreatePasswordPage,
}: {
  isCreatePasswordPage?: boolean;
  isEmailVerifiedPage?: boolean;
}) {
  const isDark = useThemeContext().isDark;
  const navigate = useNavigate();
  const authManager = useAuthManager();
  const publicManager = useLandingContext();

  const token = new URLSearchParams(window.location.search).get("token") || "";

  useEffect(() => {
    if (isCreatePasswordPage) {
      if (!token) {
        navigate("/not-found", { replace: true });
      }
    }
  }, [isCreatePasswordPage, navigate, token]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: FormEvent) =>
    isCreatePasswordPage
      ? handleCreatePassword(e)
      : handleCheckEmailIfExists(e);

  const handleCreatePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    const ok = await authManager.ResetUserPassword(token, password);
    if (ok) {
      navigate("/authenticate", { replace: true });
      publicManager.setSelectedAuthType("Login");
    }
  };

  const handleCheckEmailIfExists = async (e: FormEvent) => {
    e.preventDefault();
    await authManager.CheckEmailIfExists(email);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300"
      style={{
        backgroundColor: isDark ? SecondaryColorDark : SecondaryColorWhite,
      }}
    >
      <div className="w-full max-w-md">
        <motion.div
          style={{
            backgroundColor: isDark ? PrimaryColorDark : PrimaryColorWhite,
            borderColor: isDark ? BorderColorDark : BorderColorWhite,
          }}
          className="rounded-3xl shadow-xl border p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-6 text-sm font-medium"
            style={{
              color: isDark ? MutedTextColorDark : MutedTextColorWhite,
            }}
            whileHover={{ x: -2 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowLeft size={16} />
            Back
          </motion.button>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <VendooLogo />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <span
              style={{
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.05)"
                  : "rgba(0, 0, 0, 0.05)",
                color: isDark ? AccentColorDark : AccentColorWhite,
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            >
              {isCreatePasswordPage ? <Lock size={12} /> : <Shield size={12} />}
              {isCreatePasswordPage ? "Secure Account" : "Account Recovery"}
            </span>

            <h1
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{
                color: isDark ? AccentColorDark : AccentColorWhite,
              }}
            >
              {isCreatePasswordPage
                ? "Create New Password"
                : "Forgot Password?"}
            </h1>

            <p
              className="text-sm"
              style={{
                color: isDark ? MutedTextColorDark : MutedTextColorWhite,
              }}
            >
              {isCreatePasswordPage
                ? "Enter a new password and confirm it below to secure your account."
                : "Enter your email address and we'll send you a link to reset your password."}
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            name={
              isCreatePasswordPage
                ? "create-password-form"
                : "forgot-password-form"
            }
            className="space-y-5"
          >
            {isCreatePasswordPage ? (
              <>
                <div>
                  <VendooLabel text="New Password" htmlFor="password" />
                  <VendooInput
                    id="password"
                    value={password}
                    name="password"
                    type="password"
                    placeholder="Enter new password"
                    PrefixIcon={Lock}
                    isRequired
                    isFullWidth
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <VendooLabel
                    text="Confirm Password"
                    htmlFor="confirmPassword"
                  />
                  <VendooInput
                    id="confirmPassword"
                    value={confirmPassword}
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    PrefixIcon={Lock}
                    isRequired
                    isFullWidth
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <VendooButton
                  children="Set New Password"
                  type="submit"
                  className="w-full"
                />
              </>
            ) : (
              <>
                <div>
                  <VendooLabel text="Email Address" htmlFor="email" />
                  <VendooInput
                    id="email"
                    value={email}
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    PrefixIcon={Mail}
                    isRequired
                    isFullWidth
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <VendooButton
                  children="Send Reset Link"
                  type="submit"
                  className="w-full"
                />
              </>
            )}
          </form>

          {/* Info Box */}
          <div
            style={{
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.02)"
                : "rgba(0, 0, 0, 0.02)",
              borderColor: isDark ? BorderColorDark : BorderColorWhite,
            }}
            className="mt-6 p-4 rounded-xl border"
          >
            <p
              className="text-xs text-center"
              style={{
                color: isDark ? MutedTextColorDark : MutedTextColorWhite,
              }}
            >
              {isCreatePasswordPage
                ? "Make sure your password is at least 8 characters long and includes a mix of letters and numbers."
                : "If you don't receive an email within a few minutes, check your spam folder or try again."}
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p
              className="text-sm"
              style={{
                color: isDark ? MutedTextColorDark : MutedTextColorWhite,
              }}
            >
              Remembered your password?{" "}
              <span
                onClick={() => {
                  navigate("/authenticate");
                  publicManager.setSelectedLandingNavLink("Home");
                  publicManager.setSelectedAuthType("Login");
                }}
                className="font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                style={{
                  color: isDark ? AccentColorDark : AccentColorWhite,
                }}
              >
                Sign In
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
