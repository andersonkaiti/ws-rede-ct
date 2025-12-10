import { type NextFunction, type Request, type Response, Router } from 'express'
import { makeCreateResearchGroupController } from '../factories/controllers/research-group.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.single('logo'),
  async (req: Request, res: Response) => {
    const { createResearchGroupController } =
      makeCreateResearchGroupController()

    await createResearchGroupController.handle(req, res)
  }
)

export { router as researchGroupRoutes }
