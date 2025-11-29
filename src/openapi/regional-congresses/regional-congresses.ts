import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { createRegionalCongressSchema } from '../../controllers/regional-congress/create-regional-congress-controller.ts'
import { deleteRegionalCongressSchema } from '../../controllers/regional-congress/delete-regional-congress-controller.ts'
import { findRegionalCongressByEditionSchema } from '../../controllers/regional-congress/find-regional-congress-by-edition-controller.ts'
import { findRegionalCongressByIdSchema } from '../../controllers/regional-congress/find-regional-congress-by-id-controller.ts'
import { findRegionalCongressesSchema } from '../../controllers/regional-congress/find-regional-congresses-controller.ts'
import { updateRegionalCongressSchema } from '../../controllers/regional-congress/update-regional-congress-controller.ts'

const DEFAULT_GALLERY_PAGE_LIMIT = 9

const congressGalleryImageSchema = z.object({
  image: z.any().openapi({
    type: 'string',
    format: 'binary',
  }),
  caption: z.string().optional(),
})

const congressGalleryUpdateSchema = z.object({
  image: z
    .any()
    .openapi({
      type: 'string',
      format: 'binary',
    })
    .optional(),
  caption: z.string().optional(),
})

const congressPartnerSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  logoUrl: z.string().nullable(),
  congressId: z.uuid(),
})

const congressGallerySchema = z.object({
  id: z.uuid(),
  imageUrl: z.string(),
  caption: z.string().nullable(),
  congressId: z.uuid(),
})

const regionalCongressSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  edition: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string().nullable(),
  location: z.string().nullable(),
  congressLink: z.string().nullable(),
  noticeUrl: z.string().nullable(),
  scheduleUrl: z.string().nullable(),
  programUrl: z.string().nullable(),
  adminReportUrl: z.string().nullable(),
  proceedingsUrl: z.string().nullable(),
  partners: z.array(congressPartnerSchema),
  galleries: z.array(congressGallerySchema),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createRegionalCongressRegistry: RouteConfig = {
  method: 'post',
  path: '/regional-congress',
  tags: ['Regional Congresses'],
  summary: 'Create a new regional congress',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createRegionalCongressSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Regional congress created successfully',
      summary: 'Regional Congress Created',
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

export const findRegionalCongressesRegistry: RouteConfig = {
  method: 'get',
  path: '/regional-congress',
  tags: ['Regional Congresses'],
  summary: 'List all regional congresses with pagination and filters',
  request: {
    query: findRegionalCongressesSchema,
  },
  responses: {
    200: {
      description:
        'List of regional congresses retrieved successfully with pagination',
      summary: 'Regional Congresses Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            congresses: z.array(regionalCongressSchema),
          }),
        },
      },
    },
    400: {
      description: 'Invalid query parameters provided',
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

export const findRegionalCongressByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/regional-congress/{id}',
  tags: ['Regional Congresses'],
  summary: 'Find regional congress by ID',
  request: {
    params: findRegionalCongressByIdSchema,
  },
  responses: {
    200: {
      description: 'Regional congress details retrieved successfully',
      summary: 'Regional Congress Retrieved',
      content: {
        'application/json': {
          schema: regionalCongressSchema,
        },
      },
    },
    400: {
      description: 'Invalid regional congress ID format',
      summary: 'Validation Error',
      content: {
        'application/json': {
          schema: z.object({
            errors: z.record(z.string(), z.string()),
          }),
        },
      },
    },
    404: {
      description: 'Regional congress not found with the provided ID',
      summary: 'Regional Congress Not Found',
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

export const findRegionalCongressByEditionRegistry: RouteConfig = {
  method: 'get',
  path: '/regional-congress/edition/{edition}',
  tags: ['Regional Congresses'],
  summary: 'Find regional congresses by edition',
  request: {
    params: findRegionalCongressByEditionSchema,
  },
  responses: {
    200: {
      description: 'Regional congresses retrieved successfully by edition',
      summary: 'Regional Congresses Retrieved by Edition',
      content: {
        'application/json': {
          schema: z.array(regionalCongressSchema),
        },
      },
    },
    400: {
      description: 'Invalid edition parameter provided',
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

export const updateRegionalCongressRegistry: RouteConfig = {
  method: 'put',
  path: '/regional-congress/{id}',
  tags: ['Regional Congresses'],
  summary: 'Update regional congress',
  security: [{ bearerAuth: [] }],
  request: {
    params: findRegionalCongressByIdSchema,
    body: {
      content: {
        'application/json': {
          schema: updateRegionalCongressSchema.omit({
            id: true,
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Regional congress updated successfully',
      summary: 'Regional Congress Updated',
    },
    400: {
      description: 'Invalid input data or regional congress ID format',
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
      description: 'Regional congress not found with the provided ID',
      summary: 'Regional Congress Not Found',
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

export const deleteRegionalCongressRegistry: RouteConfig = {
  method: 'delete',
  path: '/regional-congress/{id}',
  tags: ['Regional Congresses'],
  summary: 'Delete regional congress',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteRegionalCongressSchema,
  },
  responses: {
    200: {
      description: 'Regional congress deleted successfully',
      summary: 'Regional Congress Deleted',
    },
    400: {
      description: 'Invalid regional congress ID format',
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
      description: 'Regional congress not found with the provided ID',
      summary: 'Regional Congress Not Found',
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

export const createRegionalCongressGalleryRegistry: RouteConfig = {
  method: 'post',
  path: '/regional-congress/{congressId}/gallery',
  tags: ['Regional Congress Gallery'],
  summary: 'Create a new gallery image for a congress',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      congressId: z.uuid(),
    }),
    body: {
      content: {
        'multipart/form-data': {
          schema: congressGalleryImageSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Gallery image created successfully',
      summary: 'Gallery Image Created',
    },
    400: {
      description:
        'Invalid input data, missing required fields, or invalid image format/size',
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

export const findRegionalCongressGalleriesByCongressIdRegistry: RouteConfig = {
  method: 'get',
  path: '/regional-congress/{congressId}/gallery',
  tags: ['Regional Congress Gallery'],
  summary: 'List all gallery images for a congress with pagination',
  request: {
    params: z.object({
      congressId: z.uuid(),
    }),
    query: z.object({
      page: z.coerce.number().min(1).default(1),
      limit: z.coerce.number().min(1).default(DEFAULT_GALLERY_PAGE_LIMIT),
      caption: z.string().optional(),
    }),
  },
  responses: {
    200: {
      description: 'Gallery images retrieved successfully with pagination',
      summary: 'Gallery Images Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            galleries: z.array(congressGallerySchema),
          }),
        },
      },
    },
    400: {
      description: 'Invalid congress ID format or query parameters',
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

export const findRegionalCongressGalleryByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/regional-congress/gallery/{id}',
  tags: ['Regional Congress Gallery'],
  summary: 'Find a gallery image by ID',
  request: {
    params: z.object({
      id: z.uuid(),
    }),
  },
  responses: {
    200: {
      description: 'Gallery image retrieved successfully',
      summary: 'Gallery Image Retrieved',
      content: {
        'application/json': {
          schema: congressGallerySchema,
        },
      },
    },
    400: {
      description: 'Invalid gallery image ID format',
      summary: 'Validation Error',
      content: {
        'application/json': {
          schema: z.object({
            errors: z.record(z.string(), z.string()),
          }),
        },
      },
    },
    404: {
      description: 'Gallery image not found with the provided ID',
      summary: 'Gallery Image Not Found',
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

export const updateRegionalCongressGalleryRegistry: RouteConfig = {
  method: 'put',
  path: '/regional-congress/gallery/{id}',
  tags: ['Regional Congress Gallery'],
  summary: 'Update a gallery image with optional image upload',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      id: z.uuid(),
    }),
    body: {
      content: {
        'multipart/form-data': {
          schema: congressGalleryUpdateSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Gallery image updated successfully',
      summary: 'Gallery Image Updated',
    },
    400: {
      description:
        'Invalid input data, gallery ID format, or invalid image format/size',
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
      description: 'Gallery image not found with the provided ID',
      summary: 'Gallery Image Not Found',
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

export const deleteRegionalCongressGalleryRegistry: RouteConfig = {
  method: 'delete',
  path: '/regional-congress/gallery/{id}',
  tags: ['Regional Congress Gallery'],
  summary: 'Delete a gallery image',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      id: z.uuid(),
    }),
  },
  responses: {
    200: {
      description: 'Gallery image deleted successfully',
      summary: 'Gallery Image Deleted',
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
      description: 'Gallery image not found with the provided ID',
      summary: 'Gallery Image Not Found',
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
