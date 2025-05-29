import { type Request, type Response } from "express";
import type { IUserUpdatedEvent } from "../../events/user-updated-event.js";
import type { IClerkWebhookService } from "../../services/clerk-webhook/iclerk-webhook.d.ts";
import type { IUserRepository } from "../../repositories/user/iuser-repository.d.ts";

export class UpdateUserController {
  constructor(
    private readonly clerkWebhookService: IClerkWebhookService,
    private readonly userRepository: IUserRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const event =
        await this.clerkWebhookService.verifyEvent<IUserUpdatedEvent>(req);

      if (!event) throw new Error("Erro ao verificar webhook.");

      const {
        type: eventType,
        data: { email_addresses, ...user },
      } = event;

      if (eventType === "user.updated") {
        await this.userRepository.update({
          ...user,
          email_addresses: email_addresses,
        });

        res.status(200).json({
          message: "Usuário atualizado com sucesso.",
        });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({
          message: err.message,
        });
      }
    }
  }
}
