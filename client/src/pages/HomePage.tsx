import { useEffect } from "react";

import { Loader } from "@/components/atoms/Loader";
import { MainLayout } from "@/components/layouts/MainLayout";
import { StreamerCard } from "@/components/molecules/StreamerCard";
import { api } from "@/lib/api";
import { EVENTS } from "@/lib/constants/events";
import { useSocket } from "@/lib/contexts/socket.context";

export function HomePage() {
  const { socket } = useSocket();

  const { data, isLoading, refetch } = api.streamers.useAll();

  useEffect(() => {
    socket.on(EVENTS.STREAMER.ADDED, () => {
      refetch();
    });

    return () => {
      socket.off(EVENTS.STREAMER.ADDED);
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.streamers?.length
          ? data.streamers.map((streamer) => (
              <StreamerCard key={streamer.id} streamer={streamer} />
            ))
          : null}
      </div>
    </MainLayout>
  );
}
