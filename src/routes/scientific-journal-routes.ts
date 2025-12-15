import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateScientificJournalController,
  makeDeleteScientificJournalController,
  makeFindScientificJournalByIdController,
  makeFindScientificJournalsController,
  makeUpdateScientificJournalController,
} from '../factories/controllers/scientific-journal.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router: Router = Router()

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
  },
)

router.get('/', async (req: Request, res: Response) => {
  const { findScientificJournalsController } =
    makeFindScientificJournalsController()

  await findScientificJournalsController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findScientificJournalByIdController } =
    makeFindScientificJournalByIdController()

  await findScientificJournalByIdController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.single('logo'),
  async (req: Request, res: Response) => {
    const { updateScientificJournalController } =
      makeUpdateScientificJournalController()

    await updateScientificJournalController.handle(req, res)
  },
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteScientificJournalController } =
      makeDeleteScientificJournalController()

    await deleteScientificJournalController.handle(req, res)
  },
)

export { router as scientificJournalRoutes }
