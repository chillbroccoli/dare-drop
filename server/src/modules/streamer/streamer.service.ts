import { FALLBACK_IMAGE } from "../../constants";
import { prisma } from "../../utils/prisma";
import { CreateStreamerInput, VoteInput } from "./streamer.schema";

export const StreamerService = {
  findAll: async () => {
    const streamers = await prisma.streamer.findMany({
      include: {
        votes: true,
      },
    });

    return streamers;
  },

  findOne: async (id: string) => {
    const streamer = await prisma.streamer.findUnique({
      where: {
        id,
      },
      include: {
        votes: true,
      },
    });

    return streamer;
  },

  createOne: async (data: CreateStreamerInput["body"]) => {
    const streamer = await prisma.streamer.create({
      data: {
        ...data,
        imageUrl: data?.imageUrl ? data.imageUrl : FALLBACK_IMAGE,
      },
    });

    return streamer;
  },

  vote: async ({
    streamerId,
    userId,
    type,
  }: VoteInput["body"] & { streamerId: string }) => {
    const streamer = await prisma.streamer.findUnique({
      where: {
        id: streamerId,
      },
    });

    if (!streamer) {
      throw new Error("Streamer not found");
    }

    const vote = await prisma.vote.findUnique({
      where: {
        streamerId_userId: {
          streamerId,
          userId,
        },
      },
    });

    // check if the user has already voted
    if (vote) {
      // if the user has already voted and the type is the same as the previous one, delete the vote
      if (vote.type === type) {
        await prisma.vote.delete({
          where: {
            id: vote.id,
          },
        });

        return {
          ...vote,
          type: null,
        };
      }

      // if the user has already voted and the type is different, switch from upvote to downvote or vice versa
      await prisma.vote.update({
        where: {
          id: vote.id,
        },
        data: {
          type,
        },
      });

      return {
        ...vote,
        type,
      };
    }

    // if the user has not voted yet, create a new vote
    const newVote = await prisma.vote.create({
      data: {
        type,
        streamer: {
          connect: {
            id: streamerId,
          },
        },
        userId: userId,
      },
    });

    return {
      ...newVote,
      type,
    };
  },
};
