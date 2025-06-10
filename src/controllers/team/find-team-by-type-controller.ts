import { type Request, type Response } from "express";
import type { ITeamRepository } from "../../repositories/team/iteam-repository.js";

export class FindTeamByTypeController {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { type } = req.params;

      const team = await this.teamRepository.findByType(type);

      res.status(200).json(team);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
        });
      }
    }
  }
}
