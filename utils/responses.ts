import MetadataDTO from "../dto/MetadataDTO";
import { Response } from "express";

export const Responses = {
  success: (
    res: Response,
    message: string,
    data?: any,
    metadata?: MetadataDTO
  ) => res.status(200).json({ message, data, metadata }),

  created: (res: Response, message: string, data?: any) =>
    res.status(201).json({ message, data }),
};
