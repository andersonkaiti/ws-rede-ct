import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { UserRole } from '../../config/database/generated/enums.ts'
import { createManagementTeamSchema } from '../controllers/management-team/create-management-team-controller.ts'
import { deleteManagementTeamSchema } from '../controllers/management-team/delete-management-team-controller.ts'
import { findManagementTeamByIdSchema } from '../controllers/management-team/find-management-team-by-id-controller.ts'
import { updateManagementTeamSchema } from '../controllers/management-team/update-management-team-controller.ts'

const userSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  emailAddress: z.string(),
  avatarUrl: z.string().nullable(),
  orcid: z.string().nullable(),
  phone: z.string().nullable(),
  lattesUrl: z.string().nullable(),
  role: z.enum(UserRole),
})

const memberSchema = z.object({
  id: z.uuid(),
  role: z.string(),
  description: z.string().nullable(),
  order: z.number(),
  teamId: z.uuid(),
  userId: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: userSchema,
})

const managementTeamSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  members: z.array(memberSchema),
})

export const createManagementTeamRegistry: RouteConfig = {
  method: 'post',
  path: '/management-team',
  tags: ['Management Teams'],
  summary: 'Create a new Management Team with multiple members',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createManagementTeamSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Management Team created successfully',
      summary: 'Management Team Created',
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
    409: {
      description: 'Management Team with this name already exists',
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

export const findManagementTeamsRegistry: RouteConfig = {
  method: 'get',
  path: '/management-team',
  tags: ['Management Teams'],
  summary: 'List all Management Teams with filters',
  request: {
    query: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      orderBy: z.enum(['asc', 'desc']).default('desc'),
    }),
  },
  responses: {
    200: {
      description: 'List of Management Teams retrieved successfully',
      summary: 'Management Teams Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            teams: z.array(managementTeamSchema),
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

export const findManagementTeamByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/management-team/{id}',
  tags: ['Management Teams'],
  summary: 'Find Management Team by ID',
  request: {
    params: findManagementTeamByIdSchema,
  },
  responses: {
    200: {
      description: 'Management Team details retrieved successfully',
      summary: 'Management Team Retrieved',
      content: {
        'application/json': {
          schema: managementTeamSchema,
        },
      },
    },
    400: {
      description: 'Invalid Management Team ID format',
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
      description: 'Management Team not found with the provided ID',
      summary: 'Management Team Not Found',
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

export const updateManagementTeamRegistry: RouteConfig = {
  method: 'put',
  path: '/management-team/{id}',
  tags: ['Management Teams'],
  summary: 'Update Management Team and manage member relationships',
  security: [{ bearerAuth: [] }],
  request: {
    params: findManagementTeamByIdSchema,
    body: {
      content: {
        'application/json': {
          schema: updateManagementTeamSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Management Team updated successfully',
      summary: 'Management Team Updated',
    },
    400: {
      description: 'Invalid input data or Management Team ID format',
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
      description: 'Management Team not found with the provided ID',
      summary: 'Management Team Not Found',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    409: {
      description: 'Management Team with this name already exists',
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

export const deleteManagementTeamRegistry: RouteConfig = {
  method: 'delete',
  path: '/management-team/{id}',
  tags: ['Management Teams'],
  summary: 'Delete Management Team',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteManagementTeamSchema,
  },
  responses: {
    200: {
      description: 'Management Team deleted successfully',
      summary: 'Management Team Deleted',
    },
    400: {
      description: 'Invalid Management Team ID format',
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
      description: 'Management Team not found with the provided ID',
      summary: 'Management Team Not Found',
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
