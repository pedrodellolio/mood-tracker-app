import { todayDateString } from "@/lib/date";
import { useLogbook } from "@/hooks/use-logbook";
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
  const { setMoodByDay, markers } = useLogbook();
  const { isColorblindMode } = useUserPreferences();

  const [currentMood, setCurrentMood] = useState(Mood.DEFAULT);

  useEffect(() => {
    setCurrentMood(data.mood ?? Mood.DEFAULT);
  }, [data.mood]);

  const isToday = format(data.date, "yyyy-MM-dd") === todayDateString;
  const isUpcomingDay = data.date > new Date();

  const changeColor = () => {
    if (isUpcomingDay || markers.length === 0) return;

    let colorValues = [Mood.DEFAULT, ...markers.map((m) => m.color)];
    const currentIndex = colorValues.lastIndexOf(currentMood);
    const nextIndex = (currentIndex + 1) % colorValues.length;
    const nextColor = colorValues[nextIndex] ?? Mood.DEFAULT;

    setMoodByDay(nextColor, data);
    setCurrentMood(nextColor);
  };

  return (
    <button
      title={isUpcomingDay ? "We're not there yet." : ""}
      aria-description={currentMood.toString()}
      key={index}
      className={`${
        !isUpcomingDay &&
        "hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
      } w-full transition-all rounded-base shadow-shadow border-2 border-border relative flex justify-end items-start px-2 py-1 mb-3 text-xs font-semibold text-gray-900 cursor-pointer 
        ${isUpcomingDay ? "outline-gray-500" : "outline-primary"}
        ${isToday && "text-blue-700"}
        ${origin == Layout.MONTH ? "h-20" : "h-14"}`}
      style={{
        backgroundColor: `var(--${getMoodColorClass(
          currentMood,
          isColorblindMode
        )})`,
      }}
      onClick={changeColor}
    >
      {data.index}
      <div className="absolute inset-0 flex items-center justify-center">
        {isUpcomingDay ? (
          <Lock color="gray" opacity={0.5} size={18} strokeWidth={3} />
        ) : (
          isColorblindMode &&
          currentMood !== Mood.DEFAULT && (
            <ResponsiveText
              text={Mood[currentMood]}
              breakpoint={600}
              layout={origin}
            />
          )
        )}
      </div>
    </button>
  );
}

interface ResponsiveTextProps {
  text: string;
  breakpoint: number;
  layout: Layout;
}

const ResponsiveText = ({ text, breakpoint, layout }: ResponsiveTextProps) => {
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
      className={`text-secondaryBlack ${isFull ? "text-xs" : "text-sm"}`}
      ref={ref}
    >
      {layout === Layout.YEAR || !isFull ? text.slice(0, 1) : text}
    </p>
  );
};
