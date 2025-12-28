import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import type { IFinancialTransactionStatementRepository } from '../../repositories/financial-transaction-statement/ifinancial-transaction-statement-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'
import { validatePdfFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const createFinancialTransactionStatementSchema = z.object({
  document: z.any().refine((file) =>
    validatePdfFile({
      file,
    }),
  ),
})

export class CreateFinancialTransactionStatementController {
  constructor(
    private readonly financialTransactionStatementRepository: IFinancialTransactionStatementRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { document } = createFinancialTransactionStatementSchema.parse({
      document: req.file,
    })

    const statement = await this.financialTransactionStatementRepository.create(
      {
        documentUrl: '',
      },
    )

    const documentUrl = await this.firebaseStorageService.uploadFile({
      file: document,
      id: statement.id,
      folder: PATHS.FINANCIAL_TRANSACTION_STATEMENT,
    })

    await this.financialTransactionStatementRepository.update({
      id: statement.id,
      documentUrl,
    })

    return res.sendStatus(HttpStatus.CREATED)
  }
}
