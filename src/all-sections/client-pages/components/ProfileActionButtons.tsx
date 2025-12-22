import { Edit2, Save, X } from "lucide-react";
import { useDashboardContext } from "../../../context/DashboardContext";
import { useThemeContext } from "../../../context/ThemeContext";
import VendooButton from "../../../widgets/VendooButton";

export function ProfileActionButtons() {
  const {
    isEditingState: isEditingProfile,
    setEditingState: setEditingProfile,
  } = useDashboardContext();
  const { colors } = useThemeContext();

  if (!isEditingProfile) {
    return (
      <VendooButton
        onClick={() => setEditingProfile(true)}
        className="flex items-center gap-2 px-8 py-3"
      >
        <Edit2 size={18} />
        <span>Edit Profile</span>
      </VendooButton>
    );
  }

  return (
    <div className="flex gap-3 w-full md:w-auto">
      <button
        type="submit"
        className="flex-1 md:flex-none px-8 py-3 text-white rounded-lg font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer"
        style={{ backgroundColor: colors.accentColor }}
      >
        <Save size={18} /> Save
      </button>
      <button
        type="button"
        onClick={() => setEditingProfile(false)}
        className="flex-1 md:flex-none px-8 py-3 border rounded-lg font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
        style={{ color: colors.textColor, borderColor: colors.borderColor }}
      >
        <X size={18} /> Cancel
      </button>
    </div>
  );
}
