import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import { z } from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { ITeamRepository } from '../../repositories/team/iteam-repository.ts'

extendZodWithOpenApi(z)

export const findTeamByIdSchema = z.object({
  id: z.uuid(),
})

export class FindTeamByIdController {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findTeamByIdSchema.parse(req.params)

      const team = await this.teamRepository.findById(id)

      res.status(HttpStatus.OK).json(team)
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
