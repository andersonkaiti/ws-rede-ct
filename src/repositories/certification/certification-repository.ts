import type { Certification, Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountCertificationsDTO,
  IFindByUserIdDTO,
  IFindCertificationsDTO,
  IRegisterCertificationDTO,
  IUpdateCertificationDTO,
} from '../../dto/certification.ts'
import type {
  CertificationWithUser,
  ICertificationRepository,
} from './icertification-repository.ts'

export class CertificationRepository implements ICertificationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async register({
    userId,
    title,
    description,
    certificationUrl,
  }: IRegisterCertificationDTO): Promise<void> {
    await this.prisma.certification.create({
      data: {
        title,
        description,
        certificationUrl,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
  }

  async find({
    pagination: { limit, offset },
    filter: { description, orderBy, title },
  }: IFindCertificationsDTO): Promise<CertificationWithUser[]> {
    const where: Prisma.CertificationWhereInput = {}

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      }
    }

    const or: Prisma.CertificationWhereInput[] = []

    if (description) {
      or.push({
        description: {
          contains: description,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.certification.findMany({
      where,
      include: {
        user: {
          omit: {
            passwordHash: true,
          },
        },
      },
      skip: offset,
      take: limit,
      orderBy: {
        updatedAt: orderBy,
      },
    })
  }

  async findById(id: string): Promise<Certification | null> {
    return await this.prisma.certification.findFirst({
      where: {
        id,
      },
    })
  }

  async findByUserId({
    pagination: { limit, offset },
    filter: { description, orderBy, title },
    userId,
  }: IFindByUserIdDTO): Promise<Certification[]> {
    const where: Prisma.CertificationWhereInput = {
      userId,
    }

    const or: Prisma.CertificationWhereInput[] = []

    if (title) {
      or.push({
        title: {
          contains: title,
          mode: 'insensitive',
        },
      })
    }

    if (description) {
      or.push({
        description: {
          contains: description,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.certification.findMany({
      where,
      include: {
        user: {
          omit: {
            passwordHash: true,
          },
        },
      },
      skip: offset,
      take: limit,
      orderBy: {
        updatedAt: orderBy,
      },
    })
  }

  async update({ id, ...data }: IUpdateCertificationDTO): Promise<void> {
    await this.prisma.certification.update({
      where: {
        id,
      },
      data,
    })
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.certification.delete({
      where: {
        id,
      },
    })
  }

  async count({
    filter: { description, title, userId },
  }: ICountCertificationsDTO): Promise<number> {
    const where: Prisma.CertificationWhereInput = {}

    if (title) {
      where.title = {
        contains: title,
        mode: 'insensitive',
      }
    }

    const or: Prisma.CertificationWhereInput[] = []

    if (description) {
      or.push({
        description: {
          contains: description,
          mode: 'insensitive',
        },
      })
    }

    if (userId) {
      or.push({
        userId,
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.certification.count({
      where,
    })
  }
}
