import type { AxiosError } from "axios";
import { HttpStatusCode } from "axios";
import type { VendooShop } from "../context/ShopContext";
import { useUserStore } from "../store/useUserStore";
import axiosInstance from "./axiosInstance";

// API constants
const GET_SHOP_CATEGORIES_API_URL = "/api/categories";
const CREATE_SHOP_API_URL = "/api/create-shop";
const GET_SHOP_API_URL = "/api/shops";

export const getCategoriesAPI = async (token: string) => {
  try {
    const response = await axiosInstance.post(
      GET_SHOP_CATEGORIES_API_URL,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === HttpStatusCode.Ok) {
      console.log("Categories response: ", response);
      return response.data;
    }
  } catch (error) {
    const err = error as AxiosError<any>;
    throw err.response?.data?.error ?? "Failed to fetch categories";
  }
};

export const createShopAPI = async (userID: string, shop: VendooShop) => {
  const token = useUserStore.getState().currentUserToken;

  try {
    const response = await axiosInstance.post(
      CREATE_SHOP_API_URL,
      {
        user_id: userID,
        category_id: shop.CategoryID,
        shop_name: shop.ShopName,
        shop_description: shop.ShopDescription,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === HttpStatusCode.Created) {
      return response.data;
    }

    throw new Error("Shop creation failed");
  } catch (error) {
    const err = error as AxiosError<any>;
    throw err.response?.data?.error ?? "Failed to create shop";
  }
};

export const getShopBySlugAPI = async (shopSlug: string) => {
  try {
    const response = await axiosInstance.post(
      `${GET_SHOP_API_URL}/${shopSlug}`
    );

    if (response.data.status === HttpStatusCode.Ok) {
      return response.data;
    }
    throw new Error("Unexpected response status");
  } catch (error) {
    const err = error as AxiosError<any>;
    throw err.response?.data?.error ?? "Failed to fetch shop";
  }
};
