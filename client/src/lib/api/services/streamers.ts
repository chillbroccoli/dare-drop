import { MutationOptions, useMutation, useQuery } from "@tanstack/react-query";
import { UseQueryOptions } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { APIRoutes } from "@/lib/constants/routes";
import { CreateStreamerInput, VoteInput } from "@/lib/schemas/streamer.schema";
import {
  CreateStreamerResponse,
  GetAllStreamersResponse,
  GetOneStreamerResponse,
  VoteResponse,
} from "@/lib/types/streamer.types";

import { Fetcher, RequestError } from "../Fetcher";

export const streamers = {
  useAll: (
    options?: UseQueryOptions<GetAllStreamersResponse, RequestError>
  ) => {
    return useQuery<GetAllStreamersResponse, RequestError>(
      [QUERY_KEYS.ALL_STREAMERS],
      async () => {
        const { json } = await Fetcher.get(APIRoutes.STREAMERS);

        return json as GetAllStreamersResponse;
      },
      options
    );
  },

  useOne: (
    streamerId: string,
    options?: UseQueryOptions<GetOneStreamerResponse, RequestError>
  ) => {
    return useQuery<GetOneStreamerResponse, RequestError>(
      [QUERY_KEYS.ALL_STREAMERS],
      async () => {
        const { json } = await Fetcher.get([
          APIRoutes.STREAMER,
          { id: streamerId },
        ]);

        return json as GetOneStreamerResponse;
      },
      options
    );
  },

  useCreateOne: (
    options?: MutationOptions<
      CreateStreamerResponse,
      RequestError,
      CreateStreamerInput
    >
  ) => {
    return useMutation(async (body: CreateStreamerInput) => {
      const { json } = await Fetcher.post(APIRoutes.STREAMERS, {
        body,
      });

      return json as CreateStreamerResponse;
    }, options);
  },

  useVote: (
    streamerId: string,
    options?: MutationOptions<VoteResponse, RequestError, VoteInput>
  ) => {
    return useMutation(async (body: VoteInput) => {
      const { json } = await Fetcher.put(
        [APIRoutes.STREAMER_VOTE, { id: streamerId }],
        {
          body,
        }
      );

      return json as VoteResponse;
    }, options);
  },
};
