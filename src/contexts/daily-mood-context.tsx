import { Day, Mood } from "@/models/calendar";
import { ReactNode, createContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface DailyMoodContextData {
  days: Day[];
  setMoodByDay: (mood: Mood, day: Day) => void;
}

const DailyMoodContext = createContext<DailyMoodContextData>(
  {} as DailyMoodContextData
);

export const DailyMoodProvider = ({ children }: { children: ReactNode }) => {
  const [days, setDays] = useState<Day[]>([]);
  const [isToastOpen, setIsToastOpen] = useState(false);

  useEffect(() => {
    if (days.length == 0) {
      // Dismiss toast if days array is empty
      toast.dismiss("mood");
      setIsToastOpen(false);
      return;
    }

    if (!isToastOpen) {
      // Prevent toast from opening again if it is already open
      toast("Mood updated", { duration: Infinity, id: "mood" });
      setIsToastOpen(true);
    }
  }, [days]);

  const setMoodByDay = (mood: Mood, day: Day) => {
    setDays((prevState) => {
      if (mood === day.mood) {
        // If no changes are detected, remove day from the array.
        return prevState.filter((d) => d.date !== day.date);
      } else {
        const dayIndex = prevState.findIndex((d) => d.date === day.date);
        if (dayIndex >= 0) {
          // Update mood if day exists
          const updatedDays = [...prevState];
          updatedDays[dayIndex] = { ...day, mood };
          return updatedDays;
        } else {
          // Add day to array if it doesn't exist
          return [...prevState, { ...day, mood }];
        }
      }
    });
  };

  return (
    <DailyMoodContext.Provider
      value={{
        days,
        setMoodByDay,
      }}
    >
      {children}
    </DailyMoodContext.Provider>
  );
};
export default DailyMoodContext;
