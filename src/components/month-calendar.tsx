import { DAYS_OF_WEEK, getStartDayOfWeek, groupDaysInWeeks } from "@/lib/date";
import WeekCalendarRow from "./week-calendar-row";
import { Month } from "@/models/calendar";

interface Props {
  data: Month;
}

export default function MonthCalendar({ data }: Props) {
  const startDay = getStartDayOfWeek(data.index - 1, 2025);
  const paddedDays = Array(startDay).fill(null).concat(data.days);
  const weeks = groupDaysInWeeks(paddedDays);

  return (
    <div key={data.index} className="mt-6 p-6">
      <p className="mb-4 font-semibold">{data.name} - 2025</p>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAYS_OF_WEEK.map((day, i) => (
          <div
            key={i}
            className="text-center text-xs text-muted-foreground font-semibold"
          >
            {day}
          </div>
        ))}
      </div>

      {weeks.map((week) => (
        <WeekCalendarRow data={week} key={week.index} />
      ))}
    </div>
  );
}
