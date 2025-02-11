import { db } from "@/lib/firebase";
import { Mood } from "@/models/calendar";
import { Marker, MarkerDTO } from "@/models/marker";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";

const collectionRef = collection(db, "markers");
const timeout = 5000; //3s

const DEFAULT_MARKERS: MarkerDTO[] = [
  { name: "Awesome", color: Mood.AWESOME },
  { name: "Good", color: Mood.GOOD },
  { name: "Neutral", color: Mood.NEUTRAL },
  { name: "Bad", color: Mood.BAD },
  { name: "Awful", color: Mood.AWFUL },
];

export const createMarker = async (data: MarkerDTO, lid?: string) => {
  try {
    if (!lid) throw new Error("Marker not found");
    await addDoc(collectionRef, {
      logbookId: lid,
      name: data.name,
      color: data.color,
      createdAt: Timestamp.now(),
    });
  } catch (err) {
    throw err;
  }
};

export const deleteMarker = async (mid: string) => {
  try {
    await deleteDoc(doc(db, "markers", mid));
  } catch (err) {
    throw err;
  }
};

//TO-DO: The insert order is not guaranteed, i'll need a index field instead of createdAt
//TO-DO: On login, if there is no logbook created it will create a default one but is not redirecting to it
//TO-DO: Fix sidebar animation (is odd using edge)
//TO-DO: Implement a way to delete logbooks
//TO-DO: Saving changes is not setting the color correctly
export const createDefaultMarkers = async (lid: string) => {
  try {
    const batch = writeBatch(db);
    for (const marker of DEFAULT_MARKERS) {
      const ref = doc(collection(db, "markers"));
      batch.set(ref, {
        logbookId: lid,
        name: marker.name,
        createdAt: Timestamp.now(),
        color: marker.color,
      });
    }
    batch.commit();
  } catch (err) {
    throw err;
  }
};

export const getMarkers = async (lid: string) => {
  try {
    return await getAllMarkers(lid);
  } catch (err) {
    throw err;
  }
};

const getAllMarkers = async (lid: string, name?: string): Promise<Marker[]> => {
  const controller = new AbortController();

  const fetchDoc = new Promise<Marker[]>(async (resolve, reject) => {
    try {
      let markers: Marker[] = [];
      let qry = query(collectionRef, where("logbookId", "==", lid));
      if (name) qry = query(qry, where("name", "==", name));

      const snapshot = await getDocs(qry);
      if (!snapshot.empty) {
        markers = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
            color: doc.data().color,
            createdAt: doc.data().createdAt,
            logbookId: doc.data().logbookId,
          };
        });
      }
      resolve(
        markers.sort((a, b) => a.createdAt.toMillis() - b.createdAt.toMillis())
      );
    } catch (err) {
      reject(err);
    }
  });

  const timeoutPromise = new Promise<Marker[]>((_, reject) => {
    setTimeout(() => {
      controller.abort();
      reject(new Error("Request timed out. Try again later."));
    }, timeout);
  });

  return Promise.race([fetchDoc, timeoutPromise]);
};
