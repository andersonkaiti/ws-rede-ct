import { type Request, type Response } from "express";
import type { IUserCreatedEvent } from "../../models/user-created-event.d.ts";
import type { IClerkWebhookService } from "../../services/clerk-webhook/iclerk-webhook.d.ts";
import type { IUserRepository } from "../../repositories/user/iuser-repository.d.ts";

export class CreateUserController {
  constructor(
    private readonly clerkWebhookService: IClerkWebhookService,
    private readonly userRepository: IUserRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const event =
        await this.clerkWebhookService.verifyEvent<IUserCreatedEvent>(req);

      if (!event) throw new Error("Erro ao verificar webhook.");

      const {
        type: eventType,
        data: {
          created_at,
          birthday,
          last_sign_in_at,
          updated_at,
          email_addresses,
          ...rest
        },
      } = event;

      if (eventType === "user.created") {
        await this.userRepository.create({
          created_at: new Date(created_at),
          updated_at: new Date(updated_at),
          email_addresses: email_addresses,
          ...rest,
        });

        res.status(201).json({
          message: "Usuário criado com sucesso.",
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
