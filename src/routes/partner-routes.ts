import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreatePartnerController,
  makeDeletePartnerController,
  makeFindPartnerByIdController,
  makeFindPartnersController,
  makeUpdatePartnerController,
} from '../factories/controllers/partner.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('logo'),
  async (req: Request, res: Response) => {
    const { createPartnerController } = makeCreatePartnerController()

    await createPartnerController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findPartnersController } = makeFindPartnersController()

  await findPartnersController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findPartnerByIdController } = makeFindPartnerByIdController()

  await findPartnerByIdController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('logo'),
  async (req: Request, res: Response) => {
    const { updatePartnerController } = makeUpdatePartnerController()

    await updatePartnerController.handle(req, res)
  }
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deletePartnerController } = makeDeletePartnerController()

    await deletePartnerController.handle(req, res)
  }
)

export { router as partnerRoutes }
