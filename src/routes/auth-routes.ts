import { Router, type Request, type Response } from "express";
import { clerkMiddleware } from "../middlewares/clerk.ts";
import { makeClerkAuthController } from "../factories/controllers/clerk.factory.ts";

const router = Router();

router.get("/", clerkMiddleware, async (req: Request, res: Response) => {
  const { clerkAuthController } = makeClerkAuthController();

  await clerkAuthController.handle(req, res);
});

export { router as authRoutes };
