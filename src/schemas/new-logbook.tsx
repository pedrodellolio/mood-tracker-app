import { z } from "zod";

export const logbookSchema = z.object({
  name: z.string(),
});

export type NewLogbookFormData = z.infer<typeof logbookSchema>;
