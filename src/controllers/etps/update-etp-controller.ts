import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { ConflictError } from '../../errrors/conflict-error.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IETPRepository } from '../../repositories/etp/ietp-repository.d.ts'

extendZodWithOpenApi(z)

export const updateETPSchema = z.object({
  id: z.uuid(),
  code: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  notes: z.string().optional(),
  leaderId: z.uuid().optional(),
  deputyLeaderId: z.uuid().optional(),
  secretaryId: z.uuid().optional(),
  memberIds: z.array(z.uuid()).optional(),
})

export class UpdateETPController {
  constructor(private readonly etpRepository: IETPRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        id,
        code,
        title,
        description,
        notes,
        leaderId,
        deputyLeaderId,
        secretaryId,
        memberIds,
      } = updateETPSchema.parse({
        id: req.params.id,
        ...req.body,
      })

      const existingETP = await this.etpRepository.findById(id)

      if (!existingETP) {
        throw new NotFoundError('O ETP não existe.')
      }

      if (code) {
        const etpWithSameCode = await this.etpRepository.findByCode(code)

        if (etpWithSameCode && etpWithSameCode.id !== id) {
          throw new ConflictError('Já existe um ETP com este código.')
        }
      }

      await this.etpRepository.update({
        id,
        code,
        title,
        description,
        notes,
        leaderId,
        deputyLeaderId,
        secretaryId,
        memberIds,
      })

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
