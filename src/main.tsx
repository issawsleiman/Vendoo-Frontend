import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import registerVendooServiceWorker from "./registerServiceWorker";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

if (import.meta.env.PROD) {
  // register the service worker
  registerVendooServiceWorker();
}
