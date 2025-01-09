import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
