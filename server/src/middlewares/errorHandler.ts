import { NextFunction, Request, Response } from "express";

import { logger } from "../utils/logger";
import { __PROD__ } from "./../constants";

type ErrorResponse = {
  message: string;
  stack?: string;
};

// I dunno why this is needed, but we actually need to add next, even if we do not use it...
// or the error handler breaks 💥
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  const errorResponse = {
    message: err.message,
    stack: __PROD__ ? "🥞" : err.stack,
  };
  res.json(errorResponse);
  logger.error(errorResponse);
};
