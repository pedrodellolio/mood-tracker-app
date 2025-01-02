import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DailyMoodProvider } from "./contexts/daily-mood-context.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DailyMoodProvider>
      <App />
      <Toaster />
    </DailyMoodProvider>
  </StrictMode>
);
