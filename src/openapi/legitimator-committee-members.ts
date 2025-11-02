import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import { $Enums } from '@prisma/client'
import z from 'zod'
import { createLegitimatorCommitteeMemberSchema } from '../controllers/legitimator-committee-member/create-legitimator-committee-member-controller.ts'
import { deleteLegitimatorCommitteeMemberSchema } from '../controllers/legitimator-committee-member/delete-legitimator-committee-member-controller.ts'
import { findLegitimatorCommitteeMemberByIdSchema } from '../controllers/legitimator-committee-member/find-legitimator-committee-member-by-id-controller.ts'
import { updateLegitimatorCommitteeMemberSchema } from '../controllers/legitimator-committee-member/update-legitimator-committee-member-controller.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 9

const userSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  emailAddress: z.string(),
  avatarUrl: z.string().nullable(),
  orcid: z.string().nullable(),
  phone: z.string().nullable(),
  lattesUrl: z.string().nullable(),
  role: z.enum($Enums.UserRole),
})

const legitimatorCommitteeMemberSchema = z.object({
  id: z.uuid(),
  role: z.string(),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.uuid(),
  user: userSchema,
})

export const createLegitimatorCommitteeMemberRegistry: RouteConfig = {
  method: 'post',
  path: '/legitimator-committee-member',
  tags: ['Legitimator Committee Members'],
  summary: 'Create a new Legitimator Committee Member',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createLegitimatorCommitteeMemberSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Legitimator Committee Member created successfully',
      summary: 'Legitimator Committee Member Created',
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

export const findLegitimatorCommitteeMembersRegistry: RouteConfig = {
  method: 'get',
  path: '/legitimator-committee-member',
  tags: ['Legitimator Committee Members'],
  summary: 'List all Legitimator Committee Members with pagination and filters',
  request: {
    query: z.object({
      page: z.coerce.number().min(1).default(DEFAULT_PAGE).optional(),
      limit: z.coerce.number().min(1).default(DEFAULT_LIMIT).optional(),
      role: z.string().optional(),
      orderBy: z.enum(['asc', 'desc']).optional(),
    }),
  },
  responses: {
    200: {
      description: 'List of Legitimator Committee Members retrieved successfully with pagination',
      summary: 'Legitimator Committee Members Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            members: z.array(legitimatorCommitteeMemberSchema),
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

export const findLegitimatorCommitteeMemberByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/legitimator-committee-member/{id}',
  tags: ['Legitimator Committee Members'],
  summary: 'Find Legitimator Committee Member by ID',
  request: {
    params: findLegitimatorCommitteeMemberByIdSchema,
  },
  responses: {
    200: {
      description: 'Legitimator Committee Member details retrieved successfully',
      summary: 'Legitimator Committee Member Retrieved',
      content: {
        'application/json': {
          schema: legitimatorCommitteeMemberSchema,
        },
      },
    },
    400: {
      description: 'Invalid Legitimator Committee Member ID format',
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
      description: 'Legitimator Committee Member not found with the provided ID',
      summary: 'Legitimator Committee Member Not Found',
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

export const updateLegitimatorCommitteeMemberRegistry: RouteConfig = {
  method: 'put',
  path: '/legitimator-committee-member/{id}',
  tags: ['Legitimator Committee Members'],
  summary: 'Update Legitimator Committee Member',
  security: [{ bearerAuth: [] }],
  request: {
    params: findLegitimatorCommitteeMemberByIdSchema,
    body: {
      content: {
        'application/json': {
          schema: updateLegitimatorCommitteeMemberSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Legitimator Committee Member updated successfully',
      summary: 'Legitimator Committee Member Updated',
    },
    400: {
      description: 'Invalid input data or Legitimator Committee Member ID format',
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
      description: 'Legitimator Committee Member not found with the provided ID',
      summary: 'Legitimator Committee Member Not Found',
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

export const deleteLegitimatorCommitteeMemberRegistry: RouteConfig = {
  method: 'delete',
  path: '/legitimator-committee-member/{id}',
  tags: ['Legitimator Committee Members'],
  summary: 'Delete Legitimator Committee Member',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteLegitimatorCommitteeMemberSchema,
  },
  responses: {
    200: {
      description: 'Legitimator Committee Member deleted successfully',
      summary: 'Legitimator Committee Member Deleted',
    },
    400: {
      description: 'Invalid Legitimator Committee Member ID format',
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
      description: 'Legitimator Committee Member not found with the provided ID',
      summary: 'Legitimator Committee Member Not Found',
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

