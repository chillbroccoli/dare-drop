import { Server, Socket } from "socket.io";

import { logger } from "./utils/logger";

export function socket({ io }: { io: Server }) {
  logger.info("Sockets enabled");

  io.on("connection", (socket: Socket) => {
    logger.info(`User connected: ${socket.id}`);
  });
}
