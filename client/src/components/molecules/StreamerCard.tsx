import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { api } from "@/lib/api";
import { Routing } from "@/lib/api/routing";
import { EVENTS } from "@/lib/constants/events";
import { PLATFORMS_OPTIONS } from "@/lib/constants/platform";
import { ClientRoutes } from "@/lib/constants/routes";
import { STORAGE_KEYS } from "@/lib/constants/storage-keys";
import { VOTE_TYPE } from "@/lib/constants/vote";
import { useSocket } from "@/lib/contexts/socket.context";
import { cn } from "@/lib/helpers/cn";
import { generateUserId } from "@/lib/helpers/generateUserId";
import { updateCache } from "@/lib/helpers/updateCache";
import { Streamer } from "@/lib/types/streamer.types";

import { Button } from "../ui/Button";

export function StreamerCard({ streamer }: { streamer: Streamer }) {
  const { socket } = useSocket();

  const client = useQueryClient();

  const { mutate, isLoading } = api.streamers.useVote(streamer.id);

  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID) || generateUserId();
  const platform = PLATFORMS_OPTIONS.find(
    (platform) => platform.value === streamer.platform
  );
  const linkHref = Routing.getInterpolatedRoute([
    ClientRoutes.STREAMER_DETAILS,
    { id: streamer.id },
  ]);

  const upvotesCount = streamer.votes.filter(
    (vote) => vote.type === VOTE_TYPE.UPVOTE
  ).length;
  const downvotesCount = streamer.votes.filter(
    (vote) => vote.type === VOTE_TYPE.DOWNVOTE
  ).length;
  const currentUserVote = streamer.votes.find((vote) => vote.userId === userId);
  const hasUpvoted = currentUserVote?.type === VOTE_TYPE.UPVOTE;
  const hasDownvoted = currentUserVote?.type === VOTE_TYPE.DOWNVOTE;

  const handleUpvote = () => {
    mutate({ type: VOTE_TYPE.UPVOTE, userId });
  };

  const handleDownvote = () => {
    mutate({ type: VOTE_TYPE.DOWNVOTE, userId });
  };

  useEffect(() => {
    socket.on(EVENTS.STREAMER.VOTE, (newVote) => {
      updateCache(client, newVote);
    });

    return () => {
      socket.off(EVENTS.STREAMER.VOTE);
    };
  }, []);

  return (
    <div className="flex flex-col col-span-1 text-center transition-colors duration-200 ease-in-out border divide-y divide-indigo-400 rounded-lg shadow-xl bg-zinc-700 border-indigo-600/50 hover:bg-zinc-700/80">
      <Link to={linkHref}>
        <div className="flex flex-col flex-1 p-8">
          <img
            className="flex-shrink-0 w-40 h-40 mx-auto border rounded-full border-indigo-600/90"
            src={streamer.imageUrl}
            alt={streamer.name}
          />
          <h3 className="mt-6 text-2xl font-medium text-gray-200">
            {streamer.name}
          </h3>
          <h5 className="mt-2 text-sm font-semibold text-indigo-400">
            {platform?.label}
          </h5>
        </div>
      </Link>
      <div>
        <div className="flex -mt-px divide-x divide-indigo-400">
          <Button
            className={cn("space-x-2", hasUpvoted && "text-orange-400")}
            disabled={isLoading}
            onClick={handleUpvote}
            fullWidth
            round="none"
          >
            <IconArrowUp className="w-5 h-5" aria-hidden="true" />
            <span className="sr-only">Upvote</span>
            <span>{upvotesCount}</span>
          </Button>
          <Button
            className={cn("space-x-2", hasDownvoted && "text-purple-400")}
            disabled={isLoading}
            onClick={handleDownvote}
            fullWidth
            round="none"
          >
            <IconArrowDown className="w-5 h-5" aria-hidden="true" />
            <span className="sr-only">Downvote</span>
            <span>{downvotesCount}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
