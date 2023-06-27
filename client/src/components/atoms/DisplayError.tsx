import { Link } from "react-router-dom";

import { ClientRoutes } from "@/lib/constants/routes";

export function DisplayError({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center">
      <p className="text-base font-semibold text-indigo-600">{status}</p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-200 sm:text-5xl">
        {title}
      </h2>
      <p className="mt-6 text-base leading-7 text-gray-100">{description}</p>
      <div className="flex items-center justify-center mt-10 gap-x-6">
        <Link
          to={ClientRoutes.HOME}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
