import { prisma } from "../../../config/database.ts";
import { CreateTeamMemberController } from "../../controllers/team/create-team-member-controller.ts";
import { DeleteTeamMemberController } from "../../controllers/team/delete-team-member-controller.ts";
import { UpdateTeamMemberController } from "../../controllers/team/update-team-member-controller.ts";
import { TeamMemberRepository } from "../../repositories/team-member/team-member-repository.ts";

export function makeCreateTeamMemberController() {
  return {
    createTeamMemberController: new CreateTeamMemberController(
      new TeamMemberRepository(prisma)
    ),
  };
}

export function makeUpdateTeamMemberController() {
  return {
    updateTeamMemberController: new UpdateTeamMemberController(
      new TeamMemberRepository(prisma)
    ),
  };
}

export function makeDeleteTeamMemberController() {
  return {
    deleteTeamMemberController: new DeleteTeamMemberController(
      new TeamMemberRepository(prisma)
    ),
  };
}
