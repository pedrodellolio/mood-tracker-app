import ToastActions from "@/components/toast-actions";
import { useAuth } from "@/hooks/use-auth";
import { areMonthsDifferent } from "@/lib/utils";
import { Day, Month, Mood } from "@/models/calendar";
import { getAllDaysFromYear } from "@/services/mood";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactNode, createContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface DailyMoodContextData {
  months: Month[];
  setMoodByDay: (mood: Mood, day: Day) => void;
  clearChanges: () => void;
}

const DailyMoodContext = createContext<DailyMoodContextData>(
  {} as DailyMoodContextData
);

export const DailyMoodProvider = ({ children }: { children: ReactNode }) => {
  const client = useQueryClient();
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["months", user?.uid, 2025],
    queryFn: () => getAllDaysFromYear(user!.uid, 2025),
    enabled: !!user,
  });

  const [months, setMonths] = useState<Month[]>([]);
  const [initialState, setInitialState] = useState<Month[]>([]);

  useEffect(() => {
    if (data) {
      setInitialState(data);
      setMonths(data);
    }
  }, [data]);

  useEffect(() => {
    if (!areMonthsDifferent(initialState, months)) {
      toast.dismiss("mood");
      return;
    }
    toast("Mood updated", {
      classNames: {
        toast: "flex-row justify-between",
      },
      duration: Infinity,
      id: "mood",
      action: <ToastActions />,
    });
  }, [months]);

  const clearChanges = () => {
    setMonths(initialState);
    client.invalidateQueries({ queryKey: ["months"] });
  };

  const setMoodByDay = (mood: Mood, day: Day) => {
    setMonths((prevState) =>
      prevState.map((month) => {
        // Check if the day belongs to the current month
        const dayIndex = month.days.findIndex((d) => d.date === day.date);
        if (dayIndex >= 0) {
          const updatedDays = [...month.days];
          if (mood === day.mood) {
            // Remove the day if the mood is unchanged
            updatedDays.splice(dayIndex, 1);
          } else {
            // Update the mood if the day exists
            updatedDays[dayIndex] = { ...day, mood };
          }
          return { ...month, days: updatedDays };
        }
        // If the day doesn't belong to this month, return the month unchanged
        return month;
      })
    );
  };

  return (
    <DailyMoodContext.Provider
      value={{
        months,
        setMoodByDay,
        clearChanges,
      }}
    >
      {children}
    </DailyMoodContext.Provider>
  );
};
export default DailyMoodContext;
