import { createContext, useContext, useState } from "react";

import type { Categories } from "../models/Categories";

import {
  createShopAPI,
  getCategoriesAPI,
  getShopBySlugAPI,
} from "../api/shopApi";

export interface VendooShop {
  UserID: string;
  CategoryID: string;
  ShopName: string;
  ShopDescription: string;
}

interface ShopContextProps {
  categories: Categories[] | null;
  getCategories: (token: string) => Promise<Categories[] | null>;

  shop: VendooShop | null;
  createNewShop: (userID: string, shopData: VendooShop) => Promise<boolean>;

  getShopBySlug: (shopName: string) => Promise<boolean>;
}

const ShopContext = createContext<ShopContextProps | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Categories[] | null>(null);
  const [shop, setShop] = useState<VendooShop | null>(null);

  // getting all categories
  const getCatego = async (token: string): Promise<Categories[] | null> => {
    try {
      const response = await getCategoriesAPI(token);
      if (response) {
        const shopCategories = response.shop_categories;
        console.log("All categories: ", setCategories);
        const allCategories: Categories[] = [];

        shopCategories.forEach((categ: any) => {
          const { category_id, category } = categ;

          const categoryItem: Categories = {
            category_id,
            category,
          };
          allCategories.push(categoryItem);
        });

        setCategories(allCategories);
        return allCategories;
      }
    } catch (err: any) {
      console.log(err);
      return null;
    }

    return null;
  };

  // function to create a new shop
  const createShop = async (
    userID: string,
    shopData: VendooShop
  ): Promise<boolean> => {
    try {
      // call API to create shop
      const createShopResponse = await createShopAPI(userID, shopData);
      // if successful, set the shop state
      if (createShopResponse.status === 200) {
        setShop(shopData);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  // function to get a shop
  const getShop = async (shop: string): Promise<boolean> => {
    try {
      const response = await getShopBySlugAPI(shop);
      if (response.err) {
        return false;
      }
      return true;
    } catch (err: any) {
      console.log(err);
      return false;
    }
  };
  return (
    <ShopContext.Provider
      value={{
        categories: categories,
        getCategories: getCatego,
        shop: shop,
        createNewShop: createShop,
        getShopBySlug: getShop,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShopContext() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShopContext must be with ShopProvider");
  }
  return context;
}
