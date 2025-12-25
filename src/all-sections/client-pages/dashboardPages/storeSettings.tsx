import { useEffect, useState, type ChangeEvent } from "react";
import { useDashboardContext } from "../../../context/DashboardContext";
import { useThemeContext } from "../../../context/ThemeContext";
import { Store, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { VendooInput, VendooTextarea } from "../../../widgets/VendooInput";
import VendooLabel from "../../../widgets/VendooLabel";
import { SettingsHeaderContainer } from "../components/SettingsHeaderContainer";
import { ProfileActionButtons } from "../components/ProfileActionButtons";
import { useShopStore } from "../../../store/useShopStore";

// --- Types ---
interface StoreSettings {
  name: string;
  description: string;
  isPrivate: boolean;
}

// ...................................MAIN SETTINGS PAGE........................

export default function StoreSettingsPage() {
  const { colors } = useThemeContext();
  const shopStore = useShopStore();
  const {
    setSelectedDashboardItem,
    isEditingState: isEditingProfile,
    setEditingState: setEditingProfile,
  } = useDashboardContext();

  const [showSuccess, setShowSuccess] = useState(false);
  // getting current shop state
  const [storeSettings, setStoreSettings] = useState<StoreSettings>({
    name: shopStore.shop?.shopName!,
    description: shopStore.shop?.shopDescription!,
    isPrivate: shopStore.shop?.status!,
  });

  const [tempSettings, setTempSettings] =
    useState<StoreSettings>(storeSettings);

  useEffect(() => {
    setSelectedDashboardItem("Store Settings");
    setEditingProfile(false);
  }, [setSelectedDashboardItem, setEditingProfile]);

  // handles saving new info
  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStoreSettings(tempSettings);
    setEditingProfile(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <form
      onSubmit={handleSave}
      className="h-screen overflow-y-auto w-full flex flex-col items-center transition-colors duration-300 scroll-smooth"
      style={{ backgroundColor: colors.bgColor }}
    >
      <div className="w-full max-w-5xl px-6 py-8 space-y-6 pb-24">
        {showSuccess && <SuccessToast colors={colors} />}
        <SettingsHeader colors={colors} />
        <StoreInfoSection
          data={isEditingProfile ? tempSettings : storeSettings}
          onChange={(newData: Partial<StoreSettings>) =>
            setTempSettings({ ...tempSettings, ...newData })
          }
          colors={colors}
        />
        <VisibilitySection
          isPrivate={
            isEditingProfile ? tempSettings.isPrivate : storeSettings.isPrivate
          }
          onToggle={() =>
            setTempSettings({
              ...tempSettings,
              isPrivate: !tempSettings.isPrivate,
            })
          }
          colors={colors}
        />
      </div>
    </form>
  );
}
// ......................................SUB-COMPONENTS........................

function SuccessToast({ colors }: { colors: any }) {
  return (
    <div
      className="flex items-center gap-3 p-4 rounded-xl border shadow-lg animate-in fade-in slide-in-from-top-2 backdrop-blur-sm"
      style={{
        backgroundColor: `${colors.cardBgColor}f0`,
        borderColor: "#10b981",
        boxShadow: "0 4px 20px rgba(16, 185, 129, 0.15)",
      }}
    >
      <div className="p-1 rounded-full bg-green-50">
        <CheckCircle2 size={20} className="text-green-600" />
      </div>
      <span className="font-semibold" style={{ color: colors.textColor }}>
        Store settings updated successfully
      </span>
    </div>
  );
}

// ...............................PAGE HEADER....................
function SettingsHeader({ colors }: any) {
  return (
    <SettingsHeaderContainer>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className="p-4 rounded-xl shadow-sm"
            style={{
              backgroundColor: `${colors.accentColor}15`,
            }}
          >
            <Store
              size={32}
              style={{ color: colors.accentColor }}
              strokeWidth={2}
            />
          </div>
          <div>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: colors.textColor }}
            >
              Store Settings
            </h1>
            <p
              className="text-sm mt-1.5"
              style={{ color: colors.mutedTextColor }}
            >
              Manage your store information and visibility preferences
            </p>
          </div>
        </div>
        <ProfileActionButtons />
      </div>
    </SettingsHeaderContainer>
  );
}

/**
 * STORE INFO SECTION
 * Handles Name and Description fields
 */
function StoreInfoSection({ data, onChange, colors }: any) {
  const { isEditingState: isEditingProfile } = useDashboardContext();
  return (
    <div
      className="rounded-xl border shadow-sm overflow-hidden"
      style={{
        backgroundColor: colors.cardBgColor,
        borderColor: colors.borderColor,
      }}
    >
      <div
        className="px-8 py-6 border-b"
        style={{ borderColor: colors.borderColor }}
      >
        <h2
          className="text-xl font-semibold"
          style={{ color: colors.textColor }}
        >
          Store Information
        </h2>
        <p className="text-sm mt-1" style={{ color: colors.mutedTextColor }}>
          Update your store name and description
        </p>
      </div>

      <div className="p-8 space-y-6">
        {/* Store Name */}
        <div className="flex flex-col gap-2">
          <VendooLabel text="Store Name" />
          {isEditingProfile ? (
            <VendooInput
              id="store-name"
              name="store-name"
              PrefixIcon={Store}
              value={data.name}
              isFullWidth
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChange({ name: e.target.value })
              }
              type="text"
            />
          ) : (
            <DisplayBox text={data.name} colors={colors} />
          )}
          <p className="text-xs mt-1" style={{ color: colors.mutedTextColor }}>
            This is the public name displayed to customers
          </p>
        </div>

        {/* Store Description */}
        <div className="flex flex-col gap-2">
          <VendooLabel text="Store Description" />
          {isEditingProfile ? (
            <VendooTextarea
              value={data.description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                onChange({ description: e.target.value })
              }
              rows={5}
              id="store-description"
              name="store-description"
              isFullWidth
            />
          ) : (
            <DisplayBox text={data.description} colors={colors} isMultiLine />
          )}
          <p className="text-xs mt-1" style={{ color: colors.mutedTextColor }}>
            A brief overview of your store and what you offer
          </p>
        </div>
      </div>
    </div>
  );
}

//  .....................................VISIBILITY SECTION........................
//   Handles the Private/Public toggle

function VisibilitySection({ isPrivate, onToggle, colors }: any) {
  const { isEditingState: isEditingState } = useDashboardContext();
  const statusBg = isPrivate ? "#fef2f2" : "#f0fdf4";

  return (
    <div
      className="rounded-xl border shadow-sm overflow-hidden"
      style={{
        backgroundColor: colors.cardBgColor,
        borderColor: colors.borderColor,
      }}
    >
      <div
        className="px-8 py-6 border-b"
        style={{ borderColor: colors.borderColor }}
      >
        <h2
          className="text-xl font-semibold"
          style={{ color: colors.textColor }}
        >
          Store Visibility
        </h2>
        <p className="text-sm mt-1" style={{ color: colors.mutedTextColor }}>
          Control who can view and access your store
        </p>
      </div>

      <div className="p-8">
        <div
          className="flex flex-col lg:flex-row items-start justify-between p-6 rounded-xl border"
          style={{
            backgroundColor: colors.bgColor,
            borderColor: colors.borderColor,
          }}
        >
          <div className="flex items-start gap-4 flex-1">
            <div
              className="p-3 rounded-lg shrink-0"
              style={{ backgroundColor: statusBg }}
            >
              {isPrivate ? (
                <EyeOff size={24} className="text-red-600" />
              ) : (
                <Eye size={24} className="text-green-600" />
              )}
            </div>

            <div className="flex-1">
              <h3
                className="text-lg font-semibold"
                style={{ color: colors.textColor }}
              >
                {isPrivate ? "Store is Private" : "Store is Public"}
              </h3>
              <p
                className="text-sm mt-1"
                style={{ color: colors.mutedTextColor }}
              >
                {isPrivate
                  ? "Hidden from customers. Purchases are disabled."
                  : "Visible to all. Customers can browse and buy."}
              </p>
            </div>
          </div>

          <ToggleSwitch
            label={isPrivate ? "Private" : "Public"}
            onToggle={onToggle}
            isToggled={isPrivate}
            isDisabled={!isEditingState}
          />
        </div>
      </div>
    </div>
  );
}

interface ToggleSwitchProps {
  isToggled: boolean;
  onToggle: () => void;
  isDisabled?: boolean;
  label: string;
}

export function ToggleSwitch({
  isToggled,
  onToggle,
  isDisabled,
  label,
}: ToggleSwitchProps) {
  const { colors } = useThemeContext();

  const statusColor = isToggled ? "#dc2626" : "#16a34a";

  return (
    <div className="mt-4 lg:mt-0 lg:ml-6 shrink-0">
      <button
        type="button"
        onClick={() => {
          onToggle();
        }}
        disabled={isDisabled}
        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-200 shadow-inner ${
          isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:shadow-lg"
        }`}
        style={{ backgroundColor: statusColor }}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
            isToggled ? "translate-x-9" : "translate-x-1"
          }`}
        />
      </button>
      <p
        className="text-xs mt-2 text-center font-medium"
        style={{ color: colors.mutedTextColor }}
      >
        {label}
      </p>
    </div>
  );
}

// ..................................... SHARED UI ELEMENTS........................

function DisplayBox({ text, colors, isMultiLine }: any) {
  return (
    <div
      className={`p-4 rounded-lg border transition-all duration-200 ${
        isMultiLine ? "min-h-[120px]" : ""
      }`}
      style={{
        backgroundColor: colors.bgColor,
        borderColor: colors.borderColor,
      }}
    >
      <p
        className={`text-base ${
          isMultiLine ? "whitespace-pre-wrap leading-relaxed" : "font-semibold"
        }`}
        style={{ color: colors.textColor }}
      >
        {text}
      </p>
    </div>
  );
}
