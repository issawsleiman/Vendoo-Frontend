import { useThemeContext } from "../../../context/ThemeContext";

export function SettingsHeaderContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colors } = useThemeContext();
  return (
    <div
      className="rounded-xl border shadow-sm p-8"
      style={{
        backgroundColor: colors.cardBgColor,
        borderColor: colors.borderColor,
      }}
    >
      {children}
    </div>
  );
}
