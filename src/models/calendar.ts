export enum Mood {
  DEFAULT = 0,
  AWESOME = 1,
  GOOD = 2,
  NEUTRAL = 3,
  BAD = 4,
  AWFUL = 5,
}

export interface Day {
  index: number;
  name: string;
  date: string;
  mood: Mood;
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
