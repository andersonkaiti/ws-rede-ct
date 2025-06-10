import { type Request, type Response } from "express";
import type { ITeamMemberRepository } from "../../repositories/team-member/iteam-member-repository.js";

export class CreateTeamMemberController {
  constructor(private readonly teamMemberRepository: ITeamMemberRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { team_id } = req.params;
      const { member } = req.body;

      const teamMember = await this.teamMemberRepository.create({
        team_id,
        ...member,
      });

      res.status(201).json(teamMember);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      }
    }
  }
}
