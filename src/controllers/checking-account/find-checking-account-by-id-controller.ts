import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { ICheckingAccountRepository } from '../../repositories/checking-account/ichecking-account-repository.d.ts'

extendZodWithOpenApi(z)

export const findCheckingAccountByIdSchema = z.object({
  id: z.uuid(),
})

export class FindCheckingAccountByIdController {
  constructor(
    private readonly checkingAccountRepository: ICheckingAccountRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = findCheckingAccountByIdSchema.parse(req.params)

    const account = await this.checkingAccountRepository.findById(id)

    if (!account) {
      throw new NotFoundError('Conta corrente não encontrada.')
    }

    return res.status(HttpStatus.OK).json({
      ...account,
      balance: account.balanceInCents / 100,
    })
  }
}
