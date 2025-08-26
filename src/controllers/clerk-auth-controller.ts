import type { Request, Response } from 'express'
import { HttpStatus } from '../@types/status-code.ts'

interface ClerkAuth {
  userId: string
  [key: string]: unknown
}

export class ClerkAuthController {
  handle(req: Request, res: Response) {
    const auth = (req as { auth?: ClerkAuth }).auth

    if (!auth?.userId) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Não autenticado' })
      return
    }

    res.status(HttpStatus.OK).json({
      message: 'Usuário autenticado com Clerk',
      userId: auth.userId,
    })
  }
}
