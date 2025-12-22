export default function registerVendooServiceWorker() {
  // Check if the serviceWorker API is available in the browser.
  if ("serviceWorker" in navigator) {
    // We register the service worker after the 'load' event
    // to avoid delaying page load.
    window.addEventListener("load", () => {
      const swUrl = "/service-worker.js";

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log(
            "Service Worker registered successfully with scope:",
            registration.scope
          );

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }
            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  // At this point, the new content is available,
                  // and the old content will be purged when all
                  // tabs are closed. You can prompt the user to refresh.
                  console.log(
                    "New content is available and will be used when all " +
                      "tabs for this page are closed. (Or skipWaiting() was called)"
                  );
                } else {
                  // At this point, everything has been precached.
                  // It's the perfect time to display a
                  // "Content is cached for offline use." message.
                  console.log("Content is cached for offline use.");
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error("Error during service worker registration:", error);
        });
    });
  } else {
    console.log("Service workers are not supported in this browser.");
  }
}
