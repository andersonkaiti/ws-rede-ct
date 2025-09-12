import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { createTeamSchema } from '../controllers/team/create-team-controller.ts'
import { findTeamByIdSchema } from '../controllers/team/find-team-by-id-controller.ts'
import { findTeamsByTypeSchema } from '../controllers/team/find-team-by-type-controller.ts'
import { updateTeamBodySchema } from '../controllers/team/update-team-controller.ts'

export const createTeamRegistry: RouteConfig = {
  method: 'post',
  path: '/team',
  tags: ['Teams'],
  summary: 'Create team',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createTeamSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Team created successfully',
      summary: 'Team Created',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description: 'Invalid input data provided',
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

export const updateTeamRegistry: RouteConfig = {
  method: 'put',
  path: '/team/{id}',
  tags: ['Teams'],
  summary: 'Update team',
  security: [{ bearerAuth: [] }],
  request: {
    params: findTeamByIdSchema,
    body: {
      content: {
        'application/json': {
          schema: updateTeamBodySchema,
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Team updated successfully',
      summary: 'Team Updated',
    },
    400: {
      description: 'Invalid input data or team ID format',
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
      description: 'Team not found with the provided ID',
      summary: 'Team Not Found',
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

export const deleteTeamRegistry: RouteConfig = {
  method: 'delete',
  path: '/team/{id}',
  tags: ['Teams'],
  summary: 'Delete team',
  security: [{ bearerAuth: [] }],
  request: {
    params: findTeamByIdSchema,
  },
  responses: {
    204: {
      description: 'Team deleted successfully',
      summary: 'Team Deleted',
    },
    400: {
      description: 'Invalid team ID format',
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
      description: 'Team not found with the provided ID',
      summary: 'Team Not Found',
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

export const findTeamByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/team/id/{id}',
  tags: ['Teams'],
  summary: 'Find team by ID',
  request: {
    params: findTeamByIdSchema,
  },
  responses: {
    200: {
      description: 'Team details retrieved successfully',
      summary: 'Team Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            type: z.string(),
            name: z.string(),
            id: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
            description: z.string().nullable(),
          }),
        },
      },
    },
    400: {
      description: 'Invalid team ID format',
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
      description: 'Team not found with the provided ID',
      summary: 'Team Not Found',
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

export const findTeamByTypeRegistry: RouteConfig = {
  method: 'get',
  path: '/team/type/{type}',
  tags: ['Teams'],
  summary: 'Find teams by type',
  request: {
    params: findTeamsByTypeSchema.pick({ type: true }),
  },
  responses: {
    200: {
      description: 'List of teams by type retrieved successfully',
      summary: 'Teams Retrieved',
      content: {
        'application/json': {
          schema: z
            .array(
              z.object({
                type: z.string(),
                name: z.string(),
                id: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
                description: z.string().nullable(),
              })
            )
            .nullable(),
        },
      },
    },
    400: {
      description: 'Invalid team type parameter',
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

export const findTeamsRegistry: RouteConfig = {
  method: 'get',
  path: '/team',
  tags: ['Teams'],
  summary: 'List teams',
  responses: {
    200: {
      description: 'Complete list of teams retrieved successfully',
      summary: 'Teams Retrieved',
      content: {
        'application/json': {
          schema: z.array(
            z.object({
              type: z.string(),
              name: z.string(),
              id: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
              description: z.string().nullable(),
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
