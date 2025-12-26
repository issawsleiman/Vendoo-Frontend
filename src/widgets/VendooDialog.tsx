import { X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeContext } from "../context/ThemeContext";
import {
  SecondaryColorDark,
  SecondaryColorWhite,
  BorderColorDark,
  BorderColorWhite,
  SaleBadgeColorDark,
  AccentColorWhite,
  TextColorDark,
  TextColorWhite,
} from "../utils/constants/colors";

interface VendooDialogProps {
  title?: React.ReactNode;
  subtitle?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  Open: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-7xl",
};

export const VendooDialog: React.FC<VendooDialogProps> = ({
  title,
  subtitle,
  footer,
  children,
  Open,
  onClose,
  size = "md",
  showCloseButton = true,
  closeOnBackdropClick = true,
}) => {
  const currentTheme = useThemeContext();
  const [isOpen, setIsOpen] = useState(Open);

  useEffect(() => {
    if (Open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [Open]);

  useEffect(() => {
    setIsOpen(Open);
  }, [Open]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    onClose();
  }, [onClose]);

  const handleBackdropClick = useCallback(() => {
    if (closeOnBackdropClick) {
      closeModal();
    }
  }, [closeOnBackdropClick, closeModal]);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeydown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, closeModal]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto"
          aria-labelledby="dialog-title"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            className={`relative rounded-2xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col overflow-hidden`}
            style={{
              backgroundColor: currentTheme.isDark
                ? SecondaryColorDark
                : SecondaryColorWhite,
              border: `1px solid ${
                currentTheme.isDark ? BorderColorDark : BorderColorWhite
              }`,
            }}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            {/* Dialog Header */}
            {/* only showing header when title exists */}
            {title && (
              <header
                className="flex items-start justify-between p-6 border-b shrink-0"
                style={{
                  borderColor: currentTheme.isDark
                    ? BorderColorDark
                    : BorderColorWhite,
                }}
              >
                <div className="flex-1 pr-4">
                  <h2
                    id="dialog-title"
                    className="text-2xl font-bold leading-tight"
                    style={{
                      color: currentTheme?.isDark
                        ? SaleBadgeColorDark
                        : AccentColorWhite,
                    }}
                  >
                    {title}
                  </h2>
                  {subtitle && (
                    <p
                      className="text-sm mt-1.5 leading-relaxed"
                      style={{
                        color: currentTheme.isDark
                          ? `${TextColorDark}99`
                          : `${TextColorWhite}99`,
                      }}
                    >
                      {subtitle}
                    </p>
                  )}
                </div>

                {showCloseButton && (
                  <button
                    type="button"
                    className="p-2 rounded-lg transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0"
                    onClick={closeModal}
                    style={{
                      color: currentTheme.isDark
                        ? TextColorDark
                        : TextColorWhite,
                    }}
                    aria-label="Close dialog"
                  >
                    <X className="w-5 h-5" strokeWidth={2.5} />
                  </button>
                )}
              </header>
            )}

            {/* Dialog Body */}
            <main
              className="w-full p-6 overflow-y-auto grow no-scrollbar"
              style={{
                color: currentTheme.isDark ? TextColorDark : TextColorWhite,
              }}
            >
              <div className="space-y-4">{children}</div>
            </main>

            {/* Dialog Footer */}
            {footer && (
              <footer
                className="flex items-center justify-end gap-3 p-6 border-t flex-shrink-0"
                style={{
                  borderColor: currentTheme.isDark
                    ? BorderColorDark
                    : BorderColorWhite,
                  backgroundColor: currentTheme.isDark
                    ? `${SecondaryColorDark}99`
                    : `${SecondaryColorWhite}99`,
                }}
              >
                {footer}
              </footer>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
