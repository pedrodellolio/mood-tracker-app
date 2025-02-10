import { format } from "date-fns";

export enum Mood {
  DEFAULT = 0,
  AWESOME = 1,
  GOOD = 2,
  NEUTRAL = 3,
  BAD = 4,
  AWFUL = 5,
}

export interface Day {
  id: string;
  // logbookId: string;
  index: number; // 1 - 31
  name: string; // Sunday - Saturday
  date: Date;
  mood: Mood;
  changed: boolean;
}

export interface Month {
  index: number;
  name: string;
  days: Day[];
}

export interface Week {
  index: number;
  days: Day[];
}

export enum Layout {
  MONTH,
  YEAR,
}

export const updateDateFields = (day: Day) => {
  const dayIndex = parseInt(format(day.date, "d"), 10); // 1-31
  const dayName = format(day.date, "EEEE"); // Sunday-Saturday

  return {
    ...day,
    index: dayIndex,
    name: dayName,
  };
};
