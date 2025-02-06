import { todayDateString } from "@/lib/date";
import { useDailyMood } from "@/hooks/use-daily-mood";
import { Day, Layout, Mood } from "@/models/calendar";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { Lock } from "lucide-react";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { getMoodColorClass } from "@/lib/utils";

interface Props {
  data: Day;
  index: number;
  origin: Layout;
}

export default function DayCalendarCard({ data, index, origin }: Props) {
  const { setMoodByDay } = useDailyMood();
  const { isColorblindMode } = useUserPreferences();

  const isToday = format(data.date, "yyyy-MM-dd") === todayDateString;
  const isUpcomingDay = data.date > new Date();
  const [currentMood, setCurrentMood] = useState(Mood.DEFAULT);

  useEffect(() => {
    setCurrentMood(data.mood ?? Mood.DEFAULT);
  }, [data.mood]);

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

  return (
    <button
      title={isUpcomingDay ? "We're not there yet." : ""}
      aria-description={currentMood.toString()}
      key={index}
      className={`${
        !isUpcomingDay &&
        "hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
      } transition-all rounded-base shadow-shadow border-2 border-border relative flex justify-end items-start px-2 py-1 mb-3 text-xs font-semibold text-gray-900 cursor-pointer 
        ${isUpcomingDay ? "outline-gray-500" : "outline-primary"}
        ${isToday && "text-blue-700"}
        ${origin == Layout.MONTH ? "h-20" : "h-14"}`}
      style={{
        backgroundColor: `var(--${getMoodColorClass(
          currentMood,
          isColorblindMode
        )})`,
      }}
      onClick={changeMood}
    >
      {data.index}
      <div className="absolute inset-0 flex items-center justify-center">
        {isUpcomingDay ? (
          <Lock color="gray" opacity={0.5} size={18} strokeWidth={3} />
        ) : (
          isColorblindMode &&
          currentMood !== Mood.DEFAULT && (
            <ResponsiveText text={Mood[currentMood]} breakpoint={600} />
          )
        )}
      </div>
    </button>
  );
}

interface ResponsiveTextProps {
  text: string;
  breakpoint: number;
}

const ResponsiveText = ({ text, breakpoint }: ResponsiveTextProps) => {
  const [isFull, setIsFull] = useState(true);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (ref.current) {
        setIsFull(window.innerWidth > breakpoint);
      }
    });

    observer.observe(document.body);
    return () => observer.disconnect();
  }, [breakpoint]);

  return (
    <p
      className={`text-secondaryBlack ${isFull ? "text-xs" : "text-lg"}`}
      ref={ref}
    >
      {isFull ? text : text.slice(0, 1)}
    </p>
  );
};
