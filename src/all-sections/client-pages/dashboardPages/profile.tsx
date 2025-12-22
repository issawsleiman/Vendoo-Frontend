import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import {
  AlertTriangle,
  Calendar,
  Camera,
  LogOut,
  Mail,
  MapPin,
  Phone,
  UserIcon,
  Moon,
  Sun,
  type LucideIcon,
} from "lucide-react";

// Internal Contexts & Stores
import { useDashboardContext } from "../../../context/DashboardContext";
import { useUserStore } from "../../../store/useUserStore";
import { useThemeContext } from "../../../context/ThemeContext";

// Widgets & Constants
import { VendooInput } from "../../../widgets/VendooInput";
import VendooLabel from "../../../widgets/VendooLabel";
import { VendooDialog } from "../../../widgets/VendooDialog";
import { AccentColorDark } from "../../../utils/constants/colors";
import { ToggleSwitch } from "./storeSettings";
import { SettingsHeaderContainer } from "../components/SettingsHeaderContainer";
import { ProfileActionButtons } from "../components/ProfileActionButtons";

// --- Types ---
interface ProfileFormData {
  fullName: string;
  email: string;
  location: string;
  phoneNumber: string;
  memberSince: string;
}

interface InfoField {
  id: keyof ProfileFormData;
  icon: LucideIcon;
  label: string;
  disabled?: boolean;
}

// --- Main Component ---
export default function ProfilePage() {
  const navigate = useNavigate();
  const { profile, resetUserProfile } = useUserStore();
  const { colors } = useThemeContext();
  const { setSelectedDashboardItem, setEditingState: setEditingProfile } =
    useDashboardContext();

  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "",
    email: "",
    location: "",
    phoneNumber: "",
    memberSince: "",
  });

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  useEffect(() => {
    setSelectedDashboardItem("Profile");
    if (profile) {
      setFormData({
        fullName: profile.name || "",
        email: profile.email || "",
        location: profile.location || "Jal Deeb",
        phoneNumber: profile.phoneNumber || "71330986",
        memberSince: profile.memberSince || "1/1/2025",
      });
    }
  }, [profile, setSelectedDashboardItem]);

  const handleInputChange = (id: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    setSelectedDashboardItem("Profile");
    setEditingProfile(false);
  }, [setSelectedDashboardItem, setEditingProfile]);

  const handleLogout = () => {
    resetUserProfile();
    localStorage.clear();
    navigate("/login");
  };

  const handleUpdateProfile = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting Data:", formData);
    setEditingProfile(false);
  };

  return (
    <form
      onSubmit={handleUpdateProfile}
      className="h-screen overflow-y-auto w-full flex flex-col items-center bg-transition"
      style={{ backgroundColor: colors.bgColor }}
    >
      <ConfirmLogoutDialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={handleLogout}
      />

      <div className="w-full max-w-6xl px-6 py-10 space-y-8 pb-24">
        <Header profile={profile} />
        <ThemeSection />
        <PersonalInformationSection
          data={formData}
          onChange={handleInputChange}
        />

        <LogOutButton onLogout={() => setIsLogoutDialogOpen(true)} />
      </div>
    </form>
  );
}

// --- Sub-Components ---

function Header({ profile }: { profile: any }) {
  const { colors } = useThemeContext();

  return (
    <SettingsHeaderContainer>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <UserProfilePhoto
            image={profile?.image || "/assets/default-avatar.svg"}
            name={profile?.name}
          />

          <div className="flex-1 text-center md:text-left space-y-2">
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: colors.textColor }}
            >
              {profile?.name || "User Account"}
            </h1>
            <div
              className="text-base flex items-center justify-center md:justify-start gap-2"
              style={{ color: colors.mutedTextColor }}
            >
              <Mail size={16} />
              <span>{profile?.email || "No email provided"}</span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-3">
              <Badge
                text="Premium Member"
                color={AccentColorDark}
                bgColor={`${AccentColorDark}15`}
              />
              <Badge text="Verified" color="#10b981" bgColor="#10b98115" />
            </div>
          </div>
        </div>
        <ProfileActionButtons />
      </div>
    </SettingsHeaderContainer>
  );
}

function ThemeSection() {
  const { isDark, setThemeToggle, colors } = useThemeContext();

  return (
    <SettingsHeaderContainer>
      <div className="flex flex-row items-center justify-between gap-4">
        <InfoDisplayCard
          label="Interface Theme"
          icon={isDark ? Moon : Sun}
          value="Switch between light and dark modes for your dashboard"
        />

        {/* Action Toggle */}
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-bold uppercase tracking-widest hidden sm:block"
            style={{ color: colors.mutedTextColor }}
          >
            {isDark ? "Dark" : "Light"}
          </span>
          <ToggleSwitch isToggled={isDark} label="" onToggle={setThemeToggle} />
        </div>
      </div>
    </SettingsHeaderContainer>
  );
}

function PersonalInformationSection({
  data,
  onChange,
}: {
  data: ProfileFormData;
  onChange: (id: keyof ProfileFormData, val: string) => void;
}) {
  const { colors } = useThemeContext();
  const { isEditingState: isEditingProfile } = useDashboardContext();

  const fields: InfoField[] = [
    { id: "fullName", icon: UserIcon, label: "Full Name" },
    { id: "email", icon: Mail, label: "Email Address", disabled: true },
    { id: "phoneNumber", icon: Phone, label: "Phone Number" },
    { id: "location", icon: MapPin, label: "Location" },
    {
      id: "memberSince",
      icon: Calendar,
      label: "Member Since",
      disabled: true,
    },
  ];

  return (
    <section
      className="rounded-xl border shadow-sm overflow-hidden transition-all"
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
          Personal Information
        </h2>
        <p className="text-sm mt-1" style={{ color: colors.mutedTextColor }}>
          Maintain your identity and contact preferences.
        </p>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              {isEditingProfile ? (
                <>
                  <VendooLabel text={field.label} />
                  <VendooInput
                    id={field.id}
                    type="text"
                    PrefixIcon={field.icon}
                    value={data[field.id]}
                    isDisabled={field.disabled}
                    isFullWidth
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      onChange(field.id, e.target.value)
                    }
                    isRequired={!field.disabled}
                    name={""}
                  />
                </>
              ) : (
                <InfoDisplayCard
                  icon={field.icon}
                  label={field.label}
                  value={data[field.id]}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UserProfilePhoto({ image, name }: { image: string; name?: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      console.log("Chosen photo:", file);
    }
  };

  return (
    <div className="relative group">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFile}
        accept="image/*"
        className="hidden"
      />
      <div
        className="relative cursor-pointer rounded-full ring-4 ring-black/5 overflow-hidden transition-transform active:scale-95"
        onClick={() => fileInputRef.current?.click()}
      >
        <Avatar
          src={preview || image}
          alt={name}
          sx={{ width: 140, height: 140, fontSize: "3rem" }}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
          <div className="text-white text-center">
            <Camera size={24} className="mx-auto" />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Update
            </span>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="absolute bottom-1 right-1 p-3 rounded-full bg-blue-600 text-white shadow-xl hover:scale-110 transition-transform"
        style={{ backgroundColor: AccentColorDark }}
        onClick={() => fileInputRef.current?.click()}
      >
        <Camera size={18} />
      </button>
    </div>
  );
}

// --- Helper UI Components ---
function InfoDisplayCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  const { colors } = useThemeContext();
  return (
    <div
      className="flex items-start gap-4 p-5 rounded-xl border border-transparent  transition-all"
      style={{ backgroundColor: `${colors.bgColor}50` }}
    >
      <div
        className="p-3 rounded-lg  shadow-sm"
        style={{ color: AccentColorDark }}
      >
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p
          className="text-[10px] font-bold uppercase tracking-widest mb-1"
          style={{ color: colors.mutedTextColor }}
        >
          {label}
        </p>
        <p
          className="text-base font-medium"
          style={{ color: colors.textColor }}
        >
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

export function LogOutButton({ onLogout }: { onLogout: () => void }) {
  const { colors } = useThemeContext();

  return (
    <div
      className="rounded-xl border shadow-sm overflow-hidden"
      style={{
        backgroundColor: colors.cardBgColor,

        borderColor: colors.borderColor,
      }}
    >
      <div className="p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3
              className="text-lg font-semibold mb-1"
              style={{ color: colors.textColor }}
            >
              Danger Zone
            </h3>

            <p className="text-sm" style={{ color: colors.mutedTextColor }}>
              Once you log out, you will need to sign in again
            </p>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg font-semibold shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110 active:scale-[0.98] whitespace-nowrap"
            style={{
              backgroundColor: "#dc2626",

              color: "white",
            }}
          >
            <LogOut size={18} strokeWidth={2.5} />

            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Logic & Wrapper Components ---
function Badge({
  text,
  color,
  bgColor,
}: {
  text: string;
  color: string;
  bgColor: string;
}) {
  return (
    <span
      className="px-3 py-1 rounded-full text-[11px] font-bold border"
      style={{ backgroundColor: bgColor, color, borderColor: `${color}20` }}
    >
      {text}
    </span>
  );
}

function ConfirmLogoutDialog({ isOpen, onClose, onConfirm }: any) {
  const { colors } = useThemeContext();

  return (
    <VendooDialog
      Open={isOpen}
      onClose={onClose}
      size="sm"
      footer={
        <div className="flex gap-3 w-full">
          <button
            className="flex-1 py-2.5 rounded-lg border font-bold"
            onClick={onClose}
            style={{ color: colors.textColor, borderColor: colors.borderColor }}
          >
            Stay Logged In
          </button>
          <button
            className="flex-1 py-2.5 rounded-lg bg-red-600 text-white font-bold"
            onClick={onConfirm}
          >
            Confirm Logout
          </button>
        </div>
      }
    >
      <div className="text-center py-6">
        <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle size={32} className="text-red-600" />
        </div>
        <h3 className="text-xl font-bold mb-2">Confirm Logout</h3>
        <p className="text-sm text-gray-500">
          You will need to re-authenticate to access your profile settings.
        </p>
      </div>
    </VendooDialog>
  );
}
