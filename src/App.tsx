import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthenticationProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import AllAppRouter from "./router/AppRouter";
import { PublicProvider } from "./context/LandingContext";
import { Bounce, ToastContainer } from "react-toastify";
import { ShopProvider } from "./context/ShopContext";
import { DashboardProvider } from "./context/DashboardContext";

export default function App() {
  return (
    <>
      <ToastContainer
        autoClose={3000}
        hideProgressBar
        transition={Bounce}
        theme="colored"
      />
      <ThemeProvider>
        <GoogleOAuthProvider
          clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
        >
          <AuthenticationProvider>
            <PublicProvider>
              <DashboardProvider>
                <ShopProvider>
                  <AllAppRouter />
                </ShopProvider>
              </DashboardProvider>
            </PublicProvider>
          </AuthenticationProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </>
  );
}
