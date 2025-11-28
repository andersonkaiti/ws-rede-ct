import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateRegionalCongressController,
  makeDeleteRegionalCongressController,
  makeFindRegionalCongressByEditionController,
  makeFindRegionalCongressByIdController,
  makeFindRegionalCongressesController,
  makeUpdateRegionalCongressController,
} from '../factories/controllers/regional-congress/regional-congress.factory.ts'
import {
  makeCreateRegionalCongressGalleryController,
  makeDeleteRegionalCongressGalleryController,
  makeFindRegionalCongressGalleriesByCongressIdController,
  makeFindRegionalCongressGalleryByIdController,
  makeUpdateRegionalCongressGalleryController,
} from '../factories/controllers/regional-congress/regional-congress-gallery.factory.ts'
import {
  makeCreateRegionalCongressPartnerController,
  makeFindRegionalCongressPartnersByCongressIdController,
} from '../factories/controllers/regional-congress/regional-congress-partner.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createRegionalCongressController } =
      makeCreateRegionalCongressController()

    await createRegionalCongressController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findRegionalCongressesController } =
    makeFindRegionalCongressesController()

  await findRegionalCongressesController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findRegionalCongressByIdController } =
    makeFindRegionalCongressByIdController()

  await findRegionalCongressByIdController.handle(req, res)
})

router.get('/edition/:edition', async (req: Request, res: Response) => {
  const { findRegionalCongressByEditionController } =
    makeFindRegionalCongressByEditionController()

  await findRegionalCongressByEditionController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { updateRegionalCongressController } =
      makeUpdateRegionalCongressController()

    await updateRegionalCongressController.handle(req, res)
  }
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteRegionalCongressController } =
      makeDeleteRegionalCongressController()

    await deleteRegionalCongressController.handle(req, res)
  }
)

router.post(
  '/:congressId/gallery',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { createRegionalCongressGalleryController } =
      makeCreateRegionalCongressGalleryController()

    await createRegionalCongressGalleryController.handle(req, res)
  }
)

router.get('/:congressId/gallery', async (req: Request, res: Response) => {
  const { findRegionalCongressGalleriesByCongressIdController } =
    makeFindRegionalCongressGalleriesByCongressIdController()

  await findRegionalCongressGalleriesByCongressIdController.handle(req, res)
})

router.get('/gallery/:id', async (req: Request, res: Response) => {
  const { findRegionalCongressGalleryByIdController } =
    makeFindRegionalCongressGalleryByIdController()

  await findRegionalCongressGalleryByIdController.handle(req, res)
})

router.put(
  '/gallery/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { updateRegionalCongressGalleryController } =
      makeUpdateRegionalCongressGalleryController()

    await updateRegionalCongressGalleryController.handle(req, res)
  }
)

router.delete(
  '/gallery/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteRegionalCongressGalleryController } =
      makeDeleteRegionalCongressGalleryController()

    await deleteRegionalCongressGalleryController.handle(req, res)
  }
)

router.post(
  '/:congressId/partner',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('logo'),
  async (req: Request, res: Response) => {
    const { createRegionalCongressPartnerController } =
      makeCreateRegionalCongressPartnerController()

    await createRegionalCongressPartnerController.handle(req, res)
  }
)

router.get('/:congressId/partner', async (req: Request, res: Response) => {
  const { findRegionalCongressPartnersByCongressIdController } =
    makeFindRegionalCongressPartnersByCongressIdController()

  await findRegionalCongressPartnersByCongressIdController.handle(req, res)
})

export { router as regionalCongressRoutes }
