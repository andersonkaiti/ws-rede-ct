import type { Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountETPsDTO,
  ICreateETPDTO,
  IFindAllETPsDTO,
  IUpdateETPDTO,
} from '../../dto/etp.d.ts'
import type { IETPRepository } from './ietp-repository.d.ts'

export class ETPRepository implements IETPRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(etp: ICreateETPDTO) {
    const { leaderId, deputyLeaderId, secretaryId, memberIds, ...etpData } = etp

    await this.prisma.$transaction(async (tx) => {
      const createdETP = await tx.eTP.create({
        data: etpData,
      })

      await tx.eTPLeader.create({
        data: {
          etpId: createdETP.id,
          researcherId: leaderId,
        },
      })

      await tx.eTPDeputy.create({
        data: {
          etpId: createdETP.id,
          researcherId: deputyLeaderId,
        },
      })

      await tx.eTPSecretary.create({
        data: {
          etpId: createdETP.id,
          researcherId: secretaryId,
        },
      })

      await tx.eTP.update({
        where: {
          id: createdETP.id,
        },
        data: {
          members: {
            connect: memberIds.map((id) => ({
              id,
            })),
          },
        },
      })
    })
  }

  async update(etp: IUpdateETPDTO) {
    const { leaderId, deputyLeaderId, secretaryId, memberIds, ...etpData } = etp

    await this.prisma.$transaction(async (tx) => {
      await tx.eTP.update({
        where: {
          id: etp.id,
        },
        data: etpData,
      })

      await this.updateLeader(tx, etp.id, leaderId)
      await this.updateDeputyLeader(tx, etp.id, deputyLeaderId)
      await this.updateSecretary(tx, etp.id, secretaryId)
      await this.updateMembers(tx, etp.id, memberIds)
    })
  }

  private async updateLeader(
    tx: Prisma.TransactionClient,
    etpId: string,
    leaderId?: string
  ) {
    if (leaderId === undefined) {
      return
    }

    await tx.eTPLeader.deleteMany({
      where: {
        etpId,
      },
    })

    if (leaderId) {
      await tx.eTPLeader.create({
        data: {
          etpId,
          researcherId: leaderId,
        },
      })
    }
  }

  private async updateDeputyLeader(
    tx: Prisma.TransactionClient,
    etpId: string,
    deputyLeaderId?: string
  ) {
    if (deputyLeaderId === undefined) {
      return
    }

    await tx.eTPDeputy.deleteMany({
      where: {
        etpId,
      },
    })
    if (deputyLeaderId) {
      await tx.eTPDeputy.create({
        data: {
          etpId,
          researcherId: deputyLeaderId,
        },
      })
    }
  }

  private async updateSecretary(
    tx: Prisma.TransactionClient,
    etpId: string,
    secretaryId?: string
  ) {
    if (secretaryId === undefined) {
      return
    }

    await tx.eTPSecretary.deleteMany({
      where: {
        etpId,
      },
    })
    if (secretaryId) {
      await tx.eTPSecretary.create({
        data: {
          etpId,
          researcherId: secretaryId,
        },
      })
    }
  }

  private async updateMembers(
    tx: Prisma.TransactionClient,
    etpId: string,
    memberIds?: string[]
  ) {
    if (memberIds === undefined) {
      return
    }

    await tx.eTP.update({
      where: {
        id: etpId,
      },
      data: {
        members: {
          set: memberIds.map((id) => ({
            id,
          })),
        },
      },
    })
  }

  async deleteById(id: string) {
    await this.prisma.eTP.delete({
      where: {
        id,
      },
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { code, title, description, notes, orderBy },
  }: IFindAllETPsDTO) {
    const where: Prisma.ETPWhereInput = {}

    const or: Prisma.ETPWhereInput[] = []

    if (code) {
      or.push({
        code: {
          contains: code,
          mode: 'insensitive',
        },
      })
    }

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

    if (notes) {
      or.push({
        notes: {
          contains: notes,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.eTP.findMany({
      where,
      include: {
        leader: {
          include: {
            researcher: {
              include: {
                user: {
                  omit: {
                    passwordHash: true,
                  },
                },
              },
            },
          },
        },
        deputyLeader: {
          include: {
            researcher: {
              include: {
                user: {
                  omit: {
                    passwordHash: true,
                  },
                },
              },
            },
          },
        },
        secretary: {
          include: {
            researcher: {
              include: {
                user: {
                  omit: {
                    passwordHash: true,
                  },
                },
              },
            },
          },
        },
        members: {
          include: {
            user: {
              omit: {
                passwordHash: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: orderBy,
      },
      skip: offset,
      take: limit,
    })
  }

  async findById(id: string) {
    return await this.prisma.eTP.findFirst({
      where: {
        id,
      },
      include: {
        leader: {
          include: {
            researcher: {
              include: {
                user: {
                  omit: {
                    passwordHash: true,
                  },
                },
              },
            },
          },
        },
        deputyLeader: {
          include: {
            researcher: {
              include: {
                user: {
                  omit: {
                    passwordHash: true,
                  },
                },
              },
            },
          },
        },
        secretary: {
          include: {
            researcher: {
              include: {
                user: {
                  omit: {
                    passwordHash: true,
                  },
                },
              },
            },
          },
        },
        members: {
          include: {
            user: {
              omit: {
                passwordHash: true,
              },
            },
          },
        },
      },
    })
  }

  async findByCode(code: string) {
    return await this.prisma.eTP.findFirst({
      where: {
        code,
      },
      include: {
        leader: {
          include: {
            researcher: {
              include: {
                user: {
                  omit: {
                    passwordHash: true,
                  },
                },
              },
            },
          },
        },
        deputyLeader: {
          include: {
            researcher: {
              include: {
                user: {
                  omit: {
                    passwordHash: true,
                  },
                },
              },
            },
          },
        },
        secretary: {
          include: {
            researcher: {
              include: {
                user: {
                  omit: {
                    passwordHash: true,
                  },
                },
              },
            },
          },
        },
        members: {
          include: {
            user: {
              omit: {
                passwordHash: true,
              },
            },
          },
        },
      },
    })
  }

  async count({ filter: { code, title, description, notes } }: ICountETPsDTO) {
    const etpWhere: Prisma.ETPWhereInput = {}

    const or: Prisma.ETPWhereInput[] = []

    if (code) {
      or.push({
        code: {
          contains: code,
          mode: 'insensitive',
        },
      })
    }

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

    if (notes) {
      or.push({
        notes: {
          contains: notes,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      etpWhere.OR = or
    }

    return await this.prisma.eTP.count({
      where: etpWhere,
    })
  }
}
