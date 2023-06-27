import express from "express";

import { paramsWithIdSchema } from "../../interfaces/ParamsWithId";
import { validateSchema } from "../../middlewares/validateSchema";
import { StreamerController } from "./streamer.controller";
import { createStreamerSchema } from "./streamer.schema";

const router = express.Router();

router.get("/", StreamerController.getAllStreamers);
router.post(
  "/",
  validateSchema(createStreamerSchema),
  StreamerController.createStreamer
);
router.get(
  "/:id",
  validateSchema(paramsWithIdSchema),
  StreamerController.getOneStreamer
);
router.put("/:id/vote", StreamerController.vote);

export default router;
