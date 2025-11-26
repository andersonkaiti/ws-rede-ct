import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { createPartnerSchema } from '../controllers/partners/create-partner-controller.ts'
import { deletePartnerSchema } from '../controllers/partners/delete-partner-controller.ts'
import { findPartnerByIdSchema } from '../controllers/partners/find-partner-by-id-controller.ts'
import { findPartnersSchema } from '../controllers/partners/find-partners-controller.ts'
import { updatePartnerSchema } from '../controllers/partners/update-partner-controller.ts'

const partnerSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  logoUrl: z.string(),
  description: z.string().nullable(),
  category: z.string().nullable(),
  since: z.date(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createPartnerRegistry: RouteConfig = {
  method: 'post',
  path: '/partner',
  tags: ['Partners'],
  summary: 'Create a new partner with logo upload',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: createPartnerSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Partner created successfully',
      summary: 'Partner Created',
    },
    400: {
      description:
        'Invalid input data, missing required fields, or invalid logo format/size',
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
    409: {
      description: 'Partner with this name already exists',
      summary: 'Conflict',
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

export const findPartnersRegistry: RouteConfig = {
  method: 'get',
  path: '/partner',
  tags: ['Partners'],
  summary: 'List all partners with pagination and filters',
  request: {
    query: findPartnersSchema,
  },
  responses: {
    200: {
      description: 'List of partners retrieved successfully with pagination',
      summary: 'Partners Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            partners: z.array(partnerSchema),
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

export const findPartnerByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/partner/{id}',
  tags: ['Partners'],
  summary: 'Find partner by ID',
  request: {
    params: findPartnerByIdSchema,
  },
  responses: {
    200: {
      description: 'Partner details retrieved successfully',
      summary: 'Partner Retrieved',
      content: {
        'application/json': {
          schema: partnerSchema,
        },
      },
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
    404: {
      description: 'Partner not found with the provided ID',
      summary: 'Partner Not Found',
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

export const updatePartnerRegistry: RouteConfig = {
  method: 'put',
  path: '/partner/{id}',
  tags: ['Partners'],
  summary: 'Update partner with optional logo upload',
  security: [{ bearerAuth: [] }],
  request: {
    params: findPartnerByIdSchema,
    body: {
      content: {
        'multipart/form-data': {
          schema: updatePartnerSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Partner updated successfully',
      summary: 'Partner Updated',
    },
    400: {
      description:
        'Invalid input data, partner ID format, or invalid logo format/size',
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
      description: 'Partner not found with the provided ID',
      summary: 'Partner Not Found',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    409: {
      description: 'Partner with this name already exists',
      summary: 'Conflict',
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

export const deletePartnerRegistry: RouteConfig = {
  method: 'delete',
  path: '/partner/{id}',
  tags: ['Partners'],
  summary: 'Delete partner',
  security: [{ bearerAuth: [] }],
  request: {
    params: deletePartnerSchema,
  },
  responses: {
    200: {
      description: 'Partner deleted successfully',
      summary: 'Partner Deleted',
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
      description: 'Partner not found with the provided ID',
      summary: 'Partner Not Found',
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
