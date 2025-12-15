import type {
  Prisma,
  PrismaClient,
} from '../../../config/database/generated/client.ts'
import type {
  ICreateUserDTO,
  IFindUsersDTO,
  IUpdateUserDTO,
} from '../../dto/user.d.ts'
import type { IUserRepository } from './iuser-repository.d.ts'

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(user: ICreateUserDTO) {
    await this.prisma.user.create({
      data: user,
    })
  }

  async update(user: IUpdateUserDTO) {
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lattesUrl: user.lattesUrl ?? null,
        orcid: user.orcid ?? null,
        phone: user.phone ?? null,
        avatarUrl: user.avatarUrl ?? null,
        ...(user.role && {
          role: user.role,
        }),
      },
    })
  }

  async deleteById(id: string) {
    await this.prisma.user.delete({
      where: { id },
    })
  }

  async find({
    pagination,
    filter: { emailAddress, name, phone, lattesUrl, orcid },
  }: IFindUsersDTO) {
    const where: Prisma.UserWhereInput = {}

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    if (emailAddress) {
      where.emailAddress = {
        contains: emailAddress,
        mode: 'insensitive',
      }
    }

    if (phone) {
      where.phone = {
        contains: phone,
        mode: 'insensitive',
      }
    }

    if (lattesUrl) {
      where.lattesUrl = {
        contains: lattesUrl,
        mode: 'insensitive',
      }
    }

    if (orcid) {
      where.orcid = {
        contains: orcid,
        mode: 'insensitive',
      }
    }

    return await this.prisma.user.findMany({
      where,
      omit: {
        passwordHash: true,
      },
      ...(pagination && {
        skip: pagination.offset,
        take: pagination.limit,
      }),
    })
  }

  async count({
    filter: { emailAddress, name, phone, lattesUrl, orcid },
  }: {
    filter: {
      name?: string
      emailAddress?: string
      phone?: string
      lattesUrl?: string
      orcid?: string
    }
  }) {
    const where: Prisma.UserWhereInput = {}

    if (name) {
      where.name = {
        contains: name,
        mode: 'insensitive',
      }
    }

    if (emailAddress) {
      where.emailAddress = {
        contains: emailAddress,
        mode: 'insensitive',
      }
    }

    if (phone) {
      where.phone = {
        contains: phone,
        mode: 'insensitive',
      }
    }

    if (lattesUrl) {
      where.lattesUrl = {
        contains: lattesUrl,
        mode: 'insensitive',
      }
    }

    if (orcid) {
      where.orcid = {
        contains: orcid,
        mode: 'insensitive',
      }
    }

    return await this.prisma.user.count({
      where,
    })
  }

  async findByEmail(emailAddress: string) {
    return await this.prisma.user.findFirst({
      where: {
        emailAddress,
      },
    })
  }

  async findById(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
      omit: {
        passwordHash: true,
      },
    })
  }
}
