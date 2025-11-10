import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateMeetingController,
  makeFindMeetingsController,
} from '../factories/controllers/meeting.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createMeetingController } = makeCreateMeetingController()

    await createMeetingController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findMeetingsController } = makeFindMeetingsController()

  await findMeetingsController.handle(req, res)
})

export { router as meetingRoutes }
