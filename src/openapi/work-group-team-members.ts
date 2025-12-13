import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { UserRole } from '../../config/database/generated/enums.ts'
import { createWorkGroupTeamMemberSchema } from '../controllers/work-group-team-member/create-work-group-team-member-controller.ts'
import { deleteWorkGroupTeamMemberSchema } from '../controllers/work-group-team-member/delete-work-group-team-member-controller.ts'
import { findWorkGroupTeamMemberByIdSchema } from '../controllers/work-group-team-member/find-work-group-team-member-by-id-controller.ts'
import { updateWorkGroupTeamMemberSchema } from '../controllers/work-group-team-member/update-work-group-team-member-controller.ts'

const userSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  emailAddress: z.string(),
  avatarUrl: z.string().nullable(),
  orcid: z.string().nullable(),
  phone: z.string().nullable(),
  lattesUrl: z.string().nullable(),
  role: z.nativeEnum(UserRole),
})

const workGroupTeamMemberSchema = z.object({
  id: z.uuid(),
  role: z.string(),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.uuid(),
  user: userSchema,
})

export const createWorkGroupTeamMemberRegistry: RouteConfig = {
  method: 'post',
  path: '/work-group-team-member',
  tags: ['Work Group Team Members'],
  summary: 'Create a new Work Group Team Member',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createWorkGroupTeamMemberSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Work Group Team Member created successfully',
      summary: 'Work Group Team Member Created',
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

export const findWorkGroupTeamMembersRegistry: RouteConfig = {
  method: 'get',
  path: '/work-group-team-member',
  tags: ['Work Group Team Members'],
  summary: 'List all Work Group Team Members with filters',
  request: {
    query: z.object({
      role: z.string().optional(),
      orderBy: z.enum(['asc', 'desc']).optional(),
    }),
  },
  responses: {
    200: {
      description: 'List of Work Group Team Members retrieved successfully',
      summary: 'Work Group Team Members Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            members: z.array(workGroupTeamMemberSchema),
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

export const findWorkGroupTeamMemberByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/work-group-team-member/{id}',
  tags: ['Work Group Team Members'],
  summary: 'Find Work Group Team Member by ID',
  request: {
    params: findWorkGroupTeamMemberByIdSchema,
  },
  responses: {
    200: {
      description: 'Work Group Team Member details retrieved successfully',
      summary: 'Work Group Team Member Retrieved',
      content: {
        'application/json': {
          schema: workGroupTeamMemberSchema,
        },
      },
    },
    400: {
      description: 'Invalid Work Group Team Member ID format',
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
      description: 'Work Group Team Member not found with the provided ID',
      summary: 'Work Group Team Member Not Found',
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

export const updateWorkGroupTeamMemberRegistry: RouteConfig = {
  method: 'put',
  path: '/work-group-team-member/{id}',
  tags: ['Work Group Team Members'],
  summary: 'Update Work Group Team Member',
  security: [{ bearerAuth: [] }],
  request: {
    params: findWorkGroupTeamMemberByIdSchema,
    body: {
      content: {
        'application/json': {
          schema: updateWorkGroupTeamMemberSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Work Group Team Member updated successfully',
      summary: 'Work Group Team Member Updated',
    },
    400: {
      description: 'Invalid input data or Work Group Team Member ID format',
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
      description: 'Work Group Team Member not found with the provided ID',
      summary: 'Work Group Team Member Not Found',
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

export const deleteWorkGroupTeamMemberRegistry: RouteConfig = {
  method: 'delete',
  path: '/work-group-team-member/{id}',
  tags: ['Work Group Team Members'],
  summary: 'Delete Work Group Team Member',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteWorkGroupTeamMemberSchema,
  },
  responses: {
    200: {
      description: 'Work Group Team Member deleted successfully',
      summary: 'Work Group Team Member Deleted',
    },
    400: {
      description: 'Invalid Work Group Team Member ID format',
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
      description: 'Work Group Team Member not found with the provided ID',
      summary: 'Work Group Team Member Not Found',
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
