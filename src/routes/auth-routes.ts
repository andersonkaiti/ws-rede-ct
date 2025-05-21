// src/routes/auth-routes.ts
import { Router, type Request, type Response } from "express";
import { clerkMiddleware } from "../clerk.ts";

const router = Router();

interface ClerkAuth {
  userId: string;
  [key: string]: any;
}

router.get("/", clerkMiddleware, (req: Request, res: Response): void => {
  const auth = (req as { auth?: ClerkAuth }).auth;

  if (!auth || !auth.userId) {
    res.status(401).json({ message: "Não autenticado" });
    return; 
  }
  // Se autenticado, envia resposta com status 200
  res.status(200).json({
    message: "Usuário autenticado com Clerk",
    userId: auth.userId,
  });
});

export { router as AuthRouter };
