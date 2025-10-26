import type { PrismaClient } from '@prisma/client'
import type { ICreateETPDTO } from '../../dto/etp.d.ts'
import type { IETPRepository } from './ietp-repository.d.ts'

export class ETPRepository implements IETPRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(etp: ICreateETPDTO) {
    const { leaderId, deputyLeaderId, secretaryId, memberIds, ...etpData } = etp

    return await this.prisma.$transaction(async (tx) => {
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

      return createdETP
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
}
