import { getMoodColorClass, todayDateString } from "@/lib/date";
import { useDailyMood } from "@/hooks/use-daily-mood";
import { Day, Mood } from "@/models/calendar";
import { useEffect, useState } from "react";

interface Props {
  data: Day;
  index: number;
}

export default function DayCalendarCard({ data, index }: Props) {
  const { setMoodByDay } = useDailyMood();
  const [currentMood, setCurrentMood] = useState<Mood>(Mood.DEFAULT);
  const [bgColor, setBgColor] = useState("hsl(var(--calendar-card-secondary))");
  const isDayOfMonth = !!data;
  const isToday = isDayOfMonth && data.date === todayDateString;
  const isUpcomingDay =
    isDayOfMonth && new Date(data.date) > new Date(todayDateString);

  // Get day BG color based on mood and if it is included in current month
  useEffect(() => {
    if (isDayOfMonth)
      setBgColor(`hsl(var(--${getMoodColorClass(currentMood)}))`);
  }, [currentMood]);

  const changeMood = () => {
    if (isUpcomingDay) return;
    const moodValues = Object.values(Mood).filter(
      (value) => typeof value === "number"
    ) as number[];

    const currentMoodIndex = moodValues.indexOf(currentMood);
    const nextMoodIndex = (currentMoodIndex + 1) % moodValues.length; // Cycle through moods
    setCurrentMood(moodValues[nextMoodIndex]);
    setMoodByDay(moodValues[nextMoodIndex], data);
  };

  return (
    <div
      key={index}
      className={`select-none flex justify-end items-start h-14 px-2 py-1 mb-1 text-xs font-semibold text-gray-900 cursor-pointer hover:outline outline-2 outline-offset-1
      ${isToday && "text-blue-700"}`}
      style={{
        backgroundColor: bgColor,
      }}
      onClick={changeMood}
    >
      {isDayOfMonth ? data.index : ""}
    </div>
  );
}
