import { type Request, type Response } from "express";
import type { ITeamRepository } from "../../repositories/team/iteam-repository.js";

export class FindAllController {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async handle(_req: Request, res: Response) {
    try {
      const teams = await this.teamRepository.findAll();

      return res.status(200).json(teams);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: error.message,
        });
      }
    }
  }
}
