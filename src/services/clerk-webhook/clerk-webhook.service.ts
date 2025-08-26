import type { Request } from 'express'
import type { Webhook } from 'svix'
import type { IClerkWebhookService } from './iclerk-webhook.js'

export class ClerkWebhookService implements IClerkWebhookService {
  constructor(private readonly webhook: Webhook) {}

  async verifyEvent<T>(req: Request): Promise<T | undefined> {
    const {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    } = req.headers

    if (!(svixId && svixTimestamp && svixSignature)) {
      throw new Error('Headers are missing')
    }

    const payload = JSON.stringify(req.body)

    const headers = {
      'svix-id': svixId as string,
      'svix-timestamp': svixTimestamp as string,
      'svix-signature': svixSignature as string,
    }

    try {
      return (await this.webhook.verify(payload, headers)) as T
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message)
      }
    }
  }
}
