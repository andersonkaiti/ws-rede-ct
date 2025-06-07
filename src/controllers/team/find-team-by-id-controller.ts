import { type Request, type Response } from "express";
import type { ITeamRepository } from "../../repositories/team/iteam-repository.js";

export class FindTeamByIdController {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const team = await this.teamRepository.findById(id);

      res.status(200).json(team);
    } catch (error) {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
