import type { Webinar } from '@prisma/client'
import type { ICreateWebinarDTO, IUpdateWebinarDTO } from '../../dto/webinar.ts'

export interface IWebinarRepository {
  create(data: ICreateWebinarDTO): Promise<Webinar>
  update(data: IUpdateWebinarDTO): Promise<void>
}
