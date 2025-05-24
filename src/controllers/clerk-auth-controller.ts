import { type Request, type Response } from "express";

interface ClerkAuth {
  userId: string;
  [key: string]: any;
}

export class ClerkAuthController {
  async handle(req: Request, res: Response) {
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
  }
}
