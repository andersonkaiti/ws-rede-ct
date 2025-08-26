import { Webhook } from 'svix'
import { ClerkWebhookService } from '../../services/clerk-webhook/clerk-webhook.service.ts'

export function makeClerkWebhookService(secret: string) {
  return new ClerkWebhookService(new Webhook(secret))
}
