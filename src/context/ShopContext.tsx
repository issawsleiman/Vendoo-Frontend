import { createContext, useContext, useState } from "react";

import type { Categories } from "../models/Categories";

import {
  createShopAPI,
  getCategoriesAPI,
  getShopBySlugAPI,
  getShopByUserIdAPI,
} from "../api/shopApi";
import type { UserShop } from "../store/useShopStore";

export interface VendooShop {
  UserID: string;
  CategoryID: string;
  ShopName: string;
  ShopDescription: string;
}

interface ShopContextProps {
  categories: Categories[] | null;
  getCategories: (token: string) => Promise<Categories[] | null>;

  createNewShop: (
    userID: string,
    shopData: VendooShop
  ) => Promise<boolean | null>;

  getShopByUserID: (shopID: string) => Promise<UserShop | null>;
  getShopBySlug: (shopName: string) => Promise<boolean>;
}

const ShopContext = createContext<ShopContextProps | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Categories[] | null>(null);

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
      // create shop api
      const result = await createShopAPI(userID, shopData);
      if (result) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const getShopByUserID = async (userID: string): Promise<UserShop | null> => {
    try {
      const response = await getShopByUserIdAPI(userID);
      if (response) {
        const {
          shop_name,
          shop_description,
          location,
          phone,
          email,
          category_name,
          status,
        } = response.shop_details;
        const shopDetails: UserShop = {
          shopName: shop_name,
          categoryName: category_name,
          shopDescription: shop_description,
          location: location,
          phoneNumber: phone,
          email: email,
          status: status,
        };
        return shopDetails;
      }
    } catch (error: any) {
      return null;
    }
    return null;
  };

  // function to get a shop by slug
  const getShopBySlug = async (shop: string): Promise<boolean> => {
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

        createNewShop: createShop,
        getShopByUserID: getShopByUserID,
        getShopBySlug: getShopBySlug,
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
