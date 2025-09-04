import type { Request, Response } from 'express'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IUserDeletedEvent } from '../../events/user-deleted-event.js'
import type { IUserRepository } from '../../repositories/user/iuser-repository.d.ts'
import type { IClerkWebhookService } from '../../services/clerk-webhook/iclerk-webhook.d.ts'

export class DeleteUserController {
  constructor(
    private readonly clerkWebhookService: IClerkWebhookService,
    private readonly userRepository: IUserRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const event =
        await this.clerkWebhookService.verifyEvent<IUserDeletedEvent>(req)

      if (!event) {
        throw new Error('Erro ao verificar webhook.')
      }

      const { type: eventType, data: user } = event

      if (eventType === 'user.deleted') {
        await this.userRepository.delete(user.id)

        res.status(HttpStatus.OK).json({
          message: 'Usuário deletado com sucesso.',
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
