import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { IRegionalCongressRepository } from '../../repositories/regional-congress/iregional-congress-repository.d.ts'

extendZodWithOpenApi(z)

export const createRegionalCongressSchema = z
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
      return data.endDate >= data.startDate
    },
    {
      message: 'Data de término deve ser posterior ou igual à data de início',
      path: ['endDate'],
    },
  )

export class CreateRegionalCongressController {
  constructor(
    private readonly regionalCongressRepository: IRegionalCongressRepository,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const congress = createRegionalCongressSchema.parse(req.body)

      await this.regionalCongressRepository.create(congress)

      return res.sendStatus(HttpStatus.CREATED)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
