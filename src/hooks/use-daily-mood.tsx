import DailyMoodContext from "@/contexts/daily-mood-context";
import { useContext } from "react";

export function useDailyMood() {
  const context = useContext(DailyMoodContext);
  return context;
}