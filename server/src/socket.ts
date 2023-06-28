import { Server, Socket } from "socket.io";

import { EVENTS } from "./constants/events";
import { logger } from "./utils/logger";

export function socket({ io }: { io: Server }) {
  logger.info("Sockets enabled");

  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`User connected: ${socket.id}`);
  });
}
