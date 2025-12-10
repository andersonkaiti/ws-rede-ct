import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { createLawSchema } from '../controllers/law/create-law-controller.ts'
import { deleteLawSchema } from '../controllers/law/delete-law-controller.ts'
import { findLawByIdSchema } from '../controllers/law/find-law-by-id-controller.ts'
import { updateLawSchema } from '../controllers/law/update-law-controller.ts'

const lawSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  link: z.string(),
  country: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createLawRegistry: RouteConfig = {
  method: 'post',
  path: '/law',
  tags: ['Laws'],
  summary: 'Create a new Law',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createLawSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Law created successfully',
      summary: 'Law Created',
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

export const findLawsRegistry: RouteConfig = {
  method: 'get',
  path: '/law',
  tags: ['Laws'],
  summary: 'List all Laws with filters',
  request: {
    query: z.object({
      page: z.coerce.number().optional(),
      limit: z.coerce.number().optional(),
      title: z.string().optional(),
      country: z.string().optional(),
      orderBy: z.enum(['asc', 'desc']).optional(),
    }),
  },
  responses: {
    200: {
      description: 'List of Laws retrieved successfully',
      summary: 'Laws Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            laws: z.array(lawSchema),
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

export const findLawByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/law/{id}',
  tags: ['Laws'],
  summary: 'Find Law by ID',
  request: {
    params: findLawByIdSchema,
  },
  responses: {
    200: {
      description: 'Law details retrieved successfully',
      summary: 'Law Retrieved',
      content: {
        'application/json': {
          schema: lawSchema,
        },
      },
    },
    400: {
      description: 'Invalid Law ID format',
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
      description: 'Law not found with the provided ID',
      summary: 'Law Not Found',
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

export const updateLawRegistry: RouteConfig = {
  method: 'put',
  path: '/law/{id}',
  tags: ['Laws'],
  summary: 'Update Law',
  security: [{ bearerAuth: [] }],
  request: {
    params: findLawByIdSchema,
    body: {
      content: {
        'application/json': {
          schema: updateLawSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Law updated successfully',
      summary: 'Law Updated',
    },
    400: {
      description: 'Invalid input data or Law ID format',
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
      description: 'Law not found with the provided ID',
      summary: 'Law Not Found',
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

export const deleteLawRegistry: RouteConfig = {
  method: 'delete',
  path: '/law/{id}',
  tags: ['Laws'],
  summary: 'Delete Law',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteLawSchema,
  },
  responses: {
    200: {
      description: 'Law deleted successfully',
      summary: 'Law Deleted',
    },
    400: {
      description: 'Invalid Law ID format',
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
      description: 'Law not found with the provided ID',
      summary: 'Law Not Found',
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
