import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import { Degree, Seniority } from '@prisma/client'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { ConflictError } from '../../errrors/conflict-error.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IResearcherRepository } from '../../repositories/researcher/iresearcher-repository.d.ts'

extendZodWithOpenApi(z)

export const updateResearcherSchema = z.object({
  id: z.uuid(),
  registrationNumber: z.string().optional(),
  mainEtps: z.string().optional(),
  formations: z.string().optional(),
  degrees: z.array(z.enum(Degree)).optional(),
  occupations: z.string().optional(),
  seniority: z.enum(Seniority).optional(),
  institutions: z.string().optional(),
  biography: z.string().optional(),
})

export class UpdateResearcherController {
  constructor(private readonly researcherRepository: IResearcherRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        id,
        registrationNumber,
        mainEtps,
        formations,
        degrees,
        occupations,
        seniority,
        institutions,
        biography,
      } = updateResearcherSchema.parse({
        id: req.params.id,
        ...req.body,
      })

      const existingResearcher = await this.researcherRepository.findById(id)

      if (!existingResearcher) {
        throw new NotFoundError('O pesquisador não existe.')
      }

      if (
        registrationNumber &&
        registrationNumber !== existingResearcher.registrationNumber
      ) {
        const researcherWithSameRegistration =
          await this.researcherRepository.findByRegistrationNumber(
            registrationNumber
          )

        if (
          researcherWithSameRegistration &&
          researcherWithSameRegistration.id !== id
        ) {
          throw new ConflictError(
            'Já existe um pesquisador com este número de registro.'
          )
        }
      }

      await this.researcherRepository.update({
        id,
        registrationNumber,
        mainEtps,
        formations,
        degrees,
        occupations,
        seniority,
        institutions,
        biography,
      })

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
