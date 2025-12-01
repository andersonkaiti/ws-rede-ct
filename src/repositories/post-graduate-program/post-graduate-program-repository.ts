import type { PostGraduateProgram, Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountPostGraduateProgramsDTO,
  ICreatePostGraduateProgramDTO,
  IFindPostGraduateProgramsDTO,
  IUpdatePostGraduateProgramDTO,
} from '../../dto/post-graduate-program.ts'
import type { IPostGraduateProgramRepository } from './ipost-graduate-program-repository.ts'

export class PostGraduateProgramRepository
  implements IPostGraduateProgramRepository
{
  constructor(private readonly prisma: PrismaClient) {}

  async create({
    title,
    imageUrl,
    description,
    startDate,
    endDate,
    contact,
    registrationLink,
  }: ICreatePostGraduateProgramDTO): Promise<PostGraduateProgram> {
    return await this.prisma.postGraduateProgram.create({
      data: {
        title,
        imageUrl,
        description,
        startDate,
        endDate,
        contact,
        registrationLink,
      },
    })
  }

  async find({
    pagination: { offset, limit },
    filter: { description, orderBy, title, contact },
  }: IFindPostGraduateProgramsDTO): Promise<PostGraduateProgram[]> {
    const where: Prisma.PostGraduateProgramWhereInput = {}

    const or: Prisma.PostGraduateProgramWhereInput[] = []

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

    if (contact) {
      or.push({
        contact: {
          contains: contact,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.postGraduateProgram.findMany({
      where,
      orderBy: {
        updatedAt: orderBy,
      },
      skip: offset,
      take: limit,
    })
  }

  async update({
    id,
    title,
    imageUrl,
    description,
    startDate,
    endDate,
    contact,
    registrationLink,
  }: IUpdatePostGraduateProgramDTO): Promise<void> {
    await this.prisma.postGraduateProgram.update({
      where: {
        id,
      },
      data: {
        title,
        imageUrl,
        description,
        startDate,
        endDate,
        contact,
        registrationLink,
      },
    })
  }

  async count({
    filter: { description, title, contact },
  }: ICountPostGraduateProgramsDTO): Promise<number> {
    const where: Prisma.PostGraduateProgramWhereInput = {}

    const or: Prisma.PostGraduateProgramWhereInput[] = []

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

    if (contact) {
      or.push({
        contact: {
          contains: contact,
          mode: 'insensitive',
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.postGraduateProgram.count({
      where,
    })
  }
}
