import { QueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "../constants/query-keys";
import {
  GetAllStreamersResponse,
  Streamer,
  VoteResponse,
} from "../types/streamer.types";

export function updateCache(client: QueryClient, newVote: VoteResponse) {
  client.setQueryData(
    [QUERY_KEYS.ALL_STREAMERS],
    (oldData: GetAllStreamersResponse | undefined) => {
      const data = oldData;

      if (!data) return;

      const streamers = data?.streamers || [];

      const newStreamers = streamers.map((streamer: Streamer) => {
        if (streamer.id !== newVote.streamerId) return streamer;

        const votes = streamer.votes.filter(
          (vote) => vote.userId !== newVote.userId
        );

        const newVotes = !newVote.type ? [...votes] : [...votes, newVote];

        return {
          ...streamer,
          votes: newVotes,
        };
      });

      return {
        ...data,
        streamers: newStreamers,
      };
    }
  );
}
