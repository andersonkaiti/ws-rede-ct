import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node'
import type { NextFunction, Request, Response } from 'express'

const clerkAuth = ClerkExpressWithAuth()

export const clerkMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return clerkAuth(
    req as unknown as Parameters<typeof clerkAuth>[0],
    res as unknown as Parameters<typeof clerkAuth>[1],
    next
  )
}
