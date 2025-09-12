import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import { $Enums } from '@prisma/client'
import z from 'zod'
import { deleteUserSchema } from '../controllers/users/delete-user-controller.ts'
import { paramsSchema } from '../controllers/users/find-user-controller.ts'
import { updateUserSchema } from '../controllers/users/update-user-controller.ts'

export const findUserRegistry: RouteConfig = {
  method: 'get',
  path: '/users/{id}',
  tags: ['Users'],
  summary: 'Find user by ID',
  request: {
    params: paramsSchema,
  },
  responses: {
    200: {
      description: 'User details retrieved successfully',
      summary: 'User Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            id: z.string(),
            name: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
            role: z.enum($Enums.UserRole),
            lattesUrl: z.string().nullable(),
            orcid: z.string().nullable(),
            phone: z.string().nullable(),
            avatarUrl: z.url().nullable(),
            emailAddress: z.email(),
          }),
        },
      },
    },
    400: {
      description: 'Invalid user ID format',
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
      description: 'User not found with the provided ID',
      summary: 'User Not Found',
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

export const updateUserRegistry: RouteConfig = {
  method: 'put',
  path: '/users',
  tags: ['Users'],
  summary: 'Update authenticated user',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: updateUserSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'User profile updated successfully',
      summary: 'User Updated',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
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
    401: {
      description: 'User not authenticated or unauthorized',
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

export const deleteUserRegistry: RouteConfig = {
  method: 'delete',
  path: '/users',
  tags: ['Users'],
  summary: 'Delete authenticated user',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteUserSchema,
  },
  responses: {
    200: {
      description: 'User account deleted successfully',
      summary: 'User Deleted',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description: 'Invalid request parameters',
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
      description: 'User not authenticated or unauthorized',
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

export const findUsersRegistry: RouteConfig = {
  method: 'get',
  path: '/users',
  tags: ['Users'],
  summary: 'List users',
  responses: {
    200: {
      description: 'Complete list of users retrieved successfully',
      summary: 'Users Retrieved',
      content: {
        'application/json': {
          schema: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
              role: z.enum($Enums.UserRole),
              lattesUrl: z.url().nullable(),
              orcid: z.string().nullable(),
              phone: z.string().nullable(),
              avatarUrl: z.string().nullable(),
              emailAddress: z.email(),
            })
          ),
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
