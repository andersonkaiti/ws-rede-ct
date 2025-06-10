import { prisma } from "../../../config/database.ts";
import { CreateTeamController } from "../../controllers/team/create-team-controller.ts";
import { DeleteTeamController } from "../../controllers/team/delete-team-controller.ts";
import { FindAllController } from "../../controllers/team/find-all-teams-controller.ts";
import { FindTeamByIdController } from "../../controllers/team/find-team-by-id-controller.ts";
import { FindTeamByTypeController } from "../../controllers/team/find-team-by-type-controller.ts";
import { UpdateTeamController } from "../../controllers/team/update-team-controller.ts";
import { TeamMemberRepository } from "../../repositories/team-member/team-member-repository.ts";
import { TeamRepository } from "../../repositories/team/team-repository.ts";

export function makeFindAllTeamsController() {
  return {
    findAllTeamsController: new FindAllController(new TeamRepository(prisma)),
  };
}

export function makeFindTeamByIdController() {
  return {
    findTeamByIdController: new FindTeamByIdController(
      new TeamRepository(prisma)
    ),
  };
}

export function makeFindTeamByTypeController() {
  return {
    findTeamByTypeController: new FindTeamByTypeController(
      new TeamRepository(prisma)
    ),
  };
}

export function makeCreateTeamController() {
  return {
    createTeamController: new CreateTeamController(new TeamRepository(prisma)),
  };
}

export function makeUpdateTeamController() {
  return {
    updateTeamController: new UpdateTeamController(
      new TeamRepository(prisma),
      new TeamMemberRepository(prisma)
    ),
  };
}

export function makeDeleteTeamController() {
  return {
    deleteTeamController: new DeleteTeamController(new TeamRepository(prisma)),
  };
}
