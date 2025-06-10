import { type Request, type Response } from "express";
import type { ITeamMemberRepository } from "../../repositories/team-member/iteam-member-repository.js";

export class UpdateTeamMemberController {
  constructor(private readonly teamMemberRepository: ITeamMemberRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { member } = req.body;

      const teamMember = await this.teamMemberRepository.update({
        member,
      });

      res.status(200).json(teamMember);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
        });
      }
    }
  }
}
