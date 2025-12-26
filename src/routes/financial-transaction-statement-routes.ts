import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateFinancialTransactionStatementController,
  makeFindFinancialTransactionStatementsController,
} from '../factories/controllers/financial-transaction-statement.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router: Router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.single('document'),
  async (req: Request, res: Response) => {
    const { createFinancialTransactionStatementController } =
      makeCreateFinancialTransactionStatementController()

    await createFinancialTransactionStatementController.handle(req, res)
  },
)

router.get('/', async (req: Request, res: Response) => {
  const { findFinancialTransactionStatementsController } =
    makeFindFinancialTransactionStatementsController()

  await findFinancialTransactionStatementsController.handle(req, res)
})

export { router as financialTransactionStatementRoutes }
