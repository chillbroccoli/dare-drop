import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { env } from "./config/env";
import { APIRoutes } from "./constants/routes";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import streamerRoutes from "./modules/streamer/streamer.routes";
import { socket } from "./socket";
import { logger } from "./utils/logger";

const { PORT, HOST, CORS_ORIGIN } = env;

const corsSettings = {
  origin: CORS_ORIGIN,
  credentials: true,
};

const app = express();

app.use(cors(corsSettings));
app.use(express.json());

const server = createServer(app);
export const io = new Server(server, {
  cors: corsSettings,
});

app.use(APIRoutes.HEALTHCHECK, (req, res) => {
  res.status(200).json({ message: "OK" });
});
app.use(APIRoutes.STREAMERS, streamerRoutes);

app.use(notFound);
app.use(errorHandler);

server.listen(PORT, HOST, () => {
  logger.info(`Server running at http://${HOST}:${PORT} 🚀`);

  socket({ io });
});
