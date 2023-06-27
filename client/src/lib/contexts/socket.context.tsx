import { createContext, useContext } from "react";
import io from "socket.io-client";

import { SOCKET_URL } from "../constants/socket";

const socket = io(SOCKET_URL);

const SocketContext = createContext({ socket });

export function SocketProvider({ children }: { children: React.ReactNode }) {
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}
