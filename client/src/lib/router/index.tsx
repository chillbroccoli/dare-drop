import { createBrowserRouter } from "react-router-dom";

import { ClientRoutes } from "@/lib/constants/routes";
import { ErrorPage } from "@/pages/ErrorPage";
import { HomePage } from "@/pages/HomePage";
import { StreamerDetailsPage } from "@/pages/StreamerDetailsPage";

export const router = createBrowserRouter([
  {
    path: ClientRoutes.HOME,
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: ClientRoutes.STREAMER_DETAILS,
    element: <StreamerDetailsPage />,
  },
]);
