import { useState } from "react";
import { VendooDialog } from "./VendooDialog";

import VendooButton from "./VendooButton";
import { toast } from "react-toastify";
import { useThemeContext } from "../context/ThemeContext";
import {
  TextColorDark,
  TextColorWhite,
  BorderColorDark,
  BorderColorWhite,
  PrimaryColorDark,
  PrimaryColorWhite,
} from "../utils/constants/colors";

interface VerificationEmailDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VerifyEmailDialog({
  isOpen,
  onClose,
}: VerificationEmailDialogProps) {
  const currentTheme = useThemeContext();
  // Getting the verification code from api
  //   const code = authContext.verificationCode || "";
  //   console.log("Actual code is:" + code);

  // input state
  const [verificationCode, setVerificationCode] = useState("");

  return (
    <>
      {isOpen && (
        <VendooDialog
          title={"Verify Your Email"}
          children={
            <div className="text-left space-y-4">
              <p
                className="text-sm"
                style={{
                  color: currentTheme?.isDark ? TextColorDark : TextColorWhite,
                }}
              >
                A 6-digit verification code has been sent to your email address.
                Please enter it below.
              </p>

              <label
                htmlFor="verify-code"
                className="block text-base font-medium  mb-2"
              >
                Verification Code (6 Digits)
              </label>
              <div className="flex justify-center">
                <input
                  id="verify-code"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="— — — — — —"
                  className="w-full max-w-xs text-center text-4xl font-mono tracking-widest p-3 border rounded-xl focus:outline-none"
                  style={{
                    borderColor: currentTheme.isDark
                      ? BorderColorDark
                      : BorderColorWhite,
                    backgroundColor: currentTheme.isDark
                      ? PrimaryColorDark
                      : PrimaryColorWhite,
                  }}
                  aria-label="Enter 6 digit verification code"
                />
              </div>
              <VendooButton
                children={"Verify"}
                onClick={() => {
                  if (verificationCode != "!2") {
                    toast.error("The code You entered is invalid");
                  } else {
                    toast.success("Nicee u got it, u can sign in now!!");
                  }
                }}
              />
            </div>
          }
          // making dialog open
          Open
          onClose={onClose}
        ></VendooDialog>
      )}
    </>
  );
}
