import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserProfile {
  userID: string | undefined;
  name: string | null;
  email: string | null;
  image: string | null;
  role?: string | null;
  hasShop: boolean | null;
  location: string;
  phoneNumber: string;
  memberSince: string | null;
}

interface UserState {
  profile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  resetUserProfile: () => void;
  currentUserToken: string | null;
  setCurrentUserToken: (token: string) => void;
  updateHasShopStatus: (hasStore: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,

      setUserProfile: (profile: UserProfile | null) => set({ profile }),

      resetUserProfile: () => set({ profile: null }),

      updateHasShopStatus: (shopStatus) => {
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, hasShop: shopStatus }
            : null,
        }));
      },

      currentUserToken: null,
      setCurrentUserToken: (userToken: string) =>
        set({ currentUserToken: userToken }),
    }),
    {
      name: "user-profile-storage1", // name of the storage (must be unique)
    }
  )
);
