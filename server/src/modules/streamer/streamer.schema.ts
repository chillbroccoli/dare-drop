import { z } from "zod";

import { PLATFORM } from "../../constants/platform";
import { VOTE_TYPE } from "../../constants/vote";

const createStreamerCore = {
  body: z.object({
    userId: z.string().nonempty("User id is required"),
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
  }),
};

const voteCore = {
  body: z.object({
    userId: z.string().nonempty("User id is required"),
    type: z.enum([VOTE_TYPE.UPVOTE, VOTE_TYPE.DOWNVOTE]),
  }),
};

export const createStreamerSchema = z.object({
  ...createStreamerCore,
});

export const voteSchema = z.object({
  ...voteCore,
});

export type CreateStreamerInput = z.infer<typeof createStreamerSchema>;
export type VoteInput = z.infer<typeof voteSchema>;
