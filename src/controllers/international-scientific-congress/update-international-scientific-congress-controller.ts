import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IInternationalScientificCongressRepository } from '../../repositories/international-scientific-congress/iinternational-scientific-congress-repository.d.ts'

extendZodWithOpenApi(z)

export const updateInternationalScientificCongressSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1, 'Título é obrigatório').optional(),
  edition: z.coerce
    .number()
    .int()
    .positive('Edição deve ser um número positivo')
    .optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  congressLink: z.union([
    z.url('Link do congresso deve ser uma URL válida'),
    z.literal(''),
  ]),
  noticeUrl: z.union([
    z.url('URL do edital deve ser uma URL válida'),
    z.literal(''),
  ]),
  scheduleUrl: z.union([
    z.url('URL do cronograma deve ser uma URL válida'),
    z.literal(''),
  ]),
  programUrl: z.union([
    z.url('URL da programação deve ser uma URL válida'),
    z.literal(''),
  ]),
  adminReportUrl: z.union([
    z.url('URL do relatório administrativo deve ser uma URL válida'),
    z.literal(''),
  ]),
  proceedingsUrl: z.union([
    z.url('URL dos anais deve ser uma URL válida'),
    z.literal(''),
  ]),
})

export class UpdateInternationalScientificCongressController {
  constructor(
    private readonly internationalScientificCongressRepository: IInternationalScientificCongressRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id, ...congress } =
        updateInternationalScientificCongressSchema.parse({
          id: req.params.id,
          ...req.body,
        })

      const existingCongress =
        await this.internationalScientificCongressRepository.findById(id)

      if (!existingCongress) {
        throw new NotFoundError('O congresso não existe.')
      }

      await this.internationalScientificCongressRepository.update({
        ...congress,
        id,
      })

      return res.sendStatus(HttpStatus.OK)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
