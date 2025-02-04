import UserPreferencesContext from "@/contexts/user-preferences-context";
import { useContext } from "react";

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  return context;
}