import type { Course, Prisma, PrismaClient } from '@prisma/client'
import type {
  ICountCoursesDTO,
  ICreateCourseDTO,
  IFindCoursesDTO,
  IUpdateCourseDTO,
} from '../../dto/course.ts'
import type {
  CourseWithInstructorsAndCoordinator,
  ICourseRepository,
} from './icourse-repository.ts'

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

  async find({
    pagination: { offset, limit },
    filter: { description, orderBy, title, coordinator },
  }: IFindCoursesDTO): Promise<CourseWithInstructorsAndCoordinator[]> {
    const where: Prisma.CourseWhereInput = {}

    const or: Prisma.CourseWhereInput[] = []

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

    if (coordinator) {
      or.push({
        coordinator: {
          name: {
            contains: coordinator,
            mode: 'insensitive',
          },
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.course.findMany({
      where,
      include: {
        coordinator: {
          omit: {
            passwordHash: true,
          },
        },
        instructors: {
          omit: {
            passwordHash: true,
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

  async findById(
    id: string
  ): Promise<CourseWithInstructorsAndCoordinator | null> {
    return await this.prisma.course.findFirst({
      where: {
        id,
      },
      include: {
        coordinator: {
          omit: {
            passwordHash: true,
          },
        },
        instructors: {
          omit: {
            passwordHash: true,
          },
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

  async count({
    filter: { description, title, coordinator },
  }: ICountCoursesDTO): Promise<number> {
    const where: Prisma.CourseWhereInput = {}

    const or: Prisma.CourseWhereInput[] = []

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

    if (coordinator) {
      or.push({
        coordinator: {
          name: {
            contains: coordinator,
            mode: 'insensitive',
          },
        },
      })
    }

    if (or.length > 0) {
      where.OR = or
    }

    return await this.prisma.course.count({
      where,
    })
  }
}
