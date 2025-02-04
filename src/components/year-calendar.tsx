import { Layout, Month } from "@/models/calendar";
import DayCalendarCard from "./day-calendar-card";

interface Props {
  data: Month[];
}

export default function YearCalendar({ data }: Props) {
  return (
    <div className="overflow-x-auto overflow-y-hidden">
    <div className="grid grid-flow-col auto-cols-[minmax(60px,_1fr)] gap-2">
      {data.map((month) => (
        <div key={month.name} className="min-w-[60px]">
          <p className="text-center text-sm text-secondary font-semibold text-secondary-foreground/90 mb-3">
            {month.name.slice(0, 1)}
          </p>
          {month.days.map((day, i) => (
            <DayCalendarCard data={day} origin={Layout.YEAR} index={i} key={i} />
          ))}
        </div>
      ))}
    </div>
  </div>
  
  );
}
