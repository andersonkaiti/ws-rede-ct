import { type Request, type Response } from "express";
import type { IUserDeletedEvent } from "../../models/user-deleted-event.d.ts";
import type { IClerkWebhookService } from "../../services/clerk-webhook/iclerk-webhook.d.ts";
import type { IUserRepository } from "../../repositories/user/iuser-repository.d.ts";

export class DeleteUserController {
  constructor(
    private readonly clerkWebhookService: IClerkWebhookService,
    private readonly userRepository: IUserRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const event =
        await this.clerkWebhookService.verifyEvent<IUserDeletedEvent>(req);

      if (!event) throw new Error("Erro ao verificar webhook.");

      const { type: eventType, data: user } = event;

      if (eventType === "user.deleted") {
        await this.userRepository.delete(user);

        res.status(200).json({
          message: "Usuário deletado com sucesso.",
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
