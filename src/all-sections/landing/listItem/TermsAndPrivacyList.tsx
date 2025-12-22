import type React from "react";
import { useThemeContext } from "../../../context/ThemeContext";
import {
  AccentColorDark,
  AccentColorWhite,
  TextColorDark,
  TextColorWhite,
} from "../../../utils/constants/colors";

interface ListTileItem {
  title: string;
  description: React.ReactNode;
}

interface ListTileProps {
  item: ListTileItem;
}

export default function VendooListTile({ item }: ListTileProps) {
  const isDark = useThemeContext().isDark;
  return (
    <div>
      <h1
        className="text-2xl font-semibold mt-8 mb-3"
        style={{ color: `${isDark ? AccentColorDark : AccentColorWhite}` }}
      >
        {item.title}
      </h1>
      <p
        className="mb-8 text-sm"
        style={{ color: `${isDark ? TextColorDark : TextColorWhite}` }}
      >
        {item.description}
      </p>
    </div>
  );
}
