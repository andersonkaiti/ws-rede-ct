import { type Request, type Response } from "express";
import type { ITeamMemberRepository } from "../../repositories/team-member/iteam-member-repository.d.ts";

export class DeleteTeamMemberController {
  constructor(private readonly teamMemberRepository: ITeamMemberRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.teamMemberRepository.delete([id]);

      res.status(200).json({
        message: "Membro removido com sucesso",
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
