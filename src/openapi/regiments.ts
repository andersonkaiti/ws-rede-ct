import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { RegimentStatus } from '../../config/database/generated/enums.ts'
import { createRegimentSchema } from '../controllers/regiment/create-regiment-controller.ts'
import { deleteRegimentSchema } from '../controllers/regiment/delete-regiment-controller.ts'
import { findRegimentByIdSchema } from '../controllers/regiment/find-regiment-by-id-controller.ts'
import { findRegimentByStatusSchema } from '../controllers/regiment/find-regiment-by-status-controller.ts'
import { findRegimentSchema } from '../controllers/regiment/find-regiments-controller.ts'
import { updateRegimentSchema } from '../controllers/regiment/update-regiment-controller.ts'

const regimentSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  version: z.string(),
  publishedAt: z.date(),
  documentUrl: z.string(),
  status: z.nativeEnum(RegimentStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createRegimentRegistry: RouteConfig = {
  method: 'post',
  path: '/regiment',
  tags: ['Regiments'],
  summary: 'Create a new regiment with document upload',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: createRegimentSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Regiment created successfully',
      summary: 'Regiment Created',
    },
    400: {
      description:
        'Invalid input data, missing required fields, or invalid document format/size',
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

export const findRegimentsRegistry: RouteConfig = {
  method: 'get',
  path: '/regiment',
  tags: ['Regiments'],
  summary: 'List all regiments with pagination and filters',
  request: {
    query: findRegimentSchema,
  },
  responses: {
    200: {
      description: 'List of regiments retrieved successfully with pagination',
      summary: 'Regiments Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            regiments: z.array(regimentSchema),
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

export const findRegimentByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/regiment/{id}',
  tags: ['Regiments'],
  summary: 'Find regiment by ID',
  request: {
    params: findRegimentByIdSchema,
  },
  responses: {
    200: {
      description: 'Regiment details retrieved successfully',
      summary: 'Regiment Retrieved',
      content: {
        'application/json': {
          schema: regimentSchema,
        },
      },
    },
    400: {
      description: 'Invalid regiment ID format',
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
      description: 'Regiment not found with the provided ID',
      summary: 'Regiment Not Found',
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

export const findRegimentByStatusRegistry: RouteConfig = {
  method: 'get',
  path: '/regiment/status/{status}',
  tags: ['Regiments'],
  summary: 'Find regiments by status',
  request: {
    params: findRegimentByStatusSchema,
  },
  responses: {
    200: {
      description: 'Regiments retrieved successfully by status',
      summary: 'Regiments Retrieved by Status',
      content: {
        'application/json': {
          schema: z.array(regimentSchema),
        },
      },
    },
    400: {
      description: 'Invalid status parameter provided',
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

export const updateRegimentRegistry: RouteConfig = {
  method: 'put',
  path: '/regiment/{id}',
  tags: ['Regiments'],
  summary: 'Update regiment with optional document upload',
  security: [{ bearerAuth: [] }],
  request: {
    params: findRegimentByIdSchema,
    body: {
      content: {
        'multipart/form-data': {
          schema: updateRegimentSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Regiment updated successfully',
      summary: 'Regiment Updated',
    },
    400: {
      description:
        'Invalid input data, regiment ID format, or invalid document format/size',
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
      description: 'Regiment not found with the provided ID',
      summary: 'Regiment Not Found',
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

export const deleteRegimentRegistry: RouteConfig = {
  method: 'delete',
  path: '/regiment/{id}',
  tags: ['Regiments'],
  summary: 'Delete regiment',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteRegimentSchema,
  },
  responses: {
    200: {
      description: 'Regiment deleted successfully',
      summary: 'Regiment Deleted',
    },
    400: {
      description: 'Invalid regiment ID format',
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
      description: 'Regiment not found with the provided ID',
      summary: 'Regiment Not Found',
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
