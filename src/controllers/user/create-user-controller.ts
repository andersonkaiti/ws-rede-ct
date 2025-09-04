import type { Request, Response } from 'express'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IUserCreatedEvent } from '../../events/user-created-event.d.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.d.ts'
import type { IClerkWebhookService } from '../../services/clerk-webhook/iclerk-webhook.d.ts'

export class CreateUserController {
  constructor(
    private readonly clerkWebhookService: IClerkWebhookService,
    private readonly userRepository: IUserRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const event =
        await this.clerkWebhookService.verifyEvent<IUserCreatedEvent>(req)

      if (!event) {
        throw new Error('Erro ao verificar webhook.')
      }

      const {
        type: eventType,
        data: { created_at, updated_at, email_addresses, ...rest },
      } = event

      if (eventType === 'user.created') {
        await this.userRepository.create({
          created_at,
          updated_at,
          email_addresses,
          ...rest,
        })

        res.status(HttpStatus.CREATED).json({
          message: 'Usuário criado com sucesso.',
        })
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: err.message,
        })
      }
    }
  }
}
