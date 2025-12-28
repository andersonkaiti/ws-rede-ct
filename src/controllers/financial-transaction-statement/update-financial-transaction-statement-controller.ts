import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IFinancialTransactionStatementRepository } from '../../repositories/financial-transaction-statement/ifinancial-transaction-statement-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'
import { validatePdfFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const updateFinancialTransactionStatementSchema = z.object({
  id: z.uuid(),
  document: z
    .any()
    .refine((file) =>
      validatePdfFile({
        file,
        optional: true,
      }),
    )
    .optional(),
})

export class UpdateFinancialTransactionStatementController {
  constructor(
    private readonly financialTransactionStatementRepository: IFinancialTransactionStatementRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { id, document } = updateFinancialTransactionStatementSchema.parse({
      id: req.params.id,
      document: req.file,
    })

    const existingStatement =
      await this.financialTransactionStatementRepository.findById(id)

    if (!existingStatement) {
      throw new NotFoundError('O extrato de transação financeira não existe.')
    }

    let documentUrl = existingStatement.documentUrl

    if (document) {
      if (existingStatement.documentUrl) {
        await this.firebaseStorageService.deleteFile({
          fileUrl: existingStatement.documentUrl,
        })
      }

      documentUrl = await this.firebaseStorageService.uploadFile({
        file: document,
        id,
        folder: PATHS.FINANCIAL_TRANSACTION_STATEMENT,
      })
    }

    await this.financialTransactionStatementRepository.update({
      id,
      documentUrl: documentUrl ?? undefined,
    })

    return res.sendStatus(HttpStatus.OK)
  }
}
