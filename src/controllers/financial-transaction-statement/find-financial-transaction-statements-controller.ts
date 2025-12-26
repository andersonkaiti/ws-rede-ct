import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IFinancialTransactionStatementRepository } from '../../repositories/financial-transaction-statement/ifinancial-transaction-statement-repository.js'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findFinancialTransactionStatementSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindFinancialTransactionStatementsController {
  constructor(
    private readonly financialTransactionStatementRepository: IFinancialTransactionStatementRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { page, limit, ...filter } =
      findFinancialTransactionStatementSchema.parse(req.query)

    const offset = limit ? limit * page - limit : undefined

    const [statements, totalStatements] = await Promise.all([
      this.financialTransactionStatementRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),
      this.financialTransactionStatementRepository.count({
        filter: {},
      }),
    ])

    const totalPages = limit
      ? Math.max(Math.ceil(totalStatements / limit), 1)
      : 1

    res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      financialTransactionStatements: statements,
    })
  }
}
