import { z } from "zod";

import { PLATFORM } from "../constants/platform";
import { VOTE_TYPE } from "../constants/vote";

const streamerCore = {
  id: z.string(),
  votes: z.array(
    z.object({
      id: z.string(),
      streamerId: z.string(),
      userId: z.string(),
      type: z.enum([VOTE_TYPE.UPVOTE, VOTE_TYPE.DOWNVOTE]),
    })
  ),
};

const createStreamerCore = {
  name: z.string().nonempty("Name is required"),
  platform: z.enum([
    PLATFORM.TWITCH,
    PLATFORM.YOUTUBE,
    PLATFORM.KICK,
    PLATFORM.TIKTOK,
    PLATFORM.RUMBLE,
  ]),
  description: z.string().nonempty("Description is required"),
  imageUrl: z.string().optional(),
};

const voteCore = {
  userId: z.string().nonempty("User id is required"),
  type: z.enum([VOTE_TYPE.UPVOTE, VOTE_TYPE.DOWNVOTE]),
};

export const streamerSchema = z.object({
  ...streamerCore,
  ...createStreamerCore,
});

export const createStreamerFormSchema = z.object({
  ...createStreamerCore,
});

export const createStreamerSchema = z.object({
  userId: z.string().nonempty("User id is required"),
  ...createStreamerCore,
});

export const voteSchema = z.object({
  ...voteCore,
});

export const voteResponseSchema = z.object({
  id: z.string(),
  streamerId: z.string(),
  ...voteCore,
});

export type CreateStreamerFormInput = z.infer<typeof createStreamerFormSchema>;
export type CreateStreamerInput = z.infer<typeof createStreamerSchema>;
export type VoteInput = z.infer<typeof voteSchema>;
