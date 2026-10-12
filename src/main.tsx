import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <HeroUIProvider>
        <ToastProvider placement="top-right" />
        <div className="light min-h-screen bg-default-50 text-foreground">
          <App />
        </div>
      </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>
);
