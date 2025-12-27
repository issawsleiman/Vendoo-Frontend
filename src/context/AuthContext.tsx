import React, { createContext, useContext } from "react";
import {
  CheckEmailIfExistsAPI,
  GoogleLoginAPI,
  LoginAPI,
  RegisterAPI,
  SendEmailVerificationTokenAPI,
  SendNewPassword,
  UpdateUserAPI as UpdateProfileAPI,
  type UpdateProfileInput,
} from "../api/authApi";

import { toast } from "react-toastify";
import { TextButton } from "../widgets/TextButton";
import type { UserProfile } from "../store/useUserStore";

const userTokenKey = "auth1Token";

// Interfaces
export interface LoginInfo {
  Email: string;
  Password: string;
  Token?: string;
}

export interface RegisterInfo {
  Name: string;
  Email: string;
  Password: string;
}

export interface Profile {
  UserID?: number;
  Name: string;
  Email: string;
  Image?: string;
  hasShop?: boolean;
  memberSince?: string;
  location: string;
  phoneNumber: string;
}

// Auth Response
export type AuthResponse = {
  UserProfile: Profile;
  Token: string;
};

interface AuthManager {
  SignIn: (loginInfo: LoginInfo) => Promise<AuthResponse | null>;
  Register: (registerInfo: RegisterInfo) => Promise<boolean>;
  GetUserAuthToken: () => string | null;
  // send user verification token
  SendEmailVerificationToken: (token: string) => Promise<boolean>;
  // Check email if exists to change password
  CheckEmailIfExists: (email: string) => Promise<boolean>;
  // Reset user password
  ResetUserPassword: (token: string, password: string) => Promise<boolean>;

  // Google login
  GoogleLogin: (token: string) => Promise<AuthResponse | null>;

  // updateUserProfile
  UpdateUserProfile: (
    profile: UpdateProfileInput
  ) => Promise<UserProfile | null>;
}

const AuthContext = createContext<AuthManager | null>(null);

export function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login in
  const SignIn = async (loginInfo: LoginInfo): Promise<AuthResponse | null> => {
    const { Email, Password } = loginInfo;
    if (!Email || !Password) {
      toast.error("Missing Email/Password");
      return null;
    }

    try {
      const response = await LoginAPI(loginInfo.Email, loginInfo.Password);
      const {
        user_id,
        name,
        email,
        image,
        has_shop,
        location,
        phone_number,
        member_since,
      } = response.user;
      const token = response.token;

      const profile: Profile = {
        UserID: user_id,
        Name: name,
        Email: email,
        Image: image,
        hasShop: has_shop,
        memberSince: member_since,
        location: location,
        phoneNumber: phone_number,
      };
      const result: AuthResponse = {
        UserProfile: profile,
        Token: token,
      };
      return result;
    } catch (error: any) {
      const errorMessage = String(error);
      console.log("Something went wrong");
      // Check for email validation wording
      if (
        errorMessage.toLowerCase().includes("email") &&
        errorMessage.toLowerCase().includes("verify")
      ) {
        ResendVerificationToast(() => {});
      } else {
        toast.error(errorMessage);
      }
      return null;
    }
  };

  // Register
  const Register = async (registerInfo: RegisterInfo): Promise<boolean> => {
    if (!registerInfo.Name || !registerInfo.Email || !registerInfo.Password) {
      toast.warn("Please fill all required fields.");
      return false;
    }
    try {
      const result = await RegisterAPI(
        registerInfo.Name,
        registerInfo.Email,
        registerInfo.Password
      );
      if (result) {
        return true;
      }
      return false;
    } catch (err: any) {
      toast.error(err);
      return false;
    }
  };

  // Send email verification token
  const SendVerificationToken = async (token: string): Promise<boolean> => {
    const resp = await SendEmailVerificationTokenAPI(token);
    if (resp == null) {
      return false;
    }
    return true;
  };

  // Send email to check whether exists in order to change password
  const CheckEmailIfExists = async (email: string): Promise<boolean> => {
    // 1. Client-side input validation
    if (!email) {
      toast.error("Please input your email");
      return false;
    }

    const SUCCESS_MESSAGE =
      "If an account with that email exists, a password reset link has been sent.";

    try {
      const response = await CheckEmailIfExistsAPI(email);
      if (response.error) {
        toast.error(response.error);
        return false;
      }
      toast.success(SUCCESS_MESSAGE);
      return true;
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.error ||
        "Sending email to check if exists is failed. Please try again later";
      toast.error(errorMessage);
      return false;
    }
  };

  // Resets user password
  const ResetPassword = async (
    token: string,
    password: string
  ): Promise<boolean> => {
    try {
      const resp = await SendNewPassword(token, password);
      if (resp.status === 200) {
        toast.success(resp.message);
        return true;
      }
    } catch (error: any) {
      toast.error(error);
      return false;
    }
    return false;
  };

  // Google login
  const GoogleLogin = async (token: string): Promise<AuthResponse | null> => {
    try {
      const response = await GoogleLoginAPI(token);
      if (response.status == 200) {
        // extracting the user info
        const {
          user_id,
          name,
          email,
          image,
          has_shop,
          location,
          phone_number,
          member_since,
        } = response.user;
        const token = response.token;

        const profile: Profile = {
          UserID: user_id,
          Name: name,
          Email: email,
          Image: image,
          hasShop: has_shop,
          memberSince: member_since,
          location: location,
          phoneNumber: phone_number,
        };

        const result: AuthResponse = {
          UserProfile: profile,
          Token: token,
        };

        return result;
      }
    } catch (error: any) {
      return null;
    }
    return null;
  };

  // Update user profile
  const UpdateUserProfile = async (
    profile: UpdateProfileInput
  ): Promise<UserProfile | null> => {
    try {
      const response = await UpdateProfileAPI(profile);
      if (response) {
        const {
          name,
          email,
          image,
          has_shop,
          location,
          phone_number,
          member_since,
        } = response.user;

        const updatedProfile: UserProfile = {
          name: name,
          email: email,
          image: image,
          hasShop: has_shop,
          memberSince: member_since,
          location: location,
          phoneNumber: phone_number,
        };

        return updatedProfile;
      }
    } catch (err: any) {
      toast.error(err);
      return null;
    }
    return null;
  };

  // Get token
  const GetUserAuthToken = () => localStorage.getItem(userTokenKey);
  return (
    <AuthContext.Provider
      value={{
        SignIn,
        Register,
        GetUserAuthToken,
        SendEmailVerificationToken: SendVerificationToken,
        CheckEmailIfExists: CheckEmailIfExists,
        ResetUserPassword: ResetPassword,
        GoogleLogin: GoogleLogin,
        UpdateUserProfile: UpdateUserProfile,
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "useAuthContext must be used inside AuthenticationProvider"
    );
  return context;
};

function ResendVerificationToast(onResendClick: () => void) {
  return toast(
    <div className="flex items-center justify-between gap-3">
      <span>Your account is not verified. Please verify your email.</span>
      <TextButton text="Resend Email Verification" onClick={onResendClick} />
    </div>,
    {
      autoClose: false,
      type: "info",
    }
  );
}
