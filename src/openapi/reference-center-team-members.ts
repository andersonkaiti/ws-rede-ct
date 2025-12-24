import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { UserRole } from '../../config/database/generated/enums.ts'
import { createReferenceCenterTeamMemberSchema } from '../controllers/reference-center-team-member/create-reference-center-team-member-controller.ts'
import { deleteReferenceCenterTeamMemberSchema } from '../controllers/reference-center-team-member/delete-reference-center-team-member-controller.ts'
import { findReferenceCenterTeamMemberByIdSchema } from '../controllers/reference-center-team-member/find-reference-center-team-member-by-id-controller.ts'
import { updateReferenceCenterTeamMemberSchema } from '../controllers/reference-center-team-member/update-reference-center-team-member-controller.ts'

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

const referenceCenterTeamMemberSchema = z.object({
  id: z.uuid(),
  role: z.string(),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.uuid(),
  user: userSchema,
})

export const createReferenceCenterTeamMemberRegistry: RouteConfig = {
  method: 'post',
  path: '/reference-center-team-member',
  tags: ['Reference Center Team Members'],
  summary: 'Create a new Reference Center Team Member',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createReferenceCenterTeamMemberSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Reference Center Team Member created successfully',
      summary: 'Reference Center Team Member Created',
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

export const findReferenceCenterTeamMembersRegistry: RouteConfig = {
  method: 'get',
  path: '/reference-center-team-member',
  tags: ['Reference Center Team Members'],
  summary: 'List all Reference Center Team Members with filters',
  request: {
    query: z.object({
      role: z.string().optional(),
      orderBy: z.enum(['asc', 'desc']).default('desc'),
    }),
  },
  responses: {
    200: {
      description:
        'List of Reference Center Team Members retrieved successfully',
      summary: 'Reference Center Team Members Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            members: z.array(referenceCenterTeamMemberSchema),
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

export const findReferenceCenterTeamMemberByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/reference-center-team-member/{id}',
  tags: ['Reference Center Team Members'],
  summary: 'Find Reference Center Team Member by ID',
  request: {
    params: findReferenceCenterTeamMemberByIdSchema,
  },
  responses: {
    200: {
      description:
        'Reference Center Team Member details retrieved successfully',
      summary: 'Reference Center Team Member Retrieved',
      content: {
        'application/json': {
          schema: referenceCenterTeamMemberSchema,
        },
      },
    },
    400: {
      description: 'Invalid Reference Center Team Member ID format',
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
      description:
        'Reference Center Team Member not found with the provided ID',
      summary: 'Reference Center Team Member Not Found',
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

export const updateReferenceCenterTeamMemberRegistry: RouteConfig = {
  method: 'put',
  path: '/reference-center-team-member/{id}',
  tags: ['Reference Center Team Members'],
  summary: 'Update Reference Center Team Member',
  security: [{ bearerAuth: [] }],
  request: {
    params: findReferenceCenterTeamMemberByIdSchema,
    body: {
      content: {
        'application/json': {
          schema: updateReferenceCenterTeamMemberSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Reference Center Team Member updated successfully',
      summary: 'Reference Center Team Member Updated',
    },
    400: {
      description:
        'Invalid input data or Reference Center Team Member ID format',
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
      description:
        'Reference Center Team Member not found with the provided ID',
      summary: 'Reference Center Team Member Not Found',
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

export const deleteReferenceCenterTeamMemberRegistry: RouteConfig = {
  method: 'delete',
  path: '/reference-center-team-member/{id}',
  tags: ['Reference Center Team Members'],
  summary: 'Delete Reference Center Team Member',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteReferenceCenterTeamMemberSchema,
  },
  responses: {
    200: {
      description: 'Reference Center Team Member deleted successfully',
      summary: 'Reference Center Team Member Deleted',
    },
    400: {
      description: 'Invalid Reference Center Team Member ID format',
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
      description:
        'Reference Center Team Member not found with the provided ID',
      summary: 'Reference Center Team Member Not Found',
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
