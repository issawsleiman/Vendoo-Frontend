import { useEffect, useState } from "react";
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

export default function CreateShopPage() {
  const isDark = useThemeContext().isDark;
  const publicContext = useLandingContext();
  const userStore = useUserStore();
  const navigate = useNavigate();

  const shopContext = useShopContext();
  const [categories, setCategories] = useState<Categories[] | null>(null);

  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryID, setCategoryID] = useState<string>("10");

  const [isCreatingShop, setIsCreatingShop] = useState(false);

  useEffect(() => {}, [userStore.profile?.hasShop, navigate]);

  useEffect(() => {
    // if hasShop redirect to dashboard
    if (userStore.profile?.hasShop) {
      navigate(DASHBOARD_ROUTE_NAME, { replace: true });
      return;
    }

    // show loading
    publicContext.setLoadingStatus(true);
    const loadCategories = async () => {
      const result = await shopContext.getCategories(
        userStore.currentUserToken!
      );

      setCategories(result);
      console.log("Categories: " + result);
      publicContext.setLoadingStatus(false);
    };
    loadCategories();
  }, []);

  const handleCreatingShop = async () => {
    if (shopName === "" || categoryID === "" || description === "") {
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

      const created = await shopContext.createNewShop(
        userStore.profile?.userID!,
        newShop
      );
      if (created) {
        // navigating to dashboard after user create shop
        setIsCreatingShop(false);
        userStore.updateHasShopStatus(true);
        navigate(DASHBOARD_ROUTE_NAME);
      }
    } catch (err: any) {
      toast.error("Something went wrong: " + err);
    } finally {
      setIsCreatingShop(false);
    }
  };

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
        className="border md:min-w-2xl rounded-2xl shadow-xl p-8"
        style={{
          backgroundColor: isDark ? SecondaryColorDark : SecondaryColorWhite,
          borderColor: isDark ? BorderColorDark : BorderColorWhite,
        }}
      >
        <div className="w-full flex flex-row justify-between pb-10 items-center">
          <VendooLogo />
          <ThemeSwitch />
        </div>

        <SectionHeadingText
          title=" Create Your Shop"
          description="Complete the setup below to start selling on Vendoo."
        />

        <form
          className="space-y-5"
          onSubmit={(e: any) => {
            e.preventDefault();
            handleCreatingShop();
          }}
        >
          {/* Store Name */}
          <div>
            <VendooLabel text="Shop name*" htmlFor="shop-name" />
            <VendooInput
              name="shop-name"
              hintText="Ex: Sleiman Shop"
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              isRequired
              isFullWidth
              id={"create-shopname"}
            />
          </div>

          {/* Description */}
          <div>
            <VendooLabel text="Shop Description*" htmlFor="shop-description" />
            <VendooTextarea
              name="shop-description"
              hintText="Describe your Shop..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isRequired
              isFullWidth
              id={""}
            />
          </div>

          {/* Categories */}
          <div>
            {categories && (
              <CategorySelect
                categories={categories!}
                key={"categories"}
                isDark={isDark}
                onChange={(id) => {
                  console.log(id);
                  setCategoryID(id);
                }}
              />
            )}
          </div>
          <VendooButton
            children={
              isCreatingShop ? (
                <div className="flex flex-row gap-3">
                  <Loader2 className="animate-spin" />
                  Creating...
                </div>
              ) : (
                "Create Store"
              )
            }
            type="submit"
            isDisabled={isCreatingShop}
            className="w-full"
          />
        </form>
      </div>
    </div>
  );
}

interface Category {
  category_id: string;
  category: string;
}

interface Props {
  categories: Category[]; // Pass your categories array here
  onChange?: (selectedCategory: string) => void; // Optional callback
  isDark: boolean;
}

function CategorySelect({ categories, onChange, isDark }: Props) {
  const [selected, setSelected] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="w-full">
      <label htmlFor="category-select" className="sr-only">
        Select a category
      </label>
      <select
        id="category-select"
        value={selected}
        onChange={handleChange}
        className="w-full rounded-md p-2 border-0 py-4 "
        style={{
          backgroundColor: isDark ? PrimaryColorDark : PrimaryColorWhite,
          border: "none",
          color: isDark ? TextColorDark : TextColorWhite,
        }}
      >
        <option value="" disabled>
          -- Select a category --"
        </option>
        {categories?.map((t) => (
          <option
            className="m-10"
            key={t.category_id}
            value={t.category_id}
            title={t.category}
          >
            {t.category}
          </option>
        ))}
      </select>
    </div>
  );
}
