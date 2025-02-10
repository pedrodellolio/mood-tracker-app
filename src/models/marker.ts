import { Timestamp } from "firebase/firestore";
import { Mood } from "./calendar";

export interface MarkerDTO {
  name: string;
  color: Mood;
}

export interface Marker {
  id: string;
  name: string;
  color: Mood;
  createdAt: Timestamp;
  logbookId: string;
}
