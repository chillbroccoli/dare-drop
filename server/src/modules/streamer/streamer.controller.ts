import { NextFunction, Request, Response } from "express";

import { EVENTS } from "../../constants/events";
import { ParamsWithId } from "../../interfaces/ParamsWithId";
import { io } from "../../main";
import { CreateStreamerInput, VoteInput } from "./streamer.schema";
import { StreamerService } from "./streamer.service";

export const StreamerController = {
  getAllStreamers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const streamers = await StreamerService.findAll();

      res.status(200).json({ streamers });
    } catch (error) {
      next(error);
    }
  },

  getOneStreamer: async (
    req: Request<ParamsWithId["params"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    try {
      const streamer = await StreamerService.findOne(id);

      if (!streamer) {
        res.status(404);
        throw new Error("Streamer not found");
      }

      res.status(200).json({ streamer });
    } catch (error) {
      next(error);
    }
  },

  createStreamer: async (
    req: Request<{}, {}, CreateStreamerInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;

    try {
      const streamer = await StreamerService.createOne(body);

      io.emit(EVENTS.STREAMER.ADDED, streamer);

      res.status(201).json({ streamer });
    } catch (error) {
      next(error);
    }
  },

  vote: async (
    req: Request<ParamsWithId["params"], {}, VoteInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { userId, type } = req.body;

    try {
      const vote = await StreamerService.vote({
        streamerId: id,
        userId,
        type,
      });

      io.emit(EVENTS.STREAMER.VOTE, vote);

      res.status(200).json({ vote });
    } catch (error) {
      next(error);
    }
  },
};
