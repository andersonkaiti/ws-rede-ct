import { Router, type Request, type Response } from "express";
import {
  makeCreateTeamController,
  makeDeleteTeamController,
  makeFindAllTeamsController,
  makeFindTeamByIdController,
  makeFindTeamByTypeController,
  makeUpdateTeamController,
} from "../factories/controllers/team.factory.ts";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { findAllTeamsController } = makeFindAllTeamsController();

  await findAllTeamsController.handle(req, res);
});

router.get("/id/:id", async (req: Request, res: Response) => {
  const { findTeamByIdController } = makeFindTeamByIdController();

  await findTeamByIdController.handle(req, res);
});

router.get("/type/:type", async (req: Request, res: Response) => {
  const { findTeamByTypeController } = makeFindTeamByTypeController();

  await findTeamByTypeController.handle(req, res);
});

router.post("/", async (req: Request, res: Response) => {
  const { createTeamController } = makeCreateTeamController();

  await createTeamController.handle(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { updateTeamController } = makeUpdateTeamController();

  await updateTeamController.handle(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { deleteTeamController } = makeDeleteTeamController();

  await deleteTeamController.handle(req, res);
});

export { router as teamRoutes };
