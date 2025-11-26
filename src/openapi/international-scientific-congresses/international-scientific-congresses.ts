import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { createInternationalScientificCongressSchema } from '../../controllers/international-scientific-congress/create-international-scientific-congress-controller.ts'
import { deleteInternationalScientificCongressSchema } from '../../controllers/international-scientific-congress/delete-international-scientific-congress-controller.ts'
import { findInternationalScientificCongressByEditionSchema } from '../../controllers/international-scientific-congress/find-international-scientific-congress-by-edition-controller.ts'
import { findInternationalScientificCongressByIdSchema } from '../../controllers/international-scientific-congress/find-international-scientific-congress-by-id-controller.ts'
import { findInternationalScientificCongressSchema } from '../../controllers/international-scientific-congress/find-international-scientific-congresses-controller.ts'
import { updateInternationalScientificCongressSchema } from '../../controllers/international-scientific-congress/update-international-scientific-congress-controller.ts'

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

const internationalScientificCongressSchema = z.object({
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

export const createInternationalScientificCongressRegistry: RouteConfig = {
  method: 'post',
  path: '/international-scientific-congress',
  tags: ['International Scientific Congresses'],
  summary: 'Create a new international scientific congress',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createInternationalScientificCongressSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'International scientific congress created successfully',
      summary: 'International Scientific Congress Created',
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

export const findInternationalScientificCongressesRegistry: RouteConfig = {
  method: 'get',
  path: '/international-scientific-congress',
  tags: ['International Scientific Congresses'],
  summary:
    'List all international scientific congresses with pagination and filters',
  request: {
    query: findInternationalScientificCongressSchema,
  },
  responses: {
    200: {
      description:
        'List of international scientific congresses retrieved successfully with pagination',
      summary: 'International Scientific Congresses Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            congresses: z.array(internationalScientificCongressSchema),
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

export const findInternationalScientificCongressByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/international-scientific-congress/{id}',
  tags: ['International Scientific Congresses'],
  summary: 'Find international scientific congress by ID',
  request: {
    params: findInternationalScientificCongressByIdSchema,
  },
  responses: {
    200: {
      description:
        'International scientific congress details retrieved successfully',
      summary: 'International Scientific Congress Retrieved',
      content: {
        'application/json': {
          schema: internationalScientificCongressSchema,
        },
      },
    },
    400: {
      description: 'Invalid international scientific congress ID format',
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
      description:
        'International scientific congress not found with the provided ID',
      summary: 'International Scientific Congress Not Found',
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

export const findInternationalScientificCongressByEditionRegistry: RouteConfig =
  {
    method: 'get',
    path: '/international-scientific-congress/edition/{edition}',
    tags: ['International Scientific Congresses'],
    summary: 'Find international scientific congresses by edition',
    request: {
      params: findInternationalScientificCongressByEditionSchema,
    },
    responses: {
      200: {
        description:
          'International scientific congresses retrieved successfully by edition',
        summary: 'International Scientific Congresses Retrieved by Edition',
        content: {
          'application/json': {
            schema: z.array(internationalScientificCongressSchema),
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

export const updateInternationalScientificCongressRegistry: RouteConfig = {
  method: 'put',
  path: '/international-scientific-congress/{id}',
  tags: ['International Scientific Congresses'],
  summary: 'Update international scientific congress',
  security: [{ bearerAuth: [] }],
  request: {
    params: findInternationalScientificCongressByIdSchema,
    body: {
      content: {
        'application/json': {
          schema: updateInternationalScientificCongressSchema.omit({
            id: true,
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'International scientific congress updated successfully',
      summary: 'International Scientific Congress Updated',
    },
    400: {
      description:
        'Invalid input data or international scientific congress ID format',
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
      description:
        'International scientific congress not found with the provided ID',
      summary: 'International Scientific Congress Not Found',
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

export const deleteInternationalScientificCongressRegistry: RouteConfig = {
  method: 'delete',
  path: '/international-scientific-congress/{id}',
  tags: ['International Scientific Congresses'],
  summary: 'Delete international scientific congress',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteInternationalScientificCongressSchema,
  },
  responses: {
    200: {
      description: 'International scientific congress deleted successfully',
      summary: 'International Scientific Congress Deleted',
    },
    400: {
      description: 'Invalid international scientific congress ID format',
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
      description:
        'International scientific congress not found with the provided ID',
      summary: 'International Scientific Congress Not Found',
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

export const createInternationalScientificCongressGalleryRegistry: RouteConfig =
  {
    method: 'post',
    path: '/international-scientific-congress/{congressId}/gallery',
    tags: ['International Scientific Congress Gallery'],
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

export const findInternationalScientificCongressGalleriesByCongressIdRegistry: RouteConfig =
  {
    method: 'get',
    path: '/international-scientific-congress/{congressId}/gallery',
    tags: ['International Scientific Congress Gallery'],
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

export const findInternationalScientificCongressGalleryByIdRegistry: RouteConfig =
  {
    method: 'get',
    path: '/international-scientific-congress/gallery/{id}',
    tags: ['International Scientific Congress Gallery'],
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

export const updateInternationalScientificCongressGalleryRegistry: RouteConfig =
  {
    method: 'put',
    path: '/international-scientific-congress/gallery/{id}',
    tags: ['International Scientific Congress Gallery'],
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

export const deleteInternationalScientificCongressGalleryRegistry: RouteConfig =
  {
    method: 'delete',
    path: '/international-scientific-congress/gallery/{id}',
    tags: ['International Scientific Congress Gallery'],
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
