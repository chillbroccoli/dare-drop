import { z } from "zod";

import { streamerSchema, voteResponseSchema } from "../schemas/streamer.schema";

export type Streamer = z.infer<typeof streamerSchema>;

export type GetAllStreamersResponse = {
  streamers: Streamer[];
};

export type CreateStreamerResponse = {
  streamer: Streamer;
};

export type GetOneStreamerResponse = CreateStreamerResponse;

export type VoteResponse = z.infer<typeof voteResponseSchema>;
