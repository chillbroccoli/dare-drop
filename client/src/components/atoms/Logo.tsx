import { Link } from "react-router-dom";

import { ClientRoutes } from "@/lib/constants/routes";

export function Logo() {
  return (
    <Link to={ClientRoutes.HOME}>
      <div className="p-2 italic font-extrabold tracking-widest text-center text-indigo-100 uppercase bg-indigo-600 rounded-md shadow-xl">
        <p>Switch</p>
      </div>
    </Link>
  );
}
