import type { Request, Response } from 'express'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IUserUpdatedEvent } from '../../events/user-updated-event.d.ts'
import type { IUserRepository } from '../../repositories/user/iuser-repository.d.ts'
import type { IClerkWebhookService } from '../../services/clerk-webhook/iclerk-webhook.d.ts'

export class UpdateUserController {
  constructor(
    private readonly clerkWebhookService: IClerkWebhookService,
    private readonly userRepository: IUserRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const event =
        await this.clerkWebhookService.verifyEvent<IUserUpdatedEvent>(req)

      if (!event) {
        throw new Error('Erro ao verificar webhook.')
      }

      const { type: eventType, data } = event

      if (eventType === 'user.updated') {
        await this.userRepository.update({
          ...data,
          last_name: data.last_name === null ? undefined : data.last_name,
        })

        res.status(HttpStatus.OK).json({
          message: 'Usuário atualizado com sucesso.',
        })
      }
    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: err.message,
        })
      }
    }
  }
}
