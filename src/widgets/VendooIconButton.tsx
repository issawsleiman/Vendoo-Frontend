import { IconButton } from "@mui/material";
import type { LucideIcon } from "lucide-react";

interface IconButtonProps {
  Icon: LucideIcon;
  onClick: () => void;
}

export function VendooIconButton({ Icon, onClick }: IconButtonProps) {
  return (
    <IconButton onClick={onClick} color="primary">
      <Icon />
    </IconButton>
  );
}
