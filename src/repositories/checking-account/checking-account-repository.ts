import type {
  Prisma,
  PrismaClient,
} from '../../../config/database/generated/client.ts'
import type {
  ICountCheckingAccountDTO,
  ICreateCheckingAccountDTO,
  IFindAllCheckingAccountDTO,
} from '../../dto/checking-account.d.ts'
import type { ICheckingAccountRepository } from './ichecking-account-repository.d.ts'

export class CheckingAccountRepository implements ICheckingAccountRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(account: ICreateCheckingAccountDTO) {
    await this.prisma.checkingAccount.create({
      data: account,
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { type, orderBy },
  }: IFindAllCheckingAccountDTO) {
    const where: Prisma.CheckingAccountWhereInput = {}

    if (type) {
      where.type = type
    }

    return await this.prisma.checkingAccount.findMany({
      where,
      orderBy: {
        updatedAt: orderBy,
      },
      skip: offset,
      take: limit,
    })
  }

  async findLatestByType(
    type: 'EXCLUSIVE_REDECT_USE' | 'EVENTS' | 'COLLOQUIUM',
  ) {
    return await this.prisma.checkingAccount.findFirst({
      where: {
        type,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    })
  }

  async count({ filter: { type } }: ICountCheckingAccountDTO) {
    const where: Prisma.CheckingAccountWhereInput = {}

    if (type) {
      where.type = type
    }

    return await this.prisma.checkingAccount.count({
      where,
    })
  }
}
