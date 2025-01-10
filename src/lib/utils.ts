import { Month } from "@/models/calendar";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function areMonthsDifferent(monthsA: Month[], monthsB: Month[]) {
  // Check if the number of months is the same
  if (monthsA.length !== monthsB.length) {
    return true; // Different if the lengths don't match
  }

  // Iterate through each month
  for (let i = 0; i < monthsA.length; i++) {
    const monthA = monthsA[i];
    const monthB = monthsB[i];

    // Check if the number of days in the month is the same
    if (monthA.days.length !== monthB.days.length) {
      return true; // Different if the number of days doesn't match
    }

    // Iterate through each day
    for (let j = 0; j < monthA.days.length; j++) {
      const dayA = monthA.days[j];
      const dayB = monthB.days[j];

      // Compare the mood property
      if (dayA.mood !== dayB.mood) {
        return true; // Different if any mood doesn't match
      }
    }
  }

  return false; // No differences found
}

export function enumToArray<T extends Record<string, string | number>>(
  enumObj: T
) {
  return Object.keys(enumObj)
    .filter((item) => {
      return isNaN(Number(item));
    })
    .map((key) => ({
      key,
      value: enumObj[key],
    }));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
