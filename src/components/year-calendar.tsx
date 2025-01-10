import { Month } from "@/models/calendar";
import DayCalendarCard from "./day-calendar-card";

interface Props {
  data: Month[];
}

export default function YearCalendar({ data }: Props) {
  // const startDay = getStartDayOfWeek(data.index - 1, 2025);
  // const paddedDays = Array(startDay).fill(null).concat(data.days);
  // const weeks = groupDaysInWeeks(paddedDays);
  return (
    <div className="grid grid-cols-12 grid-flow-col gap-2">
      {data.map((month) => {
        return (
          <div>
            {month.days.map((day, i) => {
              return <DayCalendarCard data={day} index={i} key={i} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
