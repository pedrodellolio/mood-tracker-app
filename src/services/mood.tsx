import { db } from "@/lib/firebase";
import { Day, Month, Mood, updateDateFields } from "@/models/calendar";
import {
  eachDayOfInterval,
  endOfDay,
  endOfYear,
  format,
  isEqual,
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
const timeout = 5000; //3s

export const getAllDaysFromYear = async (
  uid: string,
  lid: string,
  year: number
) => {
  try {
    const days = await getDays(uid, lid);
    const allDays = generateYearDays(year);

    // Merge existing days into the complete set
    const completeDays = allDays.map((day) => {
      const existingDay = days.find((d) => isEqual(d.date, day.date));
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
        days: [...monthDays], // Ensure a new array reference
      };
    });

    return months;
  } catch (err) {
    throw err;
  }
};

export const getDays = async (uid: string, lid: string): Promise<Day[]> => {
  const controller = new AbortController();

  const fetchDoc = new Promise<Day[]>(async (resolve, reject) => {
    try {
      let days: Day[] = [];
      const qry = query(
        collectionRef,
        where("userId", "==", uid),
        where("logbookId", "==", lid)
      );
      const snapshot = await getDocs(qry);
      if (!snapshot.empty) {
        days = snapshot.docs.map((doc) => {
          const day = {
            id: doc.id,
            index: 0,
            name: "",
            date: doc.data().date.toDate(),
            mood: doc.data().mood,
            changed: false,
          };
          return updateDateFields(day);
        });
      }
      resolve(days);
    } catch (err) {
      reject(err);
    }
  });

  const timeoutPromise = new Promise<Day[]>((_, reject) => {
    setTimeout(() => {
      controller.abort();
      reject(new Error("Request timed out. Try again later."));
    }, timeout);
  });

  return Promise.race([fetchDoc, timeoutPromise]);
};

export const getDayId = async (uid: string, lid: string, date: Date) => {
  const dayQuery = query(
    collectionRef,
    where("date", ">=", startOfDay(date)),
    where("date", "<=", endOfDay(date)),
    where("userId", "==", uid),
    where("logbookId", "==", lid),
    limit(1)
  );

  try {
    const snapshot = await getDocs(dayQuery);
    if (!snapshot.empty) return snapshot.docs[0].id;
  } catch (err) {
    console.error(err);
  }
};

export const addOrUpdateMoods = async (
  uid: string,
  lid: string,
  days: Day[]
) => {
  try {
    const batch = writeBatch(db);
    for (const day of days) {
      const dayId = await getDayId(uid, lid, day.date);
      const ref = dayId
        ? doc(db, "days", dayId) // Reference to the existing document
        : doc(collection(db, "days")); // Create a new document reference

      const dayObj = {
        date: day.date,
        mood: day.mood,
        userId: uid,
        logbookId: lid,
      };

      if (dayId) {
        if (day.mood == Mood.DEFAULT) batch.delete(ref);
        else {
          batch.update(ref, dayObj);
        }
      } else batch.set(ref, dayObj);
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
      changed: false,
    };
  });
};
