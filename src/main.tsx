import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import "./index.css";
import Router from "./router/index.tsx";
import store from "./store/index.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            color: "#facc15",
            fontWeight: "bold",
            borderRadius: "6px",
          },
          duration: 3000,
        }}
      />
      <Router />
    </Provider>
  </StrictMode>
);
