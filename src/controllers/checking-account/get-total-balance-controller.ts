import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ICheckingAccountRepository } from '../../repositories/checking-account/ichecking-account-repository.d.ts'

extendZodWithOpenApi(z)

export class GetTotalBalanceController {
  constructor(
    private readonly checkingAccountRepository: ICheckingAccountRepository,
  ) {}

  async handle(_req: Request, res: Response) {
    const exclusiveRedectUse =
      await this.checkingAccountRepository.findLatestByType(
        'EXCLUSIVE_REDECT_USE',
      )
    const events =
      await this.checkingAccountRepository.findLatestByType('EVENTS')
    const colloquium =
      await this.checkingAccountRepository.findLatestByType('COLLOQUIUM')

    const totalBalanceInCents =
      (exclusiveRedectUse?.balanceInCents || 0) +
      (events?.balanceInCents || 0) +
      (colloquium?.balanceInCents || 0)

    const totalBalance = totalBalanceInCents / 100

    return res.status(HttpStatus.OK).json({
      totalBalance,
      totalBalanceInCents,
      accounts: {
        exclusiveRedectUse: exclusiveRedectUse
          ? {
              id: exclusiveRedectUse.id,
              balance: exclusiveRedectUse.balanceInCents / 100,
              balanceInCents: exclusiveRedectUse.balanceInCents,
              updatedAt: exclusiveRedectUse.updatedAt,
            }
          : null,
        events: events
          ? {
              id: events.id,
              balance: events.balanceInCents / 100,
              balanceInCents: events.balanceInCents,
              updatedAt: events.updatedAt,
            }
          : null,
        colloquium: colloquium
          ? {
              id: colloquium.id,
              balance: colloquium.balanceInCents / 100,
              balanceInCents: colloquium.balanceInCents,
              updatedAt: colloquium.updatedAt,
            }
          : null,
      },
    })
  }
}
