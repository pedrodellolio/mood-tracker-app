import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
} from "date-fns";
import { Day, Month, Mood, Week } from "../models/calendar";

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

// Creates an array of months based on the year parameter. Each month contains an array of days.
export const getMonthsWithDays = (year: number) => {
  const monthsWithDays: Month[] = [];

  for (let month = 0; month < 12; month++) {
    const startOfMonthDate = startOfMonth(new Date(year, month));
    const endOfMonthDate = endOfMonth(new Date(year, month));

    // Get all the days of the current month
    const daysInMonth: Day[] = eachDayOfInterval({
      start: startOfMonthDate,
      end: endOfMonthDate,
    }).map((d, i) => {
      return {
        index: i + 1,
        name: format(d, "EEEE"),
        date: format(d, "yyyy-MM-dd"),
        mood: Mood.DEFAULT,
      };
    });

    // Add the current month and its days to the result array
    monthsWithDays.push({
      index: month + 1,
      name: format(startOfMonthDate, "MMMM"), // Month name
      days: daysInMonth,
    });
  }

  return monthsWithDays;
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
  return `mood-${mood}`;
};
