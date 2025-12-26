import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IFinancialTransactionStatementRepository } from '../../repositories/financial-transaction-statement/ifinancial-transaction-statement-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const deleteFinancialTransactionStatementSchema = z.object({
  id: z.uuid(),
})

export class DeleteFinancialTransactionStatementController {
  constructor(
    private readonly financialTransactionStatementRepository: IFinancialTransactionStatementRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = deleteFinancialTransactionStatementSchema.parse({
      id: req.params.id,
    })

    const existingStatement =
      await this.financialTransactionStatementRepository.findById(id)

    if (!existingStatement) {
      throw new NotFoundError('O extrato de transação financeira não existe.')
    }

    if (existingStatement.documentUrl) {
      await this.firebaseStorageService.deleteFile({
        fileUrl: existingStatement.documentUrl,
      })
    }

    await this.financialTransactionStatementRepository.deleteById(id)

    return res.sendStatus(HttpStatus.OK)
  }
}
