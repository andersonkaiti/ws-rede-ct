import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { createRedeCTHighlightSchema } from '../controllers/redect-highlights/create-redect-highlight-controller.ts'
import { deleteRedeCTHighlightSchema } from '../controllers/redect-highlights/delete-redect-highlight-controller.ts'
import { findRedeCTHighlightByIdSchema } from '../controllers/redect-highlights/find-redect-highlight-by-id-controller.ts'
import { findRedeCTHighlightsSchema } from '../controllers/redect-highlights/find-redect-highlights-controller.ts'
import { updateRedeCTHighlightSchema } from '../controllers/redect-highlights/update-redect-highlight-controller.ts'

const redectHighlightSchema = z.object({
  id: z.uuid(),
  type: z.enum(['PERSON', 'INSTITUTION']),
  name: z.string(),
  description: z.string().nullable(),
  honorableMention: z.string().nullable(),
  imageUrl: z.string().nullable(),
  honoredAt: z.date(),
  meritUrl: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createRedeCTHighlightRegistry: RouteConfig = {
  method: 'post',
  path: '/redect-highlight',
  tags: ['RedeCT Highlights'],
  summary: 'Create a new RedeCT highlight with image upload',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: createRedeCTHighlightSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'RedeCT highlight created successfully',
      summary: 'Highlight Created',
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

export const findRedeCTHighlightsRegistry: RouteConfig = {
  method: 'get',
  path: '/redect-highlight',
  tags: ['RedeCT Highlights'],
  summary: 'List all RedeCT highlights with pagination and filters',
  request: {
    query: findRedeCTHighlightsSchema,
  },
  responses: {
    200: {
      description:
        'List of RedeCT highlights retrieved successfully with pagination',
      summary: 'Highlights Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            highlights: z.array(redectHighlightSchema),
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

export const findRedeCTHighlightByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/redect-highlight/{id}',
  tags: ['RedeCT Highlights'],
  summary: 'Find RedeCT highlight by ID',
  request: {
    params: findRedeCTHighlightByIdSchema,
  },
  responses: {
    200: {
      description: 'RedeCT highlight details retrieved successfully',
      summary: 'Highlight Retrieved',
      content: {
        'application/json': {
          schema: redectHighlightSchema,
        },
      },
    },
    400: {
      description: 'Invalid highlight ID format',
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
      description: 'RedeCT highlight not found with the provided ID',
      summary: 'Highlight Not Found',
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

export const updateRedeCTHighlightRegistry: RouteConfig = {
  method: 'put',
  path: '/redect-highlight/{id}',
  tags: ['RedeCT Highlights'],
  summary: 'Update RedeCT highlight with optional image upload',
  security: [{ bearerAuth: [] }],
  request: {
    params: findRedeCTHighlightByIdSchema,
    body: {
      content: {
        'multipart/form-data': {
          schema: updateRedeCTHighlightSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'RedeCT highlight updated successfully',
      summary: 'Highlight Updated',
    },
    400: {
      description:
        'Invalid input data, highlight ID format, or invalid image format/size',
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
      description: 'RedeCT highlight not found with the provided ID',
      summary: 'Highlight Not Found',
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

export const deleteRedeCTHighlightRegistry: RouteConfig = {
  method: 'delete',
  path: '/redect-highlight/{id}',
  tags: ['RedeCT Highlights'],
  summary: 'Delete RedeCT highlight',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteRedeCTHighlightSchema,
  },
  responses: {
    200: {
      description: 'RedeCT highlight deleted successfully',
      summary: 'Highlight Deleted',
    },
    400: {
      description: 'Invalid highlight ID format',
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
      description: 'RedeCT highlight not found with the provided ID',
      summary: 'Highlight Not Found',
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
