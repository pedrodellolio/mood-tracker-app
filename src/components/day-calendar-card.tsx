import { getMoodColorClass, todayDateString } from "@/lib/date";
import { useDailyMood } from "@/hooks/use-daily-mood";
import { Day, Mood } from "@/models/calendar";
import { useQuery } from "@tanstack/react-query";
import { getMood } from "@/services/mood";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface Props {
  data: Day;
  index: number;
}

export default function DayCalendarCard({ data, index }: Props) {
  const { setMoodByDay } = useDailyMood();
  const isToday = format(data.date, "yyyy-MM-dd") === todayDateString;
  const isUpcomingDay = data.date > new Date();

  const [currentMood, setCurrentMood] = useState(Mood.DEFAULT);

  const {
    data: mood,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mood", data.date],
    queryFn: () => getMood(data.date),
  });

  useEffect(() => {
    if (mood) {
      setCurrentMood(mood ?? Mood.DEFAULT);
      data.mood = mood;
    }
  }, [mood]);

  const changeMood = () => {
    // Cycle through moods
    if (isUpcomingDay) return;

    const moodValues = Object.values(Mood).filter(
      (value) => typeof value === "number"
    ) as number[];

    const currentMoodIndex = moodValues.indexOf(currentMood);
    const nextMoodIndex = (currentMoodIndex + 1) % moodValues.length;
    setMoodByDay(moodValues[nextMoodIndex], data);
    setCurrentMood(moodValues[nextMoodIndex]);
  };

  if (isLoading) <p>Loading...</p>;
  if (error) <p>Error</p>;
  return (
    <div
      key={index}
      className={`select-none flex justify-end items-start h-14 px-2 py-1 mb-1 text-xs font-semibold text-gray-900 cursor-pointer hover:outline outline-2 outline-offset-1
      ${isToday && "text-blue-700"}`}
      style={{
        backgroundColor: `hsl(var(--${getMoodColorClass(currentMood)}))`,
      }}
      onClick={changeMood}
    >
      {data.index}
    </div>
  );
}
