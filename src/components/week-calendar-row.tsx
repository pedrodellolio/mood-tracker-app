import { Week } from "@/models/calendar";
import DayCalendarCard from "./day-calendar-card";

interface Props {
  data: Week;
}

export default function WeekCalendarRow({ data }: Props) {
  return (
    <div key={data.index} className="grid grid-cols-7 gap-1">
      {data.days.map((day, i) => {
        return <DayCalendarCard data={day} index={i} key={i} />;
      })}
    </div>
  );
}
