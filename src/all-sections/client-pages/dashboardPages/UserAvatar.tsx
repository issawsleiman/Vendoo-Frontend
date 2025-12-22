import { Avatar } from "@mui/material";
import { useUserStore } from "../../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_PG_PROFILE_NAME } from "./layout";

export function UserAvatar() {
  const userStore = useUserStore();
  const navigate = useNavigate();
  return (
    <Avatar
      className="cursor-pointer"
      src={userStore.profile!.image!}
      alt={userStore.profile?.name?.charAt(0)}
      sx={{ xs: 110, s: 110, md: 110, lg: 110 }}
      onClick={() => navigate(DASHBOARD_PG_PROFILE_NAME)}
    />
  );
}
