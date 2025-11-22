import type { NextFunction, Request, Response } from "express";

export function catchAsync(
  cb: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    cb(req, res, next).catch((err) => next(err));
  };
}
