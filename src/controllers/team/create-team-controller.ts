import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { ITeamRepository } from '../../repositories/team/iteam-repository.d.ts'

extendZodWithOpenApi(z)

export const createTeamSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  members: z.array(
    z.object({
      role: z.string().min(1),
      user: z.object({
        id: z.string(),
      }),
    })
  ),
})

export class CreateTeamController {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { name, type, members } = createTeamSchema.parse(req.body)

      await this.teamRepository.create({
        name,
        type,
        members,
      })

      res.status(HttpStatus.CREATED).json()
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
