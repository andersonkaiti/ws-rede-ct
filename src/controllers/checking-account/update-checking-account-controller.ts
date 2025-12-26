import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { ICheckingAccountRepository } from '../../repositories/checking-account/ichecking-account-repository.d.ts'

extendZodWithOpenApi(z)

export const updateCheckingAccountSchema = z.object({
  id: z.uuid(),
  type: z.enum(['EXCLUSIVE_REDECT_USE', 'EVENTS', 'COLLOQUIUM']).optional(),
  balance: z.number().positive('O saldo deve ser positivo').optional(),
})

export class UpdateCheckingAccountController {
  constructor(
    private readonly checkingAccountRepository: ICheckingAccountRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id, type, balance } = updateCheckingAccountSchema.parse({
      ...req.body,
      ...req.params,
    })

    const existingAccount = await this.checkingAccountRepository.findById(id)

    if (!existingAccount) {
      throw new NotFoundError('Conta corrente não encontrada.')
    }

    const balanceInCents = balance ? balance * 100 : undefined

    await this.checkingAccountRepository.update({
      id,
      type,
      balanceInCents,
    })

    return res.status(HttpStatus.OK).send()
  }
}
