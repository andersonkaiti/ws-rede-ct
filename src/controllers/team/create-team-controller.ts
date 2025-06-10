import { type Request, type Response } from "express";
import type { ITeamRepository } from "../../repositories/team/iteam-repository.d.ts";

export class CreateTeamController {
  constructor(private teamRepository: ITeamRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { name, type, members } = req.body;

      const team = await this.teamRepository.create({
        name,
        type,
        members,
      });

      res.status(201).json(team);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
        });
      }
    }
  }
}
