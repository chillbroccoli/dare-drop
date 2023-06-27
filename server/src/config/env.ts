import zennv from "zennv";
import { z } from "zod";

export const env = zennv({
  dotenv: true,
  schema: z.object({
    PORT: z.number().default(4000),
    HOST: z.string().default("0.0.0.0"),
    CORS_ORIGIN: z.string(),
    DATABASE_URL: z.string(),
  }),
});
