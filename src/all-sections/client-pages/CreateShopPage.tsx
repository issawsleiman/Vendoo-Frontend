import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BorderColorDark,
  BorderColorWhite,
  PrimaryColorDark,
  PrimaryColorWhite,
  SecondaryColorDark,
  SecondaryColorWhite,
  TextColorDark,
  TextColorWhite,
} from "../../utils/constants/colors";
import { useThemeContext } from "../../context/ThemeContext";

import { useShopContext, type VendooShop } from "../../context/ShopContext";
import type { Categories } from "../../models/Categories";

import { useLandingContext } from "../../context/LandingContext";

import { useUserStore } from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { DASHBOARD_ROUTE_NAME } from "../../utils/constants/pageNames";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import LoadingDialog from "../../widgets/LoadingDialog";
import SectionHeadingText from "../../widgets/SectionHeadingText";
import ThemeSwitch from "../../widgets/ThemeSwitch";
import VendooButton from "../../widgets/VendooButton";
import { VendooInput, VendooTextarea } from "../../widgets/VendooInput";
import VendooLabel from "../../widgets/VendooLabel";
import { VendooLogo } from "../../widgets/VendooLogo";
import { useShopStore } from "../../store/useShopStore";

interface ValidationErrors {
  shopName?: string;
  description?: string;
  category?: string;
}

// Constants
const DEFAULT_CATEGORY_ID = "10";
const SHOP_NAME_MIN_LENGTH = 3;
const SHOP_NAME_MAX_LENGTH = 20;
const DESCRIPTION_MIN_LENGTH = 10;
const DESCRIPTION_MAX_LENGTH = 500;

export default function CreateShopPage() {
  const { isDark } = useThemeContext();
  const publicContext = useLandingContext();
  const userStore = useUserStore();
  const shopStore = useShopStore();
  const navigate = useNavigate();
  const shopContext = useShopContext();

  // State
  const [categories, setCategories] = useState<Categories[] | null>(null);
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryID, setCategoryID] = useState<string>(DEFAULT_CATEGORY_ID);
  const [isCreatingShop, setIsCreatingShop] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  // Memoized values
  const hasShop = useMemo(
    () => userStore.profile?.hasShop,
    [userStore.profile?.hasShop]
  );
  const userToken = useMemo(
    () => userStore.currentUserToken,
    [userStore.currentUserToken]
  );
  const userID = useMemo(
    () => userStore.profile?.userID,
    [userStore.profile?.userID]
  );

  // Redirect if user already has a shop
  useEffect(() => {
    if (hasShop) {
      navigate(DASHBOARD_ROUTE_NAME, { replace: true });
      return;
    }
  }, [hasShop, navigate]);

  //  Load categories on mount
  useEffect(() => {
    if (hasShop || !userToken) return;

    const loadCategories = async () => {
      publicContext.setLoadingStatus(true);
      try {
        const result = await shopContext.getCategories(userToken);
        if (result && result.length > 0) {
          setCategories(result);
          console.log("Categories are:", result);
        } else {
          toast.warning("No categories available. Please contact support.");
        }
      } catch (error) {
        console.error("Failed to load categories:", error);
        toast.error("Failed to load categories. Please refresh the page.");
      } finally {
        publicContext.setLoadingStatus(false);
      }
    };
    loadCategories();
  }, []);

  // validation
  const validateForm = useCallback((): boolean => {
    const errors: ValidationErrors = {};

    const sName = shopName.trim();
    const sDescription = description.trim();

    // Shop name validation
    if (!sName) {
      errors.shopName = "Shop name is required";
    } else if (sName.length < SHOP_NAME_MIN_LENGTH) {
      errors.shopName = `Shop name must be at leat ${SHOP_NAME_MAX_LENGTH} characters`;
    } else if (sName.length > SHOP_NAME_MAX_LENGTH) {
      errors.shopName = `Shop name must not exceed ${SHOP_NAME_MAX_LENGTH} characters`;
    }

    // Description Validation
    if (!sDescription.trim()) {
      errors.description = "Shop description is required";
    } else if (sDescription.length < DESCRIPTION_MIN_LENGTH) {
      errors.description = `Description must be at least ${DESCRIPTION_MIN_LENGTH} characters`;
    } else if (sDescription.length > DESCRIPTION_MAX_LENGTH) {
      errors.description = `Description must not exceed ${DESCRIPTION_MAX_LENGTH} characters`;
    }

    // Category validation
    if (!categoryID) {
      errors.category = "Please select a category";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [shopName, description, categoryID]);

  // Handles shop creating
  const handleCreatingShop = useCallback(async () => {
    if (!validateForm() || !userID) {
      toast.error("Please correct the errors in the form");
      return;
    }

    // setting creating shop flag to true
    setIsCreatingShop(true);

    try {
      const newShop: VendooShop = {
        UserID: userStore.profile?.userID!,
        CategoryID: categoryID,
        ShopName: shopName,
        ShopDescription: description,
      };

      const shopDetails = await shopContext.createNewShop(
        userStore.profile?.userID!,
        newShop
      );
      console.log("ShopDetails", shopDetails);
      if (shopDetails) {
        // updating user's hasShop status
        userStore.updateHasShopStatus(true);
        // saving the store details
        shopStore.setUserShop(shopDetails);
        navigate(DASHBOARD_ROUTE_NAME, { replace: true });
      } else {
        toast.error("Failed to create shop. Please try again.");
      }
    } catch (error: any) {
      console.error("Error creating shop:", error);
      const errorMessage = error?.message || "An unexpected error occurred";
      toast.error(`Failed to create shop: ${errorMessage}`);
    } finally {
      setIsCreatingShop(false);
    }
  }, [
    validateForm,
    userID,
    categoryID,
    shopName,
    description,
    shopContext,
    userStore,
    navigate,
  ]);

  // Handle form submission
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleCreatingShop();
    },
    [handleCreatingShop]
  );

  // show loading screen if loading
  if (publicContext.isLoading) {
    return <LoadingDialog />;
  }

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center p-4 md:p-10"
      style={{
        backgroundColor: isDark ? PrimaryColorDark : PrimaryColorWhite,
      }}
    >
      <div
        className="border md:min-w-2xl rounded-2xl shadow-xl p-8 w-full max-w-2xl"
        style={{
          backgroundColor: isDark ? SecondaryColorDark : SecondaryColorWhite,
          borderColor: isDark ? BorderColorDark : BorderColorWhite,
        }}
      >
        {/* Header */}
        <div className="w-full flex flex-row justify-between pb-10 items-center">
          <VendooLogo />
          <ThemeSwitch />
        </div>

        {/* Title and Description */}
        <SectionHeadingText
          title="Create Your Shop"
          description="Complete the setup below to start selling on Vendoo."
        />

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          {/* Shop Name */}
          <div>
            <VendooLabel text="Shop Name*" htmlFor="shop-name" />
            <VendooInput
              name="shop-name"
              hintText="e.g., Premium Vintage Store"
              type="text"
              value={shopName}
              onChange={(e) => {
                setShopName(e.target.value);
                if (validationErrors.shopName) {
                  setValidationErrors((prev) => ({
                    ...prev,
                    shopName: undefined,
                  }));
                }
              }}
              isRequired
              isFullWidth
              id="create-shopname"
              maxLength={SHOP_NAME_MAX_LENGTH}
              aria-invalid={!!validationErrors.shopName}
              aria-describedby={
                validationErrors.shopName ? "shop-name-error" : undefined
              }
            />
            {validationErrors.shopName && (
              <p
                id="shop-name-error"
                className="mt-1 text-sm text-red-600"
                role="alert"
              >
                {validationErrors.shopName}
              </p>
            )}
            <p className="mt-1 text-xs opacity-60">
              {shopName.length}/{SHOP_NAME_MAX_LENGTH} characters
            </p>
          </div>

          {/* Description */}
          <div>
            <VendooLabel text="Shop Description*" htmlFor="shop-description" />
            <VendooTextarea
              name="shop-description"
              hintText="Describe what makes your shop unique..."
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (validationErrors.description) {
                  setValidationErrors((prev) => ({
                    ...prev,
                    description: undefined,
                  }));
                }
              }}
              isRequired
              isFullWidth
              id="shop-description"
              maxLength={DESCRIPTION_MAX_LENGTH}
              aria-invalid={!!validationErrors.description}
              aria-describedby={
                validationErrors.description ? "description-error" : undefined
              }
            />
            {validationErrors.description && (
              <p
                id="description-error"
                className="mt-1 text-sm text-red-600"
                role="alert"
              >
                {validationErrors.description}
              </p>
            )}
            <p className="mt-1 text-xs opacity-60">
              {description.length}/{DESCRIPTION_MAX_LENGTH} characters
            </p>
          </div>

          {/* Category Selection */}
          {categories && categories.length > 0 && (
            <div>
              <CategorySelect
                categories={categories}
                isDark={isDark}
                selectedValue={categoryID}
                onChange={(id) => {
                  setCategoryID(id);
                  if (validationErrors.category) {
                    setValidationErrors((prev) => ({
                      ...prev,
                      category: undefined,
                    }));
                  }
                }}
                error={validationErrors.category}
              />
            </div>
          )}

          {/* Submit Button */}
          <VendooButton
            type="submit"
            isDisabled={isCreatingShop}
            className="w-full"
            aria-busy={isCreatingShop}
          >
            {isCreatingShop ? (
              <span className="flex flex-row gap-3 items-center justify-center">
                <Loader2
                  className="animate-spin"
                  size={20}
                  aria-hidden="true"
                />
                <span>Creating Shop...</span>
              </span>
            ) : (
              "Create Shop"
            )}
          </VendooButton>
        </form>
      </div>
    </div>
  );
}

interface Category {
  category_id: string;
  category: string;
}

interface CategorySelectProps {
  categories: Category[];
  selectedValue?: string;
  onChange?: (selectedCategory: string) => void;
  isDark: boolean;
  error?: string;
}

function CategorySelect({
  categories,
  selectedValue = "",
  onChange,
  isDark,
  error,
}: CategorySelectProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      if (onChange && value) {
        onChange(value);
      }
    },
    [onChange]
  );

  return (
    <div className="w-full">
      <VendooLabel text="Shop Category*" htmlFor="category-select" />
      <select
        id="category-select"
        value={selectedValue}
        onChange={handleChange}
        required
        className="w-full rounded-md p-2 border-0 py-4 focus:ring-2 focus:ring-offset-2 transition-all"
        style={{
          backgroundColor: isDark ? PrimaryColorDark : PrimaryColorWhite,
          border: "none",
          color: isDark ? TextColorDark : TextColorWhite,
        }}
        aria-invalid={!!error}
        aria-describedby={error ? "category-error" : undefined}
      >
        <option value="" disabled>
          -- Select a category --
        </option>
        {categories.map((category) => (
          <option
            key={category.category_id}
            value={category.category_id}
            title={category.category}
          >
            {category.category}
          </option>
        ))}
      </select>
      {error && (
        <p
          id="category-error"
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
