import { useDashboardContext } from "../../../../context/DashboardContext";
import { useThemeContext } from "../../../../context/ThemeContext";

interface NavListTileProps {
  item: any;
}

export function NavListTile({ item }: NavListTileProps) {
  const themeColors = useThemeContext().colors;
  const dashboardContext = useDashboardContext();

  const isActive = item.id === dashboardContext.selectedDashboardItem;

  return (
    <div
      className="flex items-center gap-3"
      style={{
        color: isActive ? "#3b82f6" : themeColors.textColor,
      }}
    >
      <item.icon size={20} />
      <span className="font-medium">{item.label}</span>
    </div>
  );
}
