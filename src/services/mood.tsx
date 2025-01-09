import { db } from "@/lib/firebase";
import { Day, Month, Mood, updateDateFields } from "@/models/calendar";
import {
  eachDayOfInterval,
  endOfDay,
  endOfYear,
  format,
  startOfDay,
  startOfYear,
} from "date-fns";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

const collectionRef = collection(db, "days");

export const getAllDaysFromYear = async (uid: string, year: number) => {
  try {
    const days = await getDays(uid);
    const allDays = generateYearDays(year);

    // Merge existing days into the complete set
    const completeDays = allDays.map((day) => {
      const existingDay = days.find((d) => d.date === day.date);
      return existingDay || day;
    });

    // Group days into months
    const months: Month[] = Array.from({ length: 12 }, (_, index) => {
      const monthIndex = index + 1;
      const monthDays = completeDays.filter((day) =>
        format(day.date, "yyyy-MM-dd").startsWith(
          `${year}-${String(monthIndex).padStart(2, "0")}`
        )
      );

      return {
        index: monthIndex,
        name: format(new Date(year, index, 1), "MMMM"),
        days: monthDays,
      };
    });

    return months;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getDays = async (uid: string): Promise<Day[]> => {
  try {
    let days: Day[] = [];
    const qry = query(collectionRef, where("userId", "==", uid));
    const snapshot = await getDocs(qry);
    if (!snapshot.empty) {
      days = snapshot.docs.map((doc) => {
        const day = {
          id: doc.id,
          index: 0,
          name: "",
          date: doc.data().date.toDate(),
          mood: doc.data().mood,
        };
        return updateDateFields(day);
      });
    }
    return days;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getMood = async (date: Date) => {
  const dayQuery = query(
    collectionRef,
    where("date", ">=", startOfDay(date)),
    where("date", "<=", endOfDay(date)),
    limit(1)
  );

  try {
    const snapshot = await getDocs(dayQuery);
    if (snapshot.empty) return Mood.DEFAULT;
    const data = snapshot.docs[0].data();
    if (!data) return Mood.DEFAULT;
    return data.mood as Mood;
  } catch (err) {
    console.error(err);
  }
};

export const getDayId = async (date: Date) => {
  const dayQuery = query(
    collectionRef,
    where("date", ">=", startOfDay(date)),
    where("date", "<=", endOfDay(date)),
    limit(1)
  );

  try {
    const snapshot = await getDocs(dayQuery);
    if (!snapshot.empty) return snapshot.docs[0].id;
  } catch (err) {
    console.error(err);
  }
};

export const addOrUpdateMoods = async (days: Day[]) => {
  try {
    const batch = writeBatch(db);
    for (const day of days) {
      const dayId = await getDayId(day.date);
      var ref = doc(collection(db, "days"));
      if (dayId)
        batch.update(doc(db, "days", dayId), {
          date: day.date,
          mood: day.mood,
        });
      else batch.set(ref, { date: day.date, mood: day.mood });
    }
    batch.commit();
  } catch (err) {
    throw err;
  }
};

// Helper function to generate a complete year of days
const generateYearDays = (year: number): Day[] => {
  const startDate = startOfYear(new Date(year, 0, 1));
  const endDate = endOfYear(new Date(year, 0, 1));
  const allDates = eachDayOfInterval({ start: startDate, end: endDate });

  return allDates.map((date) => {
    return {
      id: "",
      index: parseInt(format(date, "d"), 10),
      name: format(date, "EEEE"),
      date: date,
      mood: Mood.DEFAULT,
    };
  });
};
