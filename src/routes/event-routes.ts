import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateEventController,
  makeDeleteEventController,
  makeFindEventByIdController,
  makeFindEventsController,
  makeUpdateEventController,
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

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { updateEventController } = makeUpdateEventController()

    await updateEventController.handle(req, res)
  }
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteEventController } = makeDeleteEventController()

    await deleteEventController.handle(req, res)
  }
)

export { router as eventRoutes }
