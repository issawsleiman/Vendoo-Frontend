// This file contains API calls related to authentication

import { HttpStatusCode } from "axios";
import axiosInstance from "./axiosInstance";

// MY ENDPOINTS
const AUTH_LOGIN = "/auth/login";
const AUTH_REGISTER = "/auth/register";
const AUTH_VERIFY_EMAIL = "/auth/verify_email";
const AUTH_CHECK_EMAIL = "/auth/check-email";
const AUTH_RESET_PASSWORD = "/auth/reset-password";
const AUTH_GOOGLE_LOGIN = "/auth/google/login";
const FAILED_TO_ACCESS_SERVER = "Unable to reach Vendoo Server";

// Login API
export const LoginAPI = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(AUTH_LOGIN, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data == null) {
      throw FAILED_TO_ACCESS_SERVER;
    }
    throw error.response.data.error;
  }
};

// Register API
export const RegisterAPI = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post(AUTH_REGISTER, {
      name,
      email,
      password,
    });
    if (response.data.status === HttpStatusCode.Ok) {
      console.log("register response status:", response.data.status);
      console.log("Register response data:", response.data);
      return response.data;
    }
  } catch (error: any) {
    console.error(
      "Register failed:",
      error.response?.data || FAILED_TO_ACCESS_SERVER
    );
    throw error.response.data.error || FAILED_TO_ACCESS_SERVER;
  }
};

// Verifies the email token by sending it to the backend
export const SendEmailVerificationTokenAPI = async (token: string) => {
  try {
    const response = await axiosInstance.post(AUTH_VERIFY_EMAIL, {
      token,
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

// Requests a password reset by validating if the provided email exists in the system
export const CheckEmailIfExistsAPI = async (email: string) => {
  try {
    const response = await axiosInstance.post(AUTH_CHECK_EMAIL, { email });
    return response.data;
  } catch (error: any) {
    throw error.response.data.error || FAILED_TO_ACCESS_SERVER;
  }
};

// Reset Password after validating email
export const SendNewPassword = async (token: string, password: string) => {
  try {
    const response = await axiosInstance.post(AUTH_RESET_PASSWORD, {
      token,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response.data.error || FAILED_TO_ACCESS_SERVER;
  }
};

// Google login
export const GoogleLoginAPI = async (token: string) => {
  try {
    const response = await axiosInstance.post(AUTH_GOOGLE_LOGIN, { token });

    console.log("google response", response.data);
    return response.data;
  } catch (error: any) {
    console.log("Google login error response:", error.response);
    throw error.response.data.error || FAILED_TO_ACCESS_SERVER;
  }
};
