import { Send } from "lucide-react";

import { useThemeContext } from "../../context/ThemeContext";
import {
  AccentColorDark,
  ColorBlack,
  ColorWhite,
  SaleBadgeColorDark,
} from "../../utils/constants/colors";
import { useState } from "react";
import { motion } from "framer-motion";
import { VendooBotIcon } from "../../widgets/VendooBotIcon";
import { VendooDialog } from "../../widgets/VendooDialog";
import VendooLabel from "../../widgets/VendooLabel";
import { VendooInput } from "../../widgets/VendooInput";

export function LandingBot({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {isOpen && (
        <VendooDialog
          title={<VendooBotHeader />}
          children={<VendooBotChatArea />}
          onClose={() => onClose()}
          Open
        />
      )}
    </>
  );
}

function VendooBotHeader() {
  return (
    <div className="w-full flex items-center gap-4 justify-center">
      <VendooBotIcon />
      <VendooLabel text="VendooBot" />
    </div>
  );
}

function VendooBotChatArea() {
  const isDark = useThemeContext().isDark;
  const [chatInput, setChatInput] = useState("");

  const sendDisabled = chatInput.trim().length === 0;

  return (
    <div className="w-full flex flex-col justify-between items-center mt-4 overflow-hidden">
      {/* Chat messages will go here */}
      <div className="w-full h-100 flex">
        <VendooBotMessageBubble
          message="Hello! How can I assist you today?"
          isUser={false}
        />
      </div>

      <div className="flex flex-row w-full">
        <div className="w-full">
          <VendooInput
            placeholder="Type your message..."
            isPassword={false}
            value={chatInput}
            onChange={(e: any) => setChatInput(e.target.value)}
            id={"chat-input"}
            name={"chat-input"}
            type={"text"}
            isFullWidth={true}
          />
        </div>

        <motion.div
          whileTap={!sendDisabled ? { scale: 0.9 } : {}}
          whileHover={!sendDisabled ? { scale: 1.05 } : {}}
          onClick={() => {}}
          className={`
            flex justify-center items-center ml-4
            rounded-full cursor-pointer transition-all shadow-md
            ${sendDisabled ? "opacity-40 cursor-not-allowed" : "opacity-100"}
  `}
          style={{
            backgroundColor: isDark ? SaleBadgeColorDark : AccentColorDark,
            width: 144,
            height: 44,
          }}
          aria-label="Send Message"
        >
          <Send color={isDark ? ColorBlack : ColorWhite} className="w-5 h-5" />
        </motion.div>
      </div>
    </div>
  );
}

function VendooBotMessageBubble({
  message,
  isUser,
}: {
  message: string;
  isUser: boolean;
}) {
  const isDark = useThemeContext().isDark;
  return (
    <div
      className={`
            max-w-[70%] p-3 my-2 rounded-lg shadow-md
            ${
              isUser
                ? "bg-blue-500 text-white self-end"
                : isDark
                ? "bg-gray-700 text-white self-start"
                : "bg-gray-200 text-black self-start"
            }
        `}
    >
      <p>{message}</p>
    </div>
  );
}
