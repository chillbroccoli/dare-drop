import { Streamer } from "@/lib/types/streamer.types";

export function StreamerDetails({ streamer }: { streamer: Streamer }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-2 gap-4 p-2 border border-indigo-600 rounded-md md:grid-cols-10">
        <div className="overflow-hidden rounded-md col-span-full md:col-span-3">
          <img
            src={streamer.imageUrl}
            alt={streamer.name}
            className="w-full h-full"
          />
        </div>

        <div className="space-y-3 md:py-2 col-span-full md:col-span-7">
          <h4 className="text-3xl font-semibold">{streamer.name}</h4>
          <p className="text-sm font-light leading-6 text-gray-200">
            {streamer.description}
          </p>
        </div>
      </div>
    </div>
  );
}
