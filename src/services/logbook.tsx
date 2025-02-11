import { db } from "@/lib/firebase";
import { Logbook } from "@/models/logbook";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { createDefaultMarkers } from "./marker";

const collectionRef = collection(db, "logbooks");
const timeout = 5000; //3s

export const getLogbooks = async (uid: string) => {
  try {
    return await getAllLogbooks(uid);
  } catch (err) {
    throw err;
  }
};

export const getLogbookById = async (lid: string) => {
  const controller = new AbortController();
  const fetchDoc = new Promise<Logbook | undefined>(async (resolve, reject) => {
    try {
      const docRef = doc(db, "logbooks", lid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists())
        resolve({ ...snapshot.data(), id: snapshot.id } as Logbook);
      else resolve(undefined);
    } catch (err) {
      reject(err);
    }
  });

  const timeoutPromise = new Promise<Logbook | undefined>((_, reject) => {
    setTimeout(() => {
      controller.abort();
      reject(new Error("Request timed out. Try again later."));
    }, timeout);
  });

  return Promise.race([fetchDoc, timeoutPromise]);
};

export const getDefaultLogbook = async (uid: string) => {
  const controller = new AbortController();

  const fetchDoc = new Promise<Logbook>(async (resolve, reject) => {
    try {
      const qry = query(
        collectionRef,
        where("userId", "==", uid),
        where("isDefault", "==", true),
        limit(1)
      );
      const snapshot = await getDocs(qry);
      if (!snapshot.empty) {
        const result = snapshot.docs[0].data();
        resolve({
          id: snapshot.docs[0].id,
          name: result.name,
          iconUnicode: "",
          isDefault: result.isDefault,
        });
      }
      // resolve(logbook);
    } catch (err) {
      reject(err);
    }
  });

  const timeoutPromise = new Promise<Logbook>((_, reject) => {
    setTimeout(() => {
      controller.abort();
      reject(new Error("Request timed out. Try again later."));
    }, timeout);
  });

  return Promise.race([fetchDoc, timeoutPromise]);
};

export const getLogbookByName = async (uid: string, name?: string) => {
  try {
    const logbooks = await getAllLogbooks(uid, name);
    return logbooks.length > 0 ? logbooks[0] : undefined;
  } catch (err) {
    throw err;
  }
};

export const hasAnyLogbooks = async (uid: string) => {
  try {
    const qry = query(collectionRef, where("userId", "==", uid));
    const snapshot = await getDocs(qry);
    return !snapshot.empty;
  } catch (err) {
    throw err;
  }
};

export const createLogbook = async (uid: string, data: Logbook) => {
  try {
    await doesLogbookExists(uid, data.name);
    await addDoc(collectionRef, {
      userId: uid,
      name: data.name,
      iconUnicode: data.iconUnicode,
    });
  } catch (err) {
    throw err;
  }
};

export const createDefaultLogbook = async (uid: string) => {
  try {
    const batch = writeBatch(db);

    const name = "Mood";
    const ref = doc(collection(db, "logbooks"));

    await doesLogbookExists(uid, name);

    batch.set(ref, {
      userId: uid,
      name,
      isDefault: true,
    });

    await createDefaultMarkers(ref.id);

    batch.commit();
  } catch (err) {
    throw err;
  }
};

export const doesLogbookExists = async (uid: string, name: string) => {
  const exists = !!(await getLogbookByName(uid, name));
  if (exists) throw new Error("Logbook already exists.");
};

export const getLogbookByIdOrDefault = async (uid: string, lid?: string) => {
  try {
    let logbook;
    if (lid) logbook = await getLogbookById(lid);
    if (!logbook) logbook = await getDefaultLogbook(uid);
    return logbook;
  } catch (error) {
    throw error;
  }
};

const getAllLogbooks = async (
  uid: string,
  name?: string
): Promise<Logbook[]> => {
  const controller = new AbortController();

  const fetchDoc = new Promise<Logbook[]>(async (resolve, reject) => {
    try {
      let logbooks: Logbook[] = [];
      let qry = query(collectionRef, where("userId", "==", uid));
      if (name) qry = query(qry, where("name", "==", name));

      const snapshot = await getDocs(qry);
      if (!snapshot.empty) {
        logbooks = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
            iconUnicode: "",
            isDefault: doc.data().isDefault,
          };
        });
      }
      resolve(logbooks);
    } catch (err) {
      reject(err);
    }
  });

  const timeoutPromise = new Promise<Logbook[]>((_, reject) => {
    setTimeout(() => {
      controller.abort();
      reject(new Error("Request timed out. Try again later."));
    }, timeout);
  });

  return Promise.race([fetchDoc, timeoutPromise]);
};
