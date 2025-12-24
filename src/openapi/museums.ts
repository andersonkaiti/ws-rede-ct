import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { createMuseumSchema } from '../controllers/museums/create-museum-controller.ts'
import { deleteMuseumSchema } from '../controllers/museums/delete-museum-controller.ts'
import { findMuseumByIdSchema } from '../controllers/museums/find-museum-by-id-controller.ts'
import { findMuseumsSchema } from '../controllers/museums/find-museums-controller.ts'
import { updateMuseumSchema } from '../controllers/museums/update-museum-controller.ts'

const museumSchema = z.object({
  id: z.uuid(),
  logoUrl: z.string().nullable(),
  name: z.string(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  country: z.string().nullable(),
  description: z.string().nullable(),
  website: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  functioning: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createMuseumRegistry: RouteConfig = {
  method: 'post',
  path: '/museum',
  tags: ['Museums'],
  summary: 'Create a new museum with logo upload',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: createMuseumSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Museum created successfully',
      summary: 'Museum Created',
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
      description: 'Museum with this name already exists',
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

export const findMuseumsRegistry: RouteConfig = {
  method: 'get',
  path: '/museum',
  tags: ['Museums'],
  summary: 'List all museums with pagination and filters',
  request: {
    query: findMuseumsSchema,
  },
  responses: {
    200: {
      description: 'List of museums retrieved successfully with pagination',
      summary: 'Museums Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number().optional(),
            limit: z.number().optional(),
            museums: z.array(museumSchema),
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

export const findMuseumByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/museum/{id}',
  tags: ['Museums'],
  summary: 'Find museum by ID',
  request: {
    params: findMuseumByIdSchema,
  },
  responses: {
    200: {
      description: 'Museum details retrieved successfully',
      summary: 'Museum Retrieved',
      content: {
        'application/json': {
          schema: museumSchema,
        },
      },
    },
    400: {
      description: 'Invalid museum ID format',
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
      description: 'Museum not found with the provided ID',
      summary: 'Museum Not Found',
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

export const updateMuseumRegistry: RouteConfig = {
  method: 'put',
  path: '/museum/{id}',
  tags: ['Museums'],
  summary: 'Update museum with optional logo upload',
  security: [{ bearerAuth: [] }],
  request: {
    params: findMuseumByIdSchema,
    body: {
      content: {
        'multipart/form-data': {
          schema: updateMuseumSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Museum updated successfully',
      summary: 'Museum Updated',
    },
    400: {
      description:
        'Invalid input data, museum ID format, or invalid logo format/size',
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
      description: 'Museum not found with the provided ID',
      summary: 'Museum Not Found',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    409: {
      description: 'Museum with this name already exists',
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

export const deleteMuseumRegistry: RouteConfig = {
  method: 'delete',
  path: '/museum/{id}',
  tags: ['Museums'],
  summary: 'Delete museum',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteMuseumSchema,
  },
  responses: {
    200: {
      description: 'Museum deleted successfully',
      summary: 'Museum Deleted',
    },
    400: {
      description: 'Invalid museum ID format',
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
      description: 'Museum not found with the provided ID',
      summary: 'Museum Not Found',
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
