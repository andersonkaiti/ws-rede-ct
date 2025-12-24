import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { createInternationalScientificCongressPartnerSchema } from '../../controllers/international-scientific-congress-partner/create-international-scientific-congress-partner-controller.ts'
import { deleteInternationalScientificCongressPartnerSchema } from '../../controllers/international-scientific-congress-partner/delete-international-scientific-congress-partner-controller.ts'
import { findInternationalScientificCongressPartnersByCongressIdSchema } from '../../controllers/international-scientific-congress-partner/find-international-scientific-congress-partners-by-congress-id-controller.ts'
import { updateInternationalScientificCongressPartnerSchema } from '../../controllers/international-scientific-congress-partner/update-international-scientific-congress-partner-controller.ts'

const congressPartnerSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  logoUrl: z.string().nullable(),
  congressId: z.uuid(),
})

export const createCongressPartnerRegistry: RouteConfig = {
  method: 'post',
  path: '/international-scientific-congress/{congressId}/partner',
  tags: ['International Scientific Congresses'],
  summary: 'Create a new congress partner',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      congressId: z.uuid(),
    }),
    body: {
      content: {
        'application/json': {
          schema: createInternationalScientificCongressPartnerSchema.omit({
            id: true,
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Congress partner created successfully',
      summary: 'Congress Partner Created',
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

export const findCongressPartnersByCongressIdRegistry: RouteConfig = {
  method: 'get',
  path: '/international-scientific-congress/{congressId}/partner',
  tags: ['International Scientific Congresses'],
  summary: 'Find congress partners by congress ID',
  request: {
    params: findInternationalScientificCongressPartnersByCongressIdSchema,
  },
  responses: {
    200: {
      description: 'Congress partners retrieved successfully by congress ID',
      summary: 'Congress Partners Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number().optional(),
            limit: z.number().optional(),
            partners: z.array(congressPartnerSchema),
          }),
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

export const updateCongressPartnerRegistry: RouteConfig = {
  method: 'put',
  path: '/international-scientific-congress/partner/{id}',
  tags: ['International Scientific Congresses'],
  summary: 'Update congress partner',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteInternationalScientificCongressPartnerSchema,
    body: {
      content: {
        'application/json': {
          schema: updateInternationalScientificCongressPartnerSchema.omit({
            id: true,
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Congress partner updated successfully',
      summary: 'Congress Partner Updated',
    },
    400: {
      description: 'Invalid input data or partner ID format',
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
      description: 'Congress partner not found with the provided ID',
      summary: 'Congress Partner Not Found',
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

export const deleteCongressPartnerRegistry: RouteConfig = {
  method: 'delete',
  path: '/international-scientific-congress/partner/{id}',
  tags: ['International Scientific Congresses'],
  summary: 'Delete congress partner',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteInternationalScientificCongressPartnerSchema,
  },
  responses: {
    200: {
      description: 'Congress partner deleted successfully',
      summary: 'Congress Partner Deleted',
    },
    400: {
      description: 'Invalid partner ID format',
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
      description: 'Congress partner not found with the provided ID',
      summary: 'Congress Partner Not Found',
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
