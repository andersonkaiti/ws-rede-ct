import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IPostGraduateProgramRepository } from '../../repositories/post-graduate-program/ipost-graduate-program-repository.ts'

extendZodWithOpenApi(z)

export const findPostGraduateProgramByIdSchema = z.object({
  id: z.uuid(),
})

export class FindPostGraduateProgramByIdController {
  constructor(
    private readonly postGraduateProgramRepository: IPostGraduateProgramRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findPostGraduateProgramByIdSchema.parse({
        id: req.params.id,
      })

      const postGraduateProgram =
        await this.postGraduateProgramRepository.findById(id)

      if (!postGraduateProgram) {
        throw new NotFoundError('Programa de pós-graduação não encontrado.')
      }

      return res.status(HttpStatus.OK).json(postGraduateProgram)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
