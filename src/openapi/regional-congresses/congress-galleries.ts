import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { createRegionalCongressGallerySchema } from '../../controllers/regional-congress-gallery/create-regional-congress-gallery-controller.ts'
import { deleteRegionalCongressGallerySchema } from '../../controllers/regional-congress-gallery/delete-regional-congress-gallery-controller.ts'
import { findRegionalCongressGalleriesByCongressIdSchema } from '../../controllers/regional-congress-gallery/find-regional-congress-galleries-by-congress-id-controller.ts'
import { updateRegionalCongressGallerySchema } from '../../controllers/regional-congress-gallery/update-regional-congress-gallery-controller.ts'

const congressGallerySchema = z.object({
  id: z.uuid(),
  imageUrl: z.string(),
  caption: z.string().nullable(),
  congressId: z.uuid(),
})

export const createCongressGalleryRegistry: RouteConfig = {
  method: 'post',
  path: '/regional-congress/{congressId}/gallery',
  tags: ['Regional Congresses'],
  summary: 'Create a new congress gallery image',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      congressId: z.uuid(),
    }),
    body: {
      content: {
        'application/json': {
          schema: createRegionalCongressGallerySchema.omit({
            id: true,
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Congress gallery image created successfully',
      summary: 'Congress Gallery Created',
    },
    400: {
      description: 'Invalid input data or missing required fields',
      summary: 'Validation Error',
      content: {
        'application/json': {
          schema: z.object({
            errors: z.record(z.string(), z.string()),
          }),
        },
      },
    },
    401: {
      description: 'User not authenticated',
      summary: 'Authentication Required',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: 'Congress not found with the provided ID',
      summary: 'Congress Not Found',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: 'Internal server error occurred',
      summary: 'Server Error',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
}

export const findCongressGalleriesByCongressIdRegistry: RouteConfig = {
  method: 'get',
  path: '/regional-congress/{congressId}/gallery',
  tags: ['Regional Congresses'],
  summary: 'Find congress gallery images by congress ID',
  request: {
    params: findRegionalCongressGalleriesByCongressIdSchema,
  },
  responses: {
    200: {
      description:
        'Congress gallery images retrieved successfully by congress ID',
      summary: 'Congress Galleries Retrieved',
      content: {
        'application/json': {
          schema: z.array(congressGallerySchema),
        },
      },
    },
    400: {
      description: 'Invalid congress ID parameter provided',
      summary: 'Validation Error',
      content: {
        'application/json': {
          schema: z.object({
            errors: z.record(z.string(), z.string()),
          }),
        },
      },
    },
    500: {
      description: 'Internal server error occurred',
      summary: 'Server Error',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
}

export const updateCongressGalleryRegistry: RouteConfig = {
  method: 'put',
  path: '/regional-congress/gallery/{id}',
  tags: ['Regional Congresses'],
  summary: 'Update congress gallery image',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteRegionalCongressGallerySchema,
    body: {
      content: {
        'application/json': {
          schema: updateRegionalCongressGallerySchema.omit({
            id: true,
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Congress gallery image updated successfully',
      summary: 'Congress Gallery Updated',
    },
    400: {
      description: 'Invalid input data or gallery ID format',
      summary: 'Validation Error',
      content: {
        'application/json': {
          schema: z.object({
            errors: z.record(z.string(), z.string()),
          }),
        },
      },
    },
    401: {
      description: 'User not authenticated',
      summary: 'Authentication Required',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: 'Congress gallery image not found with the provided ID',
      summary: 'Congress Gallery Not Found',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: 'Internal server error occurred',
      summary: 'Server Error',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
}

export const deleteCongressGalleryRegistry: RouteConfig = {
  method: 'delete',
  path: '/regional-congress/gallery/{id}',
  tags: ['Regional Congresses'],
  summary: 'Delete congress gallery image',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteRegionalCongressGallerySchema,
  },
  responses: {
    200: {
      description: 'Congress gallery image deleted successfully',
      summary: 'Congress Gallery Deleted',
    },
    400: {
      description: 'Invalid gallery ID format',
      summary: 'Validation Error',
      content: {
        'application/json': {
          schema: z.object({
            errors: z.record(z.string(), z.string()),
          }),
        },
      },
    },
    401: {
      description: 'User not authenticated',
      summary: 'Authentication Required',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: 'Congress gallery image not found with the provided ID',
      summary: 'Congress Gallery Not Found',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    500: {
      description: 'Internal server error occurred',
      summary: 'Server Error',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
}
