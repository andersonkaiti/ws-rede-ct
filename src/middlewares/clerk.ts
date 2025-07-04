import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { type Request, type Response, type NextFunction } from "express";

const clerkAuth = ClerkExpressWithAuth();

export const clerkMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return clerkAuth(req as any, res as any, next);
};
