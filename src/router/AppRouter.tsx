import React, { Suspense, lazy } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import {
  ABOUT_ROUTE_NAME,
  AUTHENTICATE_ROUTE_NAME,
  CONTACT_ROUTE_NAME,
  DASHBOARD_CATEGORIES_ROUTE_NAME,
  DASHBOARD_CUSTOMERS_ROUTE_NAME,
  DASHBOARD_ORDERS_ROUTE_NAME,
  DASHBOARD_PRODUCTS_ROUTE_NAME,
  DASHBOARD_PROFILE_ROUTE_NAME,
  DASHBOARD_ROUTE_NAME,
  FEATURES_ROUTE_NAME,
  FORGOT_PASSWORD_ROUTE_NAME,
  HOME_ROUTE_NAME,
  NOT_FOUND_ROUTE_NAME,
  PRICING_ROUTE_NAME,
  PRIVACY_POLICY_ROUTE_NAME,
  RESET_PASSWORD_ROUTE_NAME,
  STORE_CREATE_ROUTE_NAME,
  TERMS_AND_SERVICES_ROUTE_NAME,
  VERIFY_EMAIL_ROUTE_NAME,
} from "../utils/constants/pageNames";

import LandingLayout from "../all-sections/landing/LandingLayout";
import { useThemeContext } from "../context/ThemeContext";
import { PrimaryColorDark, PrimaryColorWhite } from "../utils/constants/colors";
import { PublicShopPage } from "../all-sections/users-pages/PublicShopPage";
import StoreSettingsPage from "../all-sections/client-pages/dashboardPages/storeSettings";

const HomeLandingPage = lazy(
  () => import("../all-sections/landing/pages/HomeLandingPage")
);
const AboutPage = lazy(() => import("../all-sections/landing/pages/AboutPage"));
const FeaturesPage = lazy(
  () => import("../all-sections/landing/pages/FeaturesPage")
);
const PricingPage = lazy(
  () => import("../all-sections/landing/pages/PricingPage")
);
const ContactUsPage = lazy(
  () => import("../all-sections/external/ContactUsPage")
);
const TermsOfServicePage = lazy(
  () => import("../all-sections/external/TermsAndServicePage")
);
const VerifyEmailPage = lazy(
  () => import("../all-sections/authentication/EmailVerifiedPage")
);
const PrivacyPolicyPage = lazy(
  () => import("../all-sections/external/Privacy")
);
const AuthPage = lazy(
  () => import("../all-sections/authentication/AuthenticationPage")
);

const ForgotOrCreatePasswordPage = lazy(
  () => import("../all-sections/authentication/ForgotOrCreatePasswordPage")
);

const CreateShopPage = lazy(
  () => import("../all-sections/client-pages/CreateShopPage")
);
const NotFoundPage = lazy(() => import("../PageNotFoundPage"));

// DASHBOARD

const DashboardLayout = lazy(
  () => import("../all-sections/client-pages/dashboardPages/layout")
);
const DashboardPage = lazy(
  () => import("../all-sections/client-pages/dashboardPages/dashboard")
);
const ProductsPage = lazy(
  () => import("../all-sections/client-pages/dashboardPages/Products")
);
const OrdersPage = lazy(
  () => import("../all-sections/client-pages/dashboardPages/Orders")
);
const CustomersPage = lazy(
  () => import("../all-sections/client-pages/dashboardPages/customers")
);
const ProfilePage = lazy(
  () => import("../all-sections/client-pages/dashboardPages/profile")
);
const CategoriesPage = lazy(
  () => import("../all-sections/client-pages/dashboardPages/categories")
);

const Loading = () => (
  <div
    style={{
      backgroundColor: `${
        useThemeContext().isDark ? PrimaryColorDark : PrimaryColorWhite
      }`,
    }}
  ></div>
);

export default function AllAppRouter() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Landing pages */}
          <Route
            path="/"
            element={
              <RedirectIfAuthenticated>
                <LandingLayout />
              </RedirectIfAuthenticated>
            }
          >
            {/* <Route index element={<HomeLandingPage />} /> */}
            <Route path={"/"} element={<HomeLandingPage />} />
            <Route path={HOME_ROUTE_NAME} element={<HomeLandingPage />} />
            <Route path={ABOUT_ROUTE_NAME} element={<AboutPage />} />
            <Route path={CONTACT_ROUTE_NAME} element={<ContactUsPage />} />
            <Route path={PRICING_ROUTE_NAME} element={<PricingPage />} />
            <Route path={FEATURES_ROUTE_NAME} element={<FeaturesPage />} />
            <Route
              path={AUTHENTICATE_ROUTE_NAME}
              element={
                <RedirectIfAuthenticated>
                  <AuthPage />
                </RedirectIfAuthenticated>
              }
            ></Route>
          </Route>

          {/* public page */}
          <Route path="/:shopSlug" element={<PublicShopPage />} />

          {/* External landing pages */}
          <Route
            path={TERMS_AND_SERVICES_ROUTE_NAME}
            element={<TermsOfServicePage />}
          />

          <Route
            path={PRIVACY_POLICY_ROUTE_NAME}
            element={<PrivacyPolicyPage />}
          />
          <Route path={VERIFY_EMAIL_ROUTE_NAME} element={<VerifyEmailPage />} />
          <Route
            path={RESET_PASSWORD_ROUTE_NAME}
            element={<ForgotOrCreatePasswordPage isCreatePasswordPage />}
          />
          <Route
            path={FORGOT_PASSWORD_ROUTE_NAME}
            element={<ForgotOrCreatePasswordPage />}
          />

          {/* Protected pages */}
          <Route
            path={STORE_CREATE_ROUTE_NAME}
            element={
              <RequireProfileWithoutShop>
                <CreateShopPage />
              </RequireProfileWithoutShop>
            }
          />
          <Route
            path={"/"}
            element={
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            }
          >
            <Route path={DASHBOARD_ROUTE_NAME} element={<DashboardPage />} />
            <Route
              path={DASHBOARD_ORDERS_ROUTE_NAME}
              element={<OrdersPage />}
            />
            <Route
              path={DASHBOARD_PRODUCTS_ROUTE_NAME}
              element={<ProductsPage />}
            />
            <Route
              path={DASHBOARD_CATEGORIES_ROUTE_NAME}
              element={<CategoriesPage />}
            />
            <Route
              path={DASHBOARD_CUSTOMERS_ROUTE_NAME}
              element={<CustomersPage />}
            />
            <Route
              path={DASHBOARD_PROFILE_ROUTE_NAME}
              element={<ProfilePage />}
            />
            <Route path={"settings"} element={<StoreSettingsPage />} />
          </Route>

          {/* Catch all */}
          <Route path={NOT_FOUND_ROUTE_NAME} element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

/** Redirect authenticated users (profile exists) to dashboard or store creation */
export function RedirectIfAuthenticated({
  children,
}: {
  children: React.ReactElement;
}) {
  const profile = useUserStore((s) => s.profile);
  return profile ? (
    <Navigate
      to={profile.hasShop ? DASHBOARD_ROUTE_NAME : STORE_CREATE_ROUTE_NAME}
      replace
    />
  ) : (
    children
  );
}

/** Protects a route: requires a token (logged in) */
export function RequireAuth({ children }: { children: React.ReactElement }) {
  const profile = useUserStore((s) => s.profile);

  if (!profile) {
    return <Navigate to={HOME_ROUTE_NAME} />;
  }

  if (!profile.hasShop) {
    return <Navigate to={STORE_CREATE_ROUTE_NAME} replace />;
  }

  return children;
}

/** Allows access only if the user has a profile AND doesn't have a shop yet */
export function RequireProfileWithoutShop({
  children,
}: {
  children: React.ReactElement;
}) {
  const profile = useUserStore((s) => s.profile);
  return !profile ? (
    <Navigate to={HOME_ROUTE_NAME} replace />
  ) : profile.hasShop ? (
    <Navigate to={DASHBOARD_ROUTE_NAME} replace />
  ) : (
    children
  );
}
