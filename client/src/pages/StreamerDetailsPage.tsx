import { useParams } from "react-router-dom";

import { DisplayError } from "@/components/atoms/DisplayError";
import { Loader } from "@/components/atoms/Loader";
import { MainLayout } from "@/components/layouts/MainLayout";
import { StreamerDetails } from "@/components/molecules/StreamerDetails";
import { api } from "@/lib/api";

export function StreamerDetailsPage() {
  const { id } = useParams() as { id: string };

  const { data, isLoading, error } = api.streamers.useOne(id);

  if (isLoading) {
    return <Loader />;
  }

  if (error?.status && error.status === 404) {
    return (
      <MainLayout>
        <DisplayError
          title="Streamer not found"
          description="Streamer couldn't be found"
          status={error.status}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {data?.streamer ? <StreamerDetails streamer={data.streamer} /> : null}
    </MainLayout>
  );
}
