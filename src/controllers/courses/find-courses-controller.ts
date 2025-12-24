import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ICourseRepository } from '../../repositories/course/icourse-repository.ts'

const DEFAULT_PAGE = 1

extendZodWithOpenApi(z)

export const findCoursesControllerSchema = z.object({
  page: z.coerce.number().min(1).default(DEFAULT_PAGE),
  limit: z.coerce.number().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  coordinator: z.string().optional(),
  orderBy: z.enum(['asc', 'desc']).default('desc'),
})

export class FindCoursesController {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async handle(req: Request, res: Response) {
    const { limit, page, ...filter } = findCoursesControllerSchema.parse(
      req.query,
    )

    const offset = limit ? limit * page - limit : undefined

    const [courses, totalCourses] = await Promise.all([
      this.courseRepository.find({
        pagination: {
          offset,
          limit,
        },
        filter,
      }),

      this.courseRepository.count({
        filter,
      }),
    ])

    const totalPages = limit ? Math.max(Math.ceil(totalCourses / limit), 1) : 1

    return res.status(HttpStatus.OK).json({
      page,
      totalPages,
      offset,
      limit,
      courses,
    })
  }
}
