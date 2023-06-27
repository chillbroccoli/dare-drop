import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

import { ClientRoutes } from "@/lib/constants/routes";

export function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h1 className="text-3xl font-medium">{error?.status}</h1>
      <p className="text-lg font-light">{error?.data}</p>
      <p>
        <i className="text-red-400">{error?.statusText}</i>
      </p>
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
