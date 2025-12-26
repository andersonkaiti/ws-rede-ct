import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ICheckingAccountRepository } from '../../repositories/checking-account/ichecking-account-repository.d.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findCheckingAccountsSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  type: z.enum(['EXCLUSIVE_REDECT_USE', 'EVENTS', 'COLLOQUIUM']).optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindCheckingAccountsController {
  constructor(
    private readonly checkingAccountRepository: ICheckingAccountRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { page, limit, type, orderBy } = findCheckingAccountsSchema.parse(
      req.query,
    )

    const offset = limit ? limit * page - limit : undefined

    const [accounts, totalCount] = await Promise.all([
      this.checkingAccountRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter: {
          type,
          orderBy,
        },
      }),
      this.checkingAccountRepository.count({
        filter: {
          type,
        },
      }),
    ])

    const totalPages = limit ? Math.max(Math.ceil(totalCount / limit), 1) : 1

    return res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      checkingAccounts: accounts.map((account) => ({
        ...account,
        balance: account.balanceInCents / 100,
      })),
    })
  }
}
