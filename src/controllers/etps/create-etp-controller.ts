import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { ConflictError } from '../../errors/conflict-error.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { IETPRepository } from '../../repositories/etp/ietp-repository.d.ts'

extendZodWithOpenApi(z)

export const createETPSchema = z.object({
  code: z.string(),
  title: z.string(),
  description: z.string().optional(),
  notes: z.string().optional(),
  leaderId: z.uuid(),
  deputyLeaderId: z.uuid(),
  secretaryId: z.uuid(),
  memberIds: z.array(z.uuid()),
})

export class CreateETPController {
  constructor(private readonly etpRepository: IETPRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        code,
        title,
        description,
        notes,
        leaderId,
        deputyLeaderId,
        secretaryId,
        memberIds,
      } = createETPSchema.parse(req.body)

      const existingETP = await this.etpRepository.findByCode(code)

      if (existingETP) {
        throw new ConflictError('Já existe um ETP cadastrado com este código.')
      }

      await this.etpRepository.create({
        code,
        title,
        description,
        notes,
        leaderId,
        deputyLeaderId,
        secretaryId,
        memberIds,
      })

      return res.sendStatus(HttpStatus.CREATED)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
