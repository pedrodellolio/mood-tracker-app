import ToastActions from "@/components/toast-actions";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { currentYear } from "@/lib/date";
import { areMonthsDifferent } from "@/lib/utils";
import { Day, Month, Mood } from "@/models/calendar";
import { getAllDaysFromYear } from "@/services/mood";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ReactNode, createContext, useEffect, useRef, useState } from "react";

interface DailyMoodContextData {
  months: Month[];
  selectedYear: number;
  setMoodByDay: (mood: Mood, day: Day) => void;
  clearChanges: () => void;
  changeYear: (op: number) => void;
}

const DailyMoodContext = createContext<DailyMoodContextData>(
  {} as DailyMoodContextData
);

export const DailyMoodProvider = ({ children }: { children: ReactNode }) => {
  const client = useQueryClient();
  const { user, userCreationDate } = useAuth();
  const { toast } = useToast();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [months, setMonths] = useState<Month[]>([]);
  const [initialState, setInitialState] = useState<Month[]>([]);
  const toastIdRef = useRef<string>(undefined); // Provide the type (string) for useRef

  const { data, error } = useQuery<Month[]>({
    queryKey: ["months", user?.uid, selectedYear],
    queryFn: () => getAllDaysFromYear(user!.uid, selectedYear),
    enabled: !!user && !!selectedYear,
    placeholderData: () => [],
    retry: 1,
  });

  useEffect(() => {
    if (error) toast.error(error.message ?? "Something went wrong");
  }, [error, toast]);

  useEffect(() => {
    if (data) {
      setInitialState(data);
      setMonths(data);
    }
  }, [data]);

  useEffect(() => {
    if (!areMonthsDifferent(initialState, months)) return;

    if (!toastIdRef.current) {
      const { id } = toast({
        itemID: "mood",
        title: "Mood updated",
        duration: Infinity,
        action: <ToastActions toastIdRef={toastIdRef} />,
      });
      toastIdRef.current = id;
    }
  }, [months]);

  const changeYear = (op: number) => {
    setSelectedYear((prevState) => {
      const newYear = prevState + op;
      const userCreationYear = parseInt(
        format(userCreationDate ?? new Date(), "yyyy")
      );
      if (newYear < userCreationYear || newYear > currentYear) {
        return prevState;
      }

      return newYear;
    });
  };

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
            updatedDays[dayIndex] = { ...day, mood, changed: true };
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
        selectedYear,
        setMoodByDay,
        clearChanges,
        changeYear,
      }}
    >
      {children}
    </DailyMoodContext.Provider>
  );
};
export default DailyMoodContext;
