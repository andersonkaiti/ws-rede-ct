import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { InMemoriamRole } from '../../config/database/generated/enums.ts'
import { createInMemoriamSchema } from '../controllers/in-memoriam/create-in-memoriam-controller.ts'
import { deleteInMemoriamSchema } from '../controllers/in-memoriam/delete-in-memoriam-controller.ts'
import { findInMemoriamByIdSchema } from '../controllers/in-memoriam/find-in-memoriam-by-id-controller.ts'
import { findInMemoriamByRoleSchema } from '../controllers/in-memoriam/find-in-memoriam-by-role-controller.ts'
import { findInMemoriamSchema } from '../controllers/in-memoriam/find-in-memoriam-controller.ts'
import { updateInMemoriamSchema } from '../controllers/in-memoriam/update-in-memoriam-controller.ts'

const inMemoriamSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  birthDate: z.date(),
  deathDate: z.date(),
  biography: z.string().nullable(),
  photoUrl: z.string().nullable(),
  role: z.nativeEnum(InMemoriamRole),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createInMemoriamRegistry: RouteConfig = {
  method: 'post',
  path: '/in-memoriam',
  tags: ['In Memoriam'],
  summary: 'Create a new in memoriam record with optional photo upload',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: createInMemoriamSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'In memoriam record created successfully',
      summary: 'In Memoriam Created',
    },
    400: {
      description:
        'Invalid input data, missing required fields, or invalid photo format/size',
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
      description: 'In memoriam record with this name already exists',
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

export const findInMemoriamsRegistry: RouteConfig = {
  method: 'get',
  path: '/in-memoriam',
  tags: ['In Memoriam'],
  summary: 'List all in memoriam records with pagination and filters',
  request: {
    query: findInMemoriamSchema,
  },
  responses: {
    200: {
      description:
        'List of in memoriam records retrieved successfully with pagination',
      summary: 'In Memoriam Records Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            inMemoriam: z.array(inMemoriamSchema),
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

export const findInMemoriamByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/in-memoriam/{id}',
  tags: ['In Memoriam'],
  summary: 'Find in memoriam record by ID',
  request: {
    params: findInMemoriamByIdSchema,
  },
  responses: {
    200: {
      description: 'In memoriam record details retrieved successfully',
      summary: 'In Memoriam Record Retrieved',
      content: {
        'application/json': {
          schema: inMemoriamSchema,
        },
      },
    },
    400: {
      description: 'Invalid in memoriam record ID format',
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
      description: 'In memoriam record not found with the provided ID',
      summary: 'In Memoriam Record Not Found',
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

export const updateInMemoriamRegistry: RouteConfig = {
  method: 'put',
  path: '/in-memoriam/{id}',
  tags: ['In Memoriam'],
  summary: 'Update in memoriam record with optional photo upload',
  security: [{ bearerAuth: [] }],
  request: {
    params: findInMemoriamByIdSchema,
    body: {
      content: {
        'multipart/form-data': {
          schema: updateInMemoriamSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'In memoriam record updated successfully',
      summary: 'In Memoriam Record Updated',
    },
    400: {
      description:
        'Invalid input data, in memoriam record ID format, or invalid photo format/size',
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
      description: 'In memoriam record not found with the provided ID',
      summary: 'In Memoriam Record Not Found',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    409: {
      description: 'In memoriam record with this name already exists',
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

export const deleteInMemoriamRegistry: RouteConfig = {
  method: 'delete',
  path: '/in-memoriam/{id}',
  tags: ['In Memoriam'],
  summary: 'Delete in memoriam record',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteInMemoriamSchema,
  },
  responses: {
    200: {
      description: 'In memoriam record deleted successfully',
      summary: 'In Memoriam Record Deleted',
    },
    400: {
      description: 'Invalid in memoriam record ID format',
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
      description: 'In memoriam record not found with the provided ID',
      summary: 'In Memoriam Record Not Found',
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

export const findInMemoriamByRoleRegistry: RouteConfig = {
  method: 'get',
  path: '/in-memoriam/role/{role}',
  tags: ['In Memoriam'],
  summary: 'Find in memoriam records by role',
  request: {
    params: findInMemoriamByRoleSchema,
  },
  responses: {
    200: {
      description: 'In memoriam records retrieved successfully by role',
      summary: 'In Memoriam Records Retrieved by Role',
      content: {
        'application/json': {
          schema: z.array(inMemoriamSchema),
        },
      },
    },
    400: {
      description: 'Invalid role parameter provided',
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
