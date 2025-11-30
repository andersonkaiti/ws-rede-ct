import type { Course, PrismaClient } from '@prisma/client'
import type { ICreateCourseDTO, IUpdateCourseDTO } from '../../dto/course.ts'
import type { ICourseRepository } from './icourse-repository.ts'

export class CourseRepository implements ICourseRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create({
    title,
    imageUrl,
    coordinatorId,
    email,
    instructorIds,
    scheduledAt,
    location,
    registrationLink,
    description,
  }: ICreateCourseDTO): Promise<Course> {
    return await this.prisma.course.create({
      data: {
        title,
        imageUrl,
        coordinatorId,
        email,
        scheduledAt,
        location,
        registrationLink,
        description,
        instructors: {
          connect: instructorIds?.map((id) => ({
            id,
          })),
        },
      },
    })
  }

  async update({
    id,
    title,
    imageUrl,
    coordinatorId,
    email,
    instructorIds,
    scheduledAt,
    location,
    registrationLink,
    description,
  }: IUpdateCourseDTO): Promise<void> {
    if (instructorIds !== undefined) {
      await this.prisma.course.update({
        where: { id },
        data: {
          instructors: {
            set: [],
          },
        },
      })
    }

    await this.prisma.course.update({
      where: {
        id,
      },
      data: {
        title,
        imageUrl,
        coordinatorId,
        email,
        scheduledAt,
        location,
        registrationLink,
        description,
        ...(instructorIds?.length > 0 && {
          instructors: {
            connect: instructorIds.map((instructorId: string) => ({
              id: instructorId,
            })),
          },
        }),
      },
    })
  }
}
