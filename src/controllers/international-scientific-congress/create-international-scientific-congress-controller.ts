import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { IInternationalScientificCongressRepository } from '../../repositories/international-scientific-congress/iinternational-scientific-congress-repository.d.ts'

extendZodWithOpenApi(z)

export const createInternationalScientificCongressSchema = z
  .object({
    title: z.string().min(1, 'Título é obrigatório'),
    edition: z.coerce
      .number()
      .int()
      .positive('Edição deve ser um número positivo'),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    description: z.string().optional(),
    location: z.string().optional(),
    congressLink: z
      .url('Link do congresso deve ser uma URL válida')
      .optional()
      .or(z.literal('')),
    noticeUrl: z
      .url('URL do edital deve ser uma URL válida')
      .optional()
      .or(z.literal('')),
    scheduleUrl: z
      .url('URL do cronograma deve ser uma URL válida')
      .optional()
      .or(z.literal('')),
    programUrl: z
      .url('URL da programação deve ser uma URL válida')
      .optional()
      .or(z.literal('')),
    adminReportUrl: z
      .url('URL do relatório administrativo deve ser uma URL válida')
      .optional()
      .or(z.literal('')),
    proceedingsUrl: z
      .url('URL dos anais deve ser uma URL válida')
      .optional()
      .or(z.literal('')),
  })
  .refine(
    (data) => {
      return data.endDate >= data.startDate
    },
    {
      message: 'Data de término deve ser posterior ou igual à data de início',
      path: ['endDate'],
    }
  )

export class CreateInternationalScientificCongressController {
  constructor(
    private readonly internationalScientificCongressRepository: IInternationalScientificCongressRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const congress = createInternationalScientificCongressSchema.parse(
        req.body
      )

      await this.internationalScientificCongressRepository.create(congress)

      return res.sendStatus(HttpStatus.CREATED)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
