import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateMeetingController,
  makeDeleteMeetingController,
  makeFindMeetingByIdController,
  makeFindMeetingByStatusController,
  makeFindMeetingsController,
  makeUpdateMeetingController,
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

router.get('/:id', async (req: Request, res: Response) => {
  const { findMeetingByIdController } = makeFindMeetingByIdController()

  await findMeetingByIdController.handle(req, res)
})

router.get('/status/:status', async (req: Request, res: Response) => {
  const { findMeetingByStatusController } = makeFindMeetingByStatusController()

  await findMeetingByStatusController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { updateMeetingController } = makeUpdateMeetingController()

    await updateMeetingController.handle(req, res)
  }
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteMeetingController } = makeDeleteMeetingController()

    await deleteMeetingController.handle(req, res)
  }
)

export { router as meetingRoutes }
