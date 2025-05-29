import { Router, type Request, type Response } from "express";
import {
  makeCreateNewsController,
  makeDeleteNewsController,
  makeFindAllNewsController,
  makeFindNewsByAuthorIdController,
  makeFindNewsByIdController,
  makeUpdateNewsController,
} from "../factories/controllers/news.factory.ts";
import { upload } from "../middlewares/multer.ts";

const routes = Router();

routes.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const { createNewsController } = makeCreateNewsController();

    await createNewsController.handle(req, res);
  }
);

routes.get("/", async (req: Request, res: Response) => {
  const { findAllNewsController } = makeFindAllNewsController();

  await findAllNewsController.handle(req, res);
});

routes.get("/:id", async (req: Request, res: Response) => {
  const { findNewsByIdController } = makeFindNewsByIdController();

  await findNewsByIdController.handle(req, res);
});

routes.get("/author/:author_id", async (req: Request, res: Response) => {
  const { findNewsByAuthorIdController } = makeFindNewsByAuthorIdController();

  await findNewsByAuthorIdController.handle(req, res);
});

routes.put(
  "/:id",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const { updateNewsController } = makeUpdateNewsController();

    await updateNewsController.handle(req, res);
  }
);

routes.delete("/:id", async (req: Request, res: Response) => {
  const { deleteNewsController } = makeDeleteNewsController();

  await deleteNewsController.handle(req, res);
});

export { routes as newsRoutes };
