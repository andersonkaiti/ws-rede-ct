import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IRegionalCongressRepository } from '../../repositories/regional-congress/iregional-congress-repository.d.ts'

extendZodWithOpenApi(z)

export const updateRegionalCongressSchema = z
  .object({
    id: z.string().uuid('ID inválido'),
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
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate >= data.startDate
      }
      return true
    },
    {
      message: 'Data de término deve ser posterior ou igual à data de início',
      path: ['endDate'],
    },
  )

export class UpdateRegionalCongressController {
  constructor(
    private readonly regionalCongressRepository: IRegionalCongressRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = z.object({ id: z.string().uuid() }).parse(req.params)

      const congress = await this.regionalCongressRepository.findById(id)

      if (!congress) {
        throw new NotFoundError('Congresso regional não encontrado')
      }

      const updateData = updateRegionalCongressSchema.parse({
        id,
        ...req.body,
      })

      await this.regionalCongressRepository.update(updateData)

      return res.sendStatus(HttpStatus.NO_CONTENT)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
