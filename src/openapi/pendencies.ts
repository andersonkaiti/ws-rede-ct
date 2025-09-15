import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import { $Enums } from '@prisma/client'
import z from 'zod'
import { createPendencySchema } from '../controllers/pendencies/create-pendency-controller.ts'
import { deletePendencySchema } from '../controllers/pendencies/delete-pendency-controller.ts'
import { findPendenciesControllerSchema } from '../controllers/pendencies/find-pendencies-controller.ts'
import { findPendencyByIdControllerSchema } from '../controllers/pendencies/find-pendency-by-id-controller.ts'
import { updatePendencySchema } from '../controllers/pendencies/update-pendency-controller.ts'

export const createPendencyRegistry: RouteConfig = {
  method: 'post',
  path: '/pendency/{user_id}',
  tags: ['Pendencies'],
  summary: 'Create pendency for user',
  security: [{ bearerAuth: [] }],
  request: {
    params: createPendencySchema
      .pick({ userId: true })
      .transform(() => ({ user_id: '' })),
    body: {
      content: {
        'multipart/form-data': {
          schema: createPendencySchema.omit({
            userId: true,
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Pendency created successfully for the user',
      summary: 'Pendency Created',
      content: {
        'application/json': {
          schema: z.object({}),
        },
      },
    },
    400: {
      description: 'Invalid input data or file format',
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

export const findPendenciesRegistry: RouteConfig = {
  method: 'get',
  path: '/pendency',
  tags: ['Pendencies'],
  summary: 'List pendencies',
  security: [{ bearerAuth: [] }],
  request: {
    query: findPendenciesControllerSchema,
  },
  responses: {
    200: {
      description: 'Paginated list of pendencies retrieved successfully',
      summary: 'Pendencies Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            pendencies: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                description: z.string().nullable(),
                status: z.enum($Enums.PendencyStatus),
                dueDate: z.date().nullable(),
                documentUrl: z.string(),
                userId: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
              })
            ),
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

export const findPendencyByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/pendency/{pendency_id}',
  tags: ['Pendencies'],
  summary: 'Find pendency by ID',
  security: [{ bearerAuth: [] }],
  request: {
    params: findPendencyByIdControllerSchema,
  },
  responses: {
    200: {
      description: 'Pendency details retrieved successfully',
      summary: 'Pendency Retrieved',
      content: {
        'application/json': {
          schema: z
            .object({
              id: z.string(),
              title: z.string(),
              description: z.string().nullable(),
              status: z.enum($Enums.PendencyStatus),
              dueDate: z.date().nullable(),
              documentUrl: z.string(),
              userId: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
            })
            .nullable(),
        },
      },
    },
    400: {
      description: 'Invalid pendency ID format',
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
      description: 'Pendency not found with the provided ID',
      summary: 'Pendency Not Found',
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

export const updatePendencyRegistry: RouteConfig = {
  method: 'put',
  path: '/pendency/{pendency_id}',
  tags: ['Pendencies'],
  summary: 'Update pendency',
  security: [{ bearerAuth: [] }],
  request: {
    params: updatePendencySchema
      .pick({ id: true })
      .transform(() => ({ pendency_id: '' })),
    body: {
      content: {
        'multipart/form-data': {
          schema: updatePendencySchema.omit({
            id: true,
          }),
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Pendency updated successfully',
      summary: 'Pendency Updated',
    },
    400: {
      description: 'Invalid input data or pendency does not exist',
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

export const deletePendencyRegistry: RouteConfig = {
  method: 'delete',
  path: '/pendency/{pendency_id}',
  tags: ['Pendencies'],
  summary: 'Delete pendency',
  security: [{ bearerAuth: [] }],
  request: {
    params: deletePendencySchema,
  },
  responses: {
    204: {
      description: 'Pendency deleted successfully',
      summary: 'Pendency Deleted',
    },
    400: {
      description: 'Invalid pendency ID format',
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
      description: 'Pendency not found with the provided ID',
      summary: 'Pendency Not Found',
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
