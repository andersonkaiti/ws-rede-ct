import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateScientificJournalController,
  makeFindScientificJournalsController,
} from '../factories/controllers/scientific-journal.factory.ts'
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
    const { createScientificJournalController } =
      makeCreateScientificJournalController()

    await createScientificJournalController.handle(req, res)
  }
)

router.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findScientificJournalsController } =
      makeFindScientificJournalsController()

    await findScientificJournalsController.handle(req, res)
  }
)

export { router as scientificJournalRoutes }
