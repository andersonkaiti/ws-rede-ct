import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeFindCertificationsController,
  makeRegisterCertificationController,
} from '../factories/controllers/certification.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/:user_id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.single('certification'),
  async (req: Request, res: Response) => {
    const { registerCertificationController } =
      makeRegisterCertificationController()

    await registerCertificationController.handle(req, res)
  }
)

router.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findCertificationsController } = makeFindCertificationsController()

    await findCertificationsController.handle(req, res)
  }
)
export { router as certificationRoutes }
