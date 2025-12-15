import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { ICourseRepository } from '../../repositories/course/icourse-repository.ts'

extendZodWithOpenApi(z)

export const findCourseByIdSchema = z.object({
  id: z.uuid(),
})

export class FindCourseByIdController {
  constructor(private readonly courseRepository: ICourseRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findCourseByIdSchema.parse({
        id: req.params.id,
      })

      const course = await this.courseRepository.findById(id)

      if (!course) {
        throw new NotFoundError('Curso não encontrado.')
      }

      return res.status(HttpStatus.OK).json(course)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
