import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { createRegionalCongressPartnerSchema } from '../../controllers/regional-congress-partner/create-regional-congress-partner-controller.ts'
import { deleteRegionalCongressPartnerSchema } from '../../controllers/regional-congress-partner/delete-regional-congress-partner-controller.ts'
import { findRegionalCongressPartnersByCongressIdSchema } from '../../controllers/regional-congress-partner/find-regional-congress-partners-by-congress-id-controller.ts'
import { updateRegionalCongressPartnerSchema } from '../../controllers/regional-congress-partner/update-regional-congress-partner-controller.ts'

const congressPartnerSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  logoUrl: z.string().nullable(),
  congressId: z.uuid(),
})

export const createCongressPartnerRegistry: RouteConfig = {
  method: 'post',
  path: '/regional-congress/{congressId}/partner',
  tags: ['Regional Congresses'],
  summary: 'Create a new congress partner',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      congressId: z.uuid(),
    }),
    body: {
      content: {
        'application/json': {
          schema: createRegionalCongressPartnerSchema.omit({
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
  path: '/regional-congress/{congressId}/partner',
  tags: ['Regional Congresses'],
  summary: 'Find congress partners by congress ID',
  request: {
    params: findRegionalCongressPartnersByCongressIdSchema,
  },
  responses: {
    200: {
      description: 'Congress partners retrieved successfully by congress ID',
      summary: 'Congress Partners Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            limit: z.number().optional(),
            total: z.number(),
            totalPages: z.number(),
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
  path: '/regional-congress/partner/{id}',
  tags: ['Regional Congresses'],
  summary: 'Update congress partner',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteRegionalCongressPartnerSchema,
    body: {
      content: {
        'application/json': {
          schema: updateRegionalCongressPartnerSchema.omit({
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
  path: '/regional-congress/partner/{id}',
  tags: ['Regional Congresses'],
  summary: 'Delete congress partner',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteRegionalCongressPartnerSchema,
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
