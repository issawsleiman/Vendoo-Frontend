import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useShopContext } from "../../context/ShopContext";

import { NOT_FOUND_ROUTE_NAME } from "../../utils/constants/pageNames";
import LoadingDialog from "../../widgets/LoadingDialog";
import { toast } from "react-toastify";

export function PublicShopPage() {
  const navigate = useNavigate();
  const shopContext = useShopContext();
  const { shopSlug } = useParams();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getShop = async () => {
      try {
        const result = await shopContext.getShopBySlug(shopSlug!);
        console.log("result:", result);
        if (!result) {
          return navigate(NOT_FOUND_ROUTE_NAME, { replace: true });
        }
      } catch (err: any) {
        console.log(err);
        toast(err);
      } finally {
        setLoading(false);
      }
    };
    getShop();
  });

  return (
    <>
      {isLoading && <LoadingDialog />}
      <div className=" min-h-screen flex justify-center items-center">
        <h1 className="text-4xl">Welcome To {shopSlug} Store</h1>
      </div>
    </>
  );
}
