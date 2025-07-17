import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
