import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IResearchGroupRepository } from '../../repositories/research-group/iresearch-group-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const deleteResearchGroupSchema = z.object({
  id: z.uuid(),
})

export class DeleteResearchGroupController {
  constructor(
    private readonly researchGroupRepository: IResearchGroupRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = deleteResearchGroupSchema.parse({
      id: req.params.id,
    })

    const existingResearchGroup =
      await this.researchGroupRepository.findById(id)

    if (!existingResearchGroup) {
      throw new NotFoundError('O grupo de pesquisa não existe.')
    }

    if (existingResearchGroup.logoUrl) {
      this.firebaseStorageService.deleteFile({
        fileUrl: existingResearchGroup.logoUrl,
      })
    }

    await this.researchGroupRepository.deleteById(id)

    return res.sendStatus(HttpStatus.OK)
  }
}
