import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/components/App";
import "modern-normalize";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
