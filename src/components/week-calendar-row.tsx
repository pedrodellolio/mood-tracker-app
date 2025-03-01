import { Layout, Week } from "@/models/calendar";
import DayCalendarCard from "./day-calendar-card";

interface Props {
  data: Week;
}

export default function WeekCalendarRow({ data }: Props) {
  return (
    <div key={data.index} className="grid grid-cols-7 gap-2 sm:gap-3">
      {data.days.map((day, i) => {
        return !day ? (
          <div
            key={i}
            className={`select-none flex justify-end items-start h-20 px-2 py-1 mb-1 text-xs font-semibold text-gray-900`}
            style={{
              backgroundColor: "var(--calendar-card-secondary)",
            }}
          ></div>
        ) : (
          <DayCalendarCard data={day} origin={Layout.MONTH} index={i} key={i} />
        );
      })}
    </div>
  );
}
