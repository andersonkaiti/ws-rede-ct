import type { Request } from 'express'

export interface IClerkWebhookService {
  verifyEvent<T>(req: Request): Promise<T | undefined>
}
