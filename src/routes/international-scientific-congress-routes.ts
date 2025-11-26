import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateInternationalScientificCongressController,
  makeDeleteInternationalScientificCongressController,
  makeFindInternationalScientificCongressByEditionController,
  makeFindInternationalScientificCongressByIdController,
  makeFindInternationalScientificCongressesController,
  makeUpdateInternationalScientificCongressController,
} from '../factories/controllers/international-scientific-congress/international-scientific-congress.factory.ts'
import {
  makeCreateInternationalScientificCongressGalleryController,
  makeDeleteInternationalScientificCongressGalleryController,
  makeFindInternationalScientificCongressGalleriesByCongressIdController,
  makeFindInternationalScientificCongressGalleryByIdController,
  makeUpdateInternationalScientificCongressGalleryController,
} from '../factories/controllers/international-scientific-congress/international-scientific-congress-gallery.factory.ts'
import {
  makeCreateInternationalScientificCongressPartnerController,
  makeFindInternationalScientificCongressPartnerByIdController,
  makeFindInternationalScientificCongressPartnersByCongressIdController,
  makeUpdateInternationalScientificCongressPartnerController,
} from '../factories/controllers/international-scientific-congress/international-scientific-congress-partner.factory.ts'
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
    const { createInternationalScientificCongressController } =
      makeCreateInternationalScientificCongressController()

    await createInternationalScientificCongressController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findInternationalScientificCongressesController } =
    makeFindInternationalScientificCongressesController()

  await findInternationalScientificCongressesController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findInternationalScientificCongressByIdController } =
    makeFindInternationalScientificCongressByIdController()

  await findInternationalScientificCongressByIdController.handle(req, res)
})

router.get('/edition/:edition', async (req: Request, res: Response) => {
  const { findInternationalScientificCongressByEditionController } =
    makeFindInternationalScientificCongressByEditionController()

  await findInternationalScientificCongressByEditionController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { updateInternationalScientificCongressController } =
      makeUpdateInternationalScientificCongressController()

    await updateInternationalScientificCongressController.handle(req, res)
  }
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteInternationalScientificCongressController } =
      makeDeleteInternationalScientificCongressController()

    await deleteInternationalScientificCongressController.handle(req, res)
  }
)

router.post(
  '/:congressId/gallery',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { createInternationalScientificCongressGalleryController } =
      makeCreateInternationalScientificCongressGalleryController()

    await createInternationalScientificCongressGalleryController.handle(
      req,
      res
    )
  }
)

router.get('/:congressId/gallery', async (req: Request, res: Response) => {
  const { findInternationalScientificCongressGalleriesByCongressIdController } =
    makeFindInternationalScientificCongressGalleriesByCongressIdController()

  await findInternationalScientificCongressGalleriesByCongressIdController.handle(
    req,
    res
  )
})

router.get('/gallery/:id', async (req: Request, res: Response) => {
  const { findInternationalScientificCongressGalleryByIdController } =
    makeFindInternationalScientificCongressGalleryByIdController()

  await findInternationalScientificCongressGalleryByIdController.handle(
    req,
    res
  )
})

router.put(
  '/gallery/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { updateInternationalScientificCongressGalleryController } =
      makeUpdateInternationalScientificCongressGalleryController()

    await updateInternationalScientificCongressGalleryController.handle(
      req,
      res
    )
  }
)

router.delete(
  '/gallery/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteInternationalScientificCongressGalleryController } =
      makeDeleteInternationalScientificCongressGalleryController()

    await deleteInternationalScientificCongressGalleryController.handle(
      req,
      res
    )
  }
)

router.post(
  '/:congressId/partner',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('logo'),
  async (req: Request, res: Response) => {
    const { createInternationalScientificCongressPartnerController } =
      makeCreateInternationalScientificCongressPartnerController()

    await createInternationalScientificCongressPartnerController.handle(
      req,
      res
    )
  }
)

router.get('/:congressId/partner', async (req: Request, res: Response) => {
  const { findInternationalScientificCongressPartnersByCongressIdController } =
    makeFindInternationalScientificCongressPartnersByCongressIdController()

  await findInternationalScientificCongressPartnersByCongressIdController.handle(
    req,
    res
  )
})

router.get('/partner/:id', async (req: Request, res: Response) => {
  const { findInternationalScientificCongressPartnerByIdController } =
    makeFindInternationalScientificCongressPartnerByIdController()

  await findInternationalScientificCongressPartnerByIdController.handle(
    req,
    res
  )
})

router.put(
  '/partner/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('logo'),
  async (req: Request, res: Response) => {
    const { updateInternationalScientificCongressPartnerController } =
      makeUpdateInternationalScientificCongressPartnerController()

    await updateInternationalScientificCongressPartnerController.handle(
      req,
      res
    )
  }
)

export { router as internationalScientificCongressRoutes }
