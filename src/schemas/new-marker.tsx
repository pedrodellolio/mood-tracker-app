import { Mood } from "@/models/calendar";
import { z } from "zod";

export const markerSchema = z.object({
  name: z.string(),
  color: z.nativeEnum(Mood),
});

export type NewMarkerFormData = z.infer<typeof markerSchema>;
