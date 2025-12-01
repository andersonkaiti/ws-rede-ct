import type { PostGraduateProgram, PrismaClient } from '@prisma/client'
import type {
  ICreatePostGraduateProgramDTO,
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
}
