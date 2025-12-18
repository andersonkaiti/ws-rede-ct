import type {
  InMemoriamRole,
  Prisma,
  PrismaClient,
} from '../../../config/database/generated/client.ts'
import type {
  ICountInMemoriamDTO,
  ICreateInMemoriamDTO,
  IFindAllInMemoriamDTO,
  IUpdateInMemoriamDTO,
} from '../../dto/in-memoriam.d.ts'
import type { IInMemoriamRepository } from './iin-memoriam-repository.d.ts'

export class InMemoriamRepository implements IInMemoriamRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(inMemoriam: ICreateInMemoriamDTO) {
    return await this.prisma.inMemoriam.create({
      data: inMemoriam,
    })
  }

  async update(inMemoriam: IUpdateInMemoriamDTO) {
    await this.prisma.inMemoriam.update({
      where: {
        id: inMemoriam.id,
      },
      data: inMemoriam,
    })
  }

  async deleteById(id: string) {
    await this.prisma.inMemoriam.delete({
      where: { id },
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { name, biography, role, orderBy },
  }: IFindAllInMemoriamDTO) {
    const where: Prisma.InMemoriamWhereInput = {}

    const or: Prisma.InMemoriamWhereInput[] = []

    if (role) {
      where.role = role
    }

    if (name) {
      or.push({
        name: {
          contains: name,
          mode: 'insensitive',
        },
      })
    }

    if (biography) {
      or.push({
        biography: {
          contains: biography,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.inMemoriam.findMany({
      where,
      orderBy: {
        updatedAt: orderBy,
      },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.inMemoriam.findFirst({
      where: {
        id,
      },
    })
  }

  async findByRole(role: InMemoriamRole) {
    return await this.prisma.inMemoriam.findMany({
      where: {
        role,
      },
    })
  }

  async count({ filter: { name, biography, role } }: ICountInMemoriamDTO) {
    const where: Prisma.InMemoriamWhereInput = {}

    const or: Prisma.InMemoriamWhereInput[] = []

    if (role) {
      where.role = role
    }

    if (name) {
      or.push({
        name: {
          contains: name,
          mode: 'insensitive',
        },
      })
    }

    if (biography) {
      or.push({
        biography: {
          contains: biography,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.inMemoriam.count({
      where,
    })
  }
}
