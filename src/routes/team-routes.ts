import { type Request, type Response, Router } from 'express'
import {
  makeCreateTeamController,
  makeDeleteTeamController,
  makeFindAllTeamsController,
  makeFindTeamByIdController,
  makeFindTeamByTypeController,
  makeUpdateTeamController,
} from '../factories/controllers/team.factory.ts'
import {
  makeCreateTeamMemberController,
  makeDeleteTeamMemberController,
  makeUpdateTeamMemberController,
} from '../factories/controllers/team-member.factory.ts'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const { findAllTeamsController } = makeFindAllTeamsController()

  await findAllTeamsController.handle(req, res)
})

router.get('/id/:id', async (req: Request, res: Response) => {
  const { findTeamByIdController } = makeFindTeamByIdController()

  await findTeamByIdController.handle(req, res)
})

router.get('/type/:type', async (req: Request, res: Response) => {
  const { findTeamByTypeController } = makeFindTeamByTypeController()

  await findTeamByTypeController.handle(req, res)
})

router.post('/', async (req: Request, res: Response) => {
  const { createTeamController } = makeCreateTeamController()

  await createTeamController.handle(req, res)
})

router.put('/member/:id', async (req: Request, res: Response) => {
  const { updateTeamMemberController } = makeUpdateTeamMemberController()

  await updateTeamMemberController.handle(req, res)
})

router.post('/:team_id/member', async (req: Request, res: Response) => {
  const { createTeamMemberController } = makeCreateTeamMemberController()

  await createTeamMemberController.handle(req, res)
})

router.put('/:id', async (req: Request, res: Response) => {
  const { updateTeamController } = makeUpdateTeamController()

  await updateTeamController.handle(req, res)
})

router.delete('/member/:id', async (req: Request, res: Response) => {
  const { deleteTeamMemberController } = makeDeleteTeamMemberController()

  await deleteTeamMemberController.handle(req, res)
})

router.delete('/:id', async (req: Request, res: Response) => {
  const { deleteTeamController } = makeDeleteTeamController()

  await deleteTeamController.handle(req, res)
})

export { router as teamRoutes }
