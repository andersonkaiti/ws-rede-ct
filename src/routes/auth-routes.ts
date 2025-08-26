import { type Request, type Response, Router } from 'express'
import { makeClerkAuthController } from '../factories/controllers/clerk.factory.ts'
import { clerkMiddleware } from '../middlewares/clerk.ts'

const router = Router()

router.get('/', clerkMiddleware, async (req: Request, res: Response) => {
  const { clerkAuthController } = makeClerkAuthController()

  await clerkAuthController.handle(req, res)
})

export { router as authRoutes }
