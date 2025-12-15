import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { Degree, Seniority } from '../../../config/database/generated/enums.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { ConflictError } from '../../errors/conflict-error.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { IResearcherRepository } from '../../repositories/researcher/iresearcher-repository.d.ts'

extendZodWithOpenApi(z)

export const createResearcherSchema = z.object({
  registrationNumber: z.string(),
  mainEtps: z.string().optional(),
  formations: z.string().optional(),
  degrees: z.array(z.enum(Degree)),
  occupations: z.string(),
  seniority: z.enum(Seniority),
  institutions: z.string(),
  biography: z.string().optional(),
  userId: z.string(),
})

export class CreateResearcherController {
  constructor(private readonly researcherRepository: IResearcherRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        registrationNumber,
        mainEtps,
        formations,
        degrees,
        occupations,
        seniority,
        institutions,
        biography,
        userId,
      } = createResearcherSchema.parse(req.body)

      const existingResearcher =
        await this.researcherRepository.findByRegistrationNumber(
          registrationNumber,
        )
      if (existingResearcher) {
        throw new ConflictError(
          'Já existe um pesquisador cadastrado com este número de registro.',
        )
      }

      const existingUserResearcher =
        await this.researcherRepository.findByUserId(userId)

      if (existingUserResearcher) {
        throw new ConflictError('Usuário já possui um perfil de pesquisador.')
      }

      await this.researcherRepository.create({
        registrationNumber,
        mainEtps,
        formations,
        degrees,
        occupations,
        seniority,
        institutions,
        biography,
        userId,
      })

      return res.sendStatus(HttpStatus.CREATED)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
