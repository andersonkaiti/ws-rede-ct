import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import { z } from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { ITeamRepository } from '../../repositories/team/iteam-repository.d.ts'

extendZodWithOpenApi(z)

export const deleteTeamSchema = z.object({
  id: z.uuid(),
})

export class DeleteTeamController {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = deleteTeamSchema.parse(req.params)

      await this.teamRepository.delete(id)

      res.sendStatus(HttpStatus.OK)
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
