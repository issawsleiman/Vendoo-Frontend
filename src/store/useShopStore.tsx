import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserShop {
  categoryName: string | undefined;
  shopName: string | undefined;
  shopDescription: string | undefined;
  location: string | undefined;
  phoneNumber: string | undefined;
  email: string | undefined;
  status: boolean | undefined;
}

interface ShopState {
  shop: UserShop | null;
  setUserShop: (shop: UserShop | null) => void;
  resetUserShop: () => void;
}

export const useShopStore = create<ShopState>()(
  persist(
    (set) => ({
      shop: null,
      setUserShop: (shop: UserShop | null) => set({ shop }),
      resetUserShop: () => set({ shop: null }),
    }),
    {
      name: "user-shop-storage",
    }
  )
);
