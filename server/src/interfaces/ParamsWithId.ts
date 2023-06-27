import { z } from "zod";

export const paramsWithIdSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export type ParamsWithId = z.infer<typeof paramsWithIdSchema>;
