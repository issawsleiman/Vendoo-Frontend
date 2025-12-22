import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLandingContext } from "../../context/LandingContext";
import { useAuthManager } from "../../context/AuthContext";
import {
  PrimaryColorWhite,
  SecondaryColorWhite,
} from "../../utils/constants/colors";
import VendooButton from "../../widgets/VendooButton";

export default function VerifyEmailPage() {
  const authContext = useAuthManager();

  // loading
  const [loading, setLoading] = useState(true);
  // returns if success or not
  const [success, setSuccess] = useState(true);
  const token = new URLSearchParams(window.location.search).get("token") || "";
  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setLoading(false);
        setSuccess(false);
        return;
      }

      try {
        const result = await authContext.SendEmailVerificationToken(token);
        setSuccess(result);
      } catch (err: any) {
        setSuccess(false);
      }
      setLoading(false);
    };
    verify();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-cover bg-center"
      style={{ backgroundColor: PrimaryColorWhite }}
    >
      {loading ? (
        <p className="text-2xl text-white font-semibold">
          Verifying your email...
        </p>
      ) : (
        <>
          <EmailVerificationScreenWrapper isVerified={success} token={token} />
        </>
      )}
    </div>
  );
}

function EmailVerificationScreenWrapper({
  token,
  isVerified,
}: {
  token: string;
  isVerified: boolean;
}) {
  const navigator = useNavigate();
  const authContext = useAuthManager();
  const publicContext = useLandingContext();

  return (
    <div className="flex flex-col px-6 py-12">
      <div
        className="shadow-md rounded-lg p-8 flex flex-col items-center gap-6"
        style={{ backgroundColor: SecondaryColorWhite }}
      >
        <img
          src={`/icons/${
            isVerified
              ? "../assets/iconcs/verified_icon.svg"
              : "../assets/icons/not_verified_icon.svg"
          }`}
          alt={`${isVerified ? "verified_icon" : "not_verified_icon"}`}
          className="w-24 h-24 md:w-32 md:h-32"
        />
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
          {isVerified
            ? "Account Verified!"
            : "Something went wrong while verifying"}
        </h1>
        <p className="text-gray-600 text-center max-w-xs">
          {isVerified
            ? "Your account has been successfully verified. You can now access all features."
            : "We were unable to verify your account. Please try again or contact support."}
        </p>

        <VendooButton
          children={isVerified ? "Go to Login" : "Resend Verification Link"}
          onClick={() => {
            if (isVerified) {
              navigator("/authenticate");
              publicContext.setSelectedAuthType("Login");
              publicContext.setSelectedLandingNavLink("");
            } else {
              authContext.SendEmailVerificationToken(token);
            }
          }}
        />
      </div>
    </div>
  );
}
