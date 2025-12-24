import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "../../context/ThemeContext";
import {
  AccentColorDark,
  AccentColorWhite,
  SecondaryColorDark,
  SecondaryColorWhite,
  PrimaryColorDark,
  PrimaryColorWhite,
  MutedTextColorDark,
  MutedTextColorWhite,
  BorderColorDark,
  BorderColorWhite,
} from "../../utils/constants/colors";

import { LockIcon, MailIcon, User2Icon, Sparkles } from "lucide-react";
import { useAuthManager } from "../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLandingContext, type AuthType } from "../../context/LandingContext";

import {
  DASHBOARD_ROUTE_NAME,
  STORE_CREATE_ROUTE_NAME,
} from "../../utils/constants/pageNames";
import { useUserStore, type UserProfile } from "../../store/useUserStore";
import LoadingDialog from "../../widgets/LoadingDialog";
import { TextButton } from "../../widgets/TextButton";
import VendooButton from "../../widgets/VendooButton";
import { VendooInput } from "../../widgets/VendooInput";
import VendooLabel from "../../widgets/VendooLabel";
import { VerifyEmailDialog } from "../../widgets/VerifyEmailDialog";

// -------------------- Auth Page --------------------
export default function AuthPage() {
  const publicContext = useLandingContext();
  const { isDark } = useThemeContext();

  if (publicContext.isLoading) return <LoadingDialog />;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-300"
      style={{
        backgroundColor: isDark ? SecondaryColorDark : SecondaryColorWhite,
      }}
    >
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <AuthenticationFormWrapper />
        </AnimatePresence>
      </div>
    </div>
  );
}

// -------------------- Authentication Form Wrapper --------------------
function AuthenticationFormWrapper() {
  const { selectedAuthType } = useLandingContext();
  const { isDark } = useThemeContext();

  return (
    <motion.div
      style={{
        backgroundColor: isDark ? PrimaryColorDark : PrimaryColorWhite,
        borderColor: isDark ? BorderColorDark : BorderColorWhite,
      }}
      className="h-screen rounded-3xl shadow-xl border p-8 md:p-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <TabSwitcher />
      <AuthenticationForm
        key={selectedAuthType}
        isDark={isDark}
        authenticationType={selectedAuthType}
        isLoading={false}
      />
    </motion.div>
  );
}

// -------------------- Tab Switcher --------------------
function TabSwitcher() {
  const publicContext = useLandingContext();
  const { isDark } = useThemeContext();

  return (
    <div
      className="flex gap-2 mb-8 p-1 rounded-2xl w-fit mx-auto"
      style={{
        backgroundColor: isDark
          ? "rgba(255, 255, 255, 0.03)"
          : "rgba(0, 0, 0, 0.03)",
      }}
    >
      {["Login", "Register"].map((type) => (
        <VendooTabButton
          key={type}
          text={type}
          isActive={publicContext.selectedAuthType === type}
          onClick={() => publicContext.setSelectedAuthType(type as AuthType)}
          isDark={isDark}
        />
      ))}
    </div>
  );
}

// -------------------- Authentication Form --------------------
interface AuthenticationFormProps {
  isDark: boolean;
  authenticationType: AuthType;
  isLoading: boolean;
}

function AuthenticationForm({
  isDark,
  authenticationType,
  isLoading,
}: AuthenticationFormProps) {
  const navigate = useNavigate();
  const publicContext = useLandingContext();
  const authManager = useAuthManager();
  const userStore = useUserStore();

  const [isRegistering, setIsRegistering] = useState(
    authenticationType === "Register"
  );
  const [isVerificationCode, setVerificationCode] = useState(false);
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const [registerPasswordVisible, setRegisterPasswordVisible] = useState(false);
  const [registerConfirmVisible, setRegisterConfirmVisible] = useState(false);

  const [registerFormData, setRegisterFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const registerInputFields = useMemo(
    () => [
      {
        id: "name",
        label: "Full Name",
        type: "text",
        icon: User2Icon,
        value: registerFormData.name,
        hint: "John Doe",
      },
      {
        id: "email",
        label: "Email Address",
        type: "email",
        icon: MailIcon,
        value: registerFormData.email,
        hint: "you@example.com",
      },
      {
        id: "password",
        label: "Password",
        type: registerPasswordVisible ? "text" : "password",
        icon: LockIcon,
        value: registerFormData.password,
        hint: "Create a strong password",
        isPassword: true,
        isShowingPassword: registerPasswordVisible,
        passwordToggleAction: () => setRegisterPasswordVisible((prev) => !prev),
      },
      {
        id: "confirmPassword",
        label: "Confirm Password",
        type: registerConfirmVisible ? "text" : "password",
        icon: LockIcon,
        value: registerFormData.confirmPassword,
        hint: "Re-enter your password",
        isPassword: true,
        isShowingPassword: registerConfirmVisible,
        passwordToggleAction: () => setRegisterConfirmVisible((prev) => !prev),
      },
    ],
    [registerFormData, registerPasswordVisible, registerConfirmVisible]
  );

  const loginInputFields = useMemo(
    () => [
      {
        id: "email",
        label: "Email Address",
        type: "email",
        icon: MailIcon,
        value: loginFormData.email,
        hint: "you@example.com",
      },
      {
        id: "password",
        label: "Password",
        type: loginPasswordVisible ? "text" : "password",
        icon: LockIcon,
        value: loginFormData.password,
        hint: "Enter your password",
        isPassword: true,
        isShowingPassword: loginPasswordVisible,
        passwordToggleAction: () => setLoginPasswordVisible((prev) => !prev),
      },
    ],
    [loginFormData, loginPasswordVisible]
  );

  const activeFields = isRegistering ? registerInputFields : loginInputFields;

  const handleInputChange = (id: string, value: string) => {
    if (isRegistering)
      setRegisterFormData((prev) => ({ ...prev, [id]: value }));
    else setLoginFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !registerFormData.name ||
      !registerFormData.email ||
      !registerFormData.password ||
      !registerFormData.confirmPassword
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (registerFormData.password !== registerFormData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const isEmailValid = validateEmail({ email: registerFormData.email });
    if (!isEmailValid) {
      toast.error("Please input a valid email");
      return;
    }

    try {
      const result = await authManager.Register({
        Name: registerFormData.name,
        Email: registerFormData.email,
        Password: registerFormData.password,
      });
      if (result) {
        toast.info(
          "A verification link has been sent to your email. Please check your inbox (and spam folder) and click the link to verify your account."
        );
      }
    } catch (err: any) {
      toast.error("Something went wrong: " + err);
    } finally {
      setRegisterFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginFormData.email || !loginFormData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const result = await authManager.SignIn({
        Email: loginFormData.email,
        Password: loginFormData.password,
      });
      if (result != null) {
        const {
          UserID,
          Name,
          Email,
          Image,
          hasShop,
          memberSince,
          location,
          phoneNumber,
        } = result.UserProfile;
        const userProfile: UserProfile = {
          userID: UserID?.toString(),
          name: Name!,
          email: Email,
          image: Image || null,
          hasShop: hasShop,
          location: location,
          phoneNumber: phoneNumber,
          memberSince: memberSince,
        };
        const userToken = result.Token || null;
        userStore.setUserProfile(userProfile);
        userStore.setCurrentUserToken(userToken!);
        setLoginFormData({ email: "", password: "" });
        publicContext.setLoadingStatus(false);

        if (hasShop) {
          navigate(DASHBOARD_ROUTE_NAME, { replace: true });
        } else {
          navigate(STORE_CREATE_ROUTE_NAME, { replace: true });
        }
      }
    } catch (error: any) {
      toast.error(error?.message || "Login failed. Check credentials.");
    } finally {
      publicContext.setLoadingStatus(false);
    }
  };

  const handleGoogleLogin = async (token: string) => {
    try {
      const result = await authManager.GoogleLogin(token);
      if (result != null) {
        const {
          UserID,
          Name,
          Email,
          Image,
          hasShop,
          memberSince,
          location,
          phoneNumber,
        } = result.UserProfile;
        const userProfile: UserProfile = {
          userID: UserID?.toString(),
          name: Name!,
          email: Email,
          image: Image || null,
          hasShop: hasShop,
          memberSince: memberSince,
          location: location,
          phoneNumber: phoneNumber,
        };
        const userToken = result?.Token || null;
        userStore.setUserProfile(userProfile);
        userStore.setCurrentUserToken(userToken!);
        publicContext.setLoadingStatus(false);

        if (hasShop) {
          navigate(DASHBOARD_ROUTE_NAME, { replace: true });
        } else {
          navigate(STORE_CREATE_ROUTE_NAME, { replace: true });
        }
      } else {
        toast.error("Google login failed. Please try again.");
      }
    } catch (error: any) {
      toast.error(error?.message || "Login failed. Check credentials.");
    } finally {
      publicContext.setLoadingStatus(false);
    }
  };

  const toggleFormMode = () => {
    if (isRegistering) {
      publicContext.setSelectedAuthType("Login");
    } else {
      publicContext.setSelectedAuthType("Register");
    }
    setIsRegistering((prev) => !prev);
  };

  return (
    <>
      <VerifyEmailDialog
        isOpen={isVerificationCode}
        onClose={() => {
          setVerificationCode(false);
        }}
      />
      <motion.form
        onSubmit={isRegistering ? handleRegister : handleLogin}
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <span
            style={{
              backgroundColor: isDark
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.05)",
              color: isDark ? AccentColorDark : AccentColorWhite,
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
          >
            <Sparkles size={12} />
            {isRegistering ? "Start Free Trial" : "Welcome Back"}
          </span>

          <h1
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ color: isDark ? AccentColorDark : AccentColorWhite }}
          >
            {isRegistering ? "Create an Account" : "Welcome Back!"}
          </h1>

          <p
            className="text-sm"
            style={{ color: isDark ? MutedTextColorDark : MutedTextColorWhite }}
          >
            {isRegistering
              ? "Join Vendoo today and start exploring the marketplace."
              : "Sign in to access your account and continue your journey."}
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {activeFields.map((field) => (
            <div key={field.id}>
              <VendooLabel text={field.label} htmlFor={field.id} />
              <VendooInput
                id={field.id}
                name={field.id}
                type={field.type}
                value={field.value}
                PrefixIcon={field.icon}
                hintText={field.hint}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                isRequired
                isPassword={field.isPassword}
                isShowingPassword={field.isShowingPassword}
                passwordToggleAction={field.passwordToggleAction}
                isFullWidth={true}
              />
              {isRegistering && field.id === "email" && (
                <p
                  style={{
                    color: isDark ? MutedTextColorDark : MutedTextColorWhite,
                  }}
                  className="text-xs mt-1.5"
                >
                  This email will need to be verified to activate your account.
                </p>
              )}
              {!isRegistering && field.id === "password" && (
                <div className="flex justify-end mt-1.5">
                  <TextButton
                    text="Forgot Password?"
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs"
                    textColor={isDark ? AccentColorDark : AccentColorWhite}
                    type="button"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <VendooButton
          type="submit"
          children={isRegistering ? "Create Account" : "Sign In"}
          className="w-full"
          isDisabled={isLoading}
        />

        {/* Divider */}
        <GoogleLoginButton isDark={isDark} onSuccess={handleGoogleLogin} />

        {/* Toggle Auth Mode */}
        <div className="text-center">
          <p
            className="text-sm"
            style={{ color: isDark ? MutedTextColorDark : MutedTextColorWhite }}
          >
            {isRegistering
              ? "Already have an account? "
              : "Don't have an account? "}
            <span
              onClick={toggleFormMode}
              className="font-semibold cursor-pointer hover:opacity-80 transition-opacity"
              style={{ color: isDark ? AccentColorDark : AccentColorWhite }}
            >
              {isRegistering ? "Sign In" : "Register"}
            </span>
          </p>
        </div>
      </motion.form>
    </>
  );
}

// -------------------- Google Login Button --------------------
function GoogleLoginButton({
  isDark,
  onSuccess,
}: {
  isDark: boolean;
  onSuccess: (token: string) => void;
}) {
  return (
    <div className=" flex flex-col justify-center items-center space-y-4 ">
      <div className="flex items-center justify-center gap-3 ">
        <div
          className="flex-1 h-px"
          style={{
            backgroundColor: isDark ? BorderColorDark : BorderColorWhite,
          }}
        />
        <span
          className="text-xs uppercase tracking-wider font-medium"
          style={{ color: isDark ? MutedTextColorDark : MutedTextColorWhite }}
        >
          Or continue with
        </span>
        <div
          className="flex-1 h-px"
          style={{
            backgroundColor: isDark ? BorderColorDark : BorderColorWhite,
          }}
        />
      </div>
      <GoogleLogin
        shape="circle"
        size="large"
        text="continue_with"
        hosted_domain="vendoolb.com"
        useOneTap
        onSuccess={(res) => onSuccess(res.credential!)}
        onError={() => toast.error("Google login failed")}
      />
    </div>
  );
}

// -------------------- Vendoo Tab Button --------------------
interface VendooTabButtonProps {
  text: string;
  isActive: boolean;
  isDark: boolean;
  onClick: () => void;
}

function VendooTabButton({
  text,
  isActive,
  isDark,
  onClick,
}: VendooTabButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 rounded-xl font-semibold text-sm transition-all"
      style={{
        color: isActive
          ? isDark
            ? "black"
            : "white"
          : isDark
          ? MutedTextColorDark
          : MutedTextColorWhite,
        backgroundColor: isActive
          ? isDark
            ? AccentColorDark
            : AccentColorWhite
          : "transparent",
      }}
    >
      {text}
    </button>
  );
}

function validateEmail({ email }: { email: string }): boolean {
  return /^\S+@\S+\.\S+$/.test(email);
}
