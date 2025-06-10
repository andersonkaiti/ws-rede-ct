import { type Request, type Response } from "express";
import type { ITeamRepository } from "../../repositories/team/iteam-repository.d.ts";

export class DeleteTeamController {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.teamRepository.delete(id);

      res.status(200).json({
        message: "Equipe deletada com sucesso",
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
        });
      }
    }
  }
}
