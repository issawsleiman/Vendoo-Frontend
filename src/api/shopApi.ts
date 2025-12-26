import type { AxiosError } from "axios";
import { HttpStatusCode } from "axios";
import type { VendooShop } from "../context/ShopContext";
import { useUserStore } from "../store/useUserStore";
import axiosInstance from "./axiosInstance";

// API constants
const GET_SHOP_CATEGORIES_API_URL = "/api/categories";
const CREATE_SHOP_API_URL = "/api/create-shop";
const GET_SHOP_API_URL = "/api/shops";
const GET_SHOP_BY_USER_ID = "/api/shop";

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

    if (response.data.status === HttpStatusCode.Ok) {
      return response.data;
    }
    throw new Error("Shop creation failed");
  } catch (error) {
    const err = error as AxiosError<any>;
    throw err.response?.data?.error ?? "Failed to create shop";
  }
};

export const getShopByUserIdAPI = async (userID: string) => {
  const token = useUserStore.getState().currentUserToken;
  try {
    const response = await axiosInstance.post(
      GET_SHOP_BY_USER_ID,
      {
        user_id: userID,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.status === HttpStatusCode.Found) {
      return response.data;
    }
  } catch (error) {
    const err = error as AxiosError<any>;
    throw err.response?.data?.error ?? "Failed to fetch shop by userID";
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
