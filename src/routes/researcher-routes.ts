import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateResearcherController,
  makeDeleteResearcherController,
  makeFindResearcherByIdController,
  makeFindResearcherByUserIdController,
  makeFindResearchersController,
  makeUpdateResearcherController,
} from '../factories/controllers/researcher.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router: Router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createResearcherController } = makeCreateResearcherController()

    await createResearcherController.handle(req, res)
  },
)

router.get('/', async (req: Request, res: Response) => {
  const { findResearchersController } = makeFindResearchersController()

  await findResearchersController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findResearcherByIdController } = makeFindResearcherByIdController()

  await findResearcherByIdController.handle(req, res)
})

router.get('/user/:id', async (req: Request, res: Response) => {
  const { findResearcherByUserIdController } =
    makeFindResearcherByUserIdController()

  await findResearcherByUserIdController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { updateResearcherController } = makeUpdateResearcherController()

    await updateResearcherController.handle(req, res)
  },
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteResearcherController } = makeDeleteResearcherController()

    await deleteResearcherController.handle(req, res)
  },
)

export { router as researcherRoutes }
