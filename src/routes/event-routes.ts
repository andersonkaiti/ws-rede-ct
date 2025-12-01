import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateEventController,
  makeFindEventByIdController,
  makeFindEventsController,
} from '../factories/controllers/event.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { createEventController } = makeCreateEventController()

    await createEventController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findEventsController } = makeFindEventsController()

  await findEventsController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findEventByIdController } = makeFindEventByIdController()

  await findEventByIdController.handle(req, res)
})

export { router as eventRoutes }
