import React, { forwardRef } from "react";
import { Eye, EyeClosed, type LucideIcon } from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";
import {
  PrimaryColorDark,
  PrimaryColorWhite,
  BorderColorDark,
  BorderColorWhite,
  TextColorDark,
  TextColorWhite,
  ColorWhite,
  ColorBlack,
} from "../utils/constants/colors";

// --- Types ---

interface BaseInputProps {
  id?: string;
  value: string;
  name?: string;
  placeholder?: string;
  isRequired?: boolean;
  isFullWidth?: boolean;
  shouldLightTheme?: boolean;
  isDisabled?: boolean;
}

interface InputProps extends BaseInputProps {
  type: string;
  PrefixIcon?: LucideIcon;
  isPassword?: boolean;
  isShowingPassword?: boolean;
  passwordToggleAction?: React.MouseEventHandler<HTMLDivElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

interface VendooTextareaProps extends BaseInputProps {
  Icon?: LucideIcon;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  maxLength?: number;
}

function getThemeStyles(isDark: boolean, shouldLightTheme: boolean) {
  const useLight = shouldLightTheme || !isDark;
  return {
    borderColor: useLight ? BorderColorWhite : BorderColorDark,
    backgroundColor: useLight ? PrimaryColorWhite : PrimaryColorDark,
    textColor: useLight ? TextColorWhite : TextColorDark,
    iconColor: useLight ? ColorBlack : ColorWhite,
    autofillBg: useLight ? PrimaryColorWhite : PrimaryColorDark,
    autofillText: useLight ? ColorBlack : ColorWhite,
  };
}

/* -------------------------------- INPUT ---------------------------------- */

export const VendooInput = forwardRef<HTMLInputElement, InputProps>(
  function VendooInput(props, ref) {
    const { isDark } = useThemeContext();
    const styles = getThemeStyles(isDark, !!props.shouldLightTheme);

    const inputType =
      props.isPassword && !props.isShowingPassword ? "password" : props.type;

    return (
      <div
        className={`flex flex-col overflow-hidden ${
          props.isFullWidth ? "w-full" : "w-fit"
        }`}
      >
        <style>{`
        #${props.id}:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px ${styles.backgroundColor} inset !important;
          -webkit-text-fill-color: ${styles.textColor} !important;
        }
      `}</style>

        <div
          className={`flex items-center justify-between rounded-lg border transition-all duration-200 ${
            props.isDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{
            borderColor: styles.borderColor,
            backgroundColor: styles.backgroundColor,
          }}
        >
          {props.PrefixIcon && (
            <div className="flex items-center justify-center pl-3">
              <props.PrefixIcon
                size={20}
                style={{ color: styles.iconColor, opacity: 0.6 }}
              />
            </div>
          )}

          <input
            ref={ref}
            id={props.id}
            name={props.name}
            type={inputType}
            value={props.value}
            placeholder={props.placeholder}
            required={props.isRequired}
            onChange={props.onChange}
            disabled={props.isDisabled}
            maxLength={props.maxLength}
            className="flex-1 min-w-0 px-4 py-3 text-sm md:text-base bg-transparent border-none focus:outline-none"
            style={{ color: styles.textColor, caretColor: styles.textColor }}
          />

          {props.isPassword && props.passwordToggleAction && (
            <div
              onClick={props.passwordToggleAction}
              className="flex items-center justify-center px-3 cursor-pointer select-none hover:opacity-70 transition-opacity"
            >
              {props.isShowingPassword ? (
                <EyeClosed size={20} color={styles.iconColor} />
              ) : (
                <Eye size={20} color={styles.iconColor} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

/* ------------------------------- TEXTAREA --------------------------------- */

export const VendooTextarea = forwardRef<
  HTMLTextAreaElement,
  VendooTextareaProps
>(function VendooTextarea(props, ref) {
  const { isDark } = useThemeContext();
  const styles = getThemeStyles(isDark, !!props.shouldLightTheme);

  return (
    <div
      className={`flex flex-col overflow-hidden ${
        props.isFullWidth ? "w-full" : "w-fit"
      }`}
    >
      <style>{`
        #${props.id}:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px ${styles.backgroundColor} inset !important;
          -webkit-text-fill-color: ${styles.textColor} !important;
        }
      `}</style>

      <div
        className={`flex items-start rounded-lg border transition-all duration-200 ${
          props.isDisabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        style={{
          borderColor: styles.borderColor,
          backgroundColor: styles.backgroundColor,
        }}
      >
        {props.Icon && (
          <div className="flex items-start justify-center pl-3 pt-3.5">
            <props.Icon
              size={20}
              style={{ color: styles.iconColor, opacity: 0.6 }}
            />
          </div>
        )}

        <textarea
          ref={ref}
          id={props.id}
          name={props.name}
          value={props.value}
          rows={props.rows ?? 4}
          placeholder={props.placeholder}
          required={props.isRequired}
          onChange={props.onChange}
          disabled={props.isDisabled}
          maxLength={props.maxLength}
          className="flex-1 min-w-0 px-4 py-3 text-sm md:text-base bg-transparent focus:outline-none resize-none"
          style={{ color: styles.textColor, caretColor: styles.textColor }}
        />
      </div>
    </div>
  );
});
