import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ModalProvider from "./context/ModalContext";
import { AuthProvider } from "./context/AuthContext";
import { VtuProvider } from "./context/VtuContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <AuthProvider>
        <VtuProvider>
          <App />
        </VtuProvider>
        </AuthProvider>
      </ModalProvider>
    </BrowserRouter>
  // </StrictMode>
);
