import { type Request, type Response } from "express";
import { ITeamRepository } from "../../repositories/team/iteam-repository.js";

export class UpdateTeamController {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, members } = req.body;

      const team = await this.teamRepository.update({
        id,
        name,
        members,
      });

      res.status(200).json(team);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        res.status(500).json({
          message: "Erro ao atualizar equipe",
        });
      }
    }
  }
}
