import { format, getDay, startOfMonth } from "date-fns";
import { Day, Mood, Week } from "../models/calendar";

export const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const todayDateString = format(new Date(), "yyyy-MM-dd");

export const formatDayMonthYear = (
  day: number,
  month: number,
  year: number
) => {
  const date = new Date(year, month - 1, day);
  return format(date, "yyyy-MM-dd");
};

// Get the index of the first day of the week
export const getStartDayOfWeek = (month: number, year: number) => {
  const firstDay = startOfMonth(new Date(year, month)); // Get first day of the month
  return getDay(firstDay); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
};

// Group an array of days into weeks
export const groupDaysInWeeks = (days: Day[]) => {
  const weeks: Week[] = [];
  let week: Day[] = [];
  let weekIndex = 0;

  // Group the days into weeks (7 days per week)
  for (let i = 0; i < days.length; i++) {
    week.push(days[i]);
    if (week.length === 7) {
      weeks.push({ index: weekIndex, days: week });
      week = [];
      weekIndex++;
    }
  }
  // Add the last week if it has fewer than 7 days
  if (week.length > 0) {
    weekIndex++;
    weeks.push({ index: weekIndex, days: week });
  }

  return weeks;
};

// Get the mood color variable
export const getMoodColorClass = (mood: Mood) => {
  // let color = "";
  // switch (mood) {
  //   case Mood.DEFAULT:
  //     color = "bg-gray-500";
  //     break;
  //   case Mood.AWESOME:
  //     color = "bg-green-500";
  //     break;
  //   case Mood.GOOD:
  //     color = "bg-green-300";
  //     break;
  //   case Mood.NEUTRAL:
  //     color = "bg-green-100";
  //     break;
  //   case Mood.BAD:
  //     color = "bg-yellow-500";
  //     break;
  //   case Mood.AWFUL:
  //     color = "bg-red-500";
  //     break;
  // }
  // return color;
  return `mood-${mood}`;
};
