import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import { $Enums } from '@prisma/client'
import z from 'zod'
import { createSDHCTeamMemberSchema } from '../controllers/sdhc-team-member/create-sdhc-team-member-controller.ts'
import { deleteSDHCTeamMemberSchema } from '../controllers/sdhc-team-member/delete-sdhc-team-member-controller.ts'
import { findSDHCTeamMemberByIdSchema } from '../controllers/sdhc-team-member/find-sdhc-team-member-by-id-controller.ts'
import { updateSDHCTeamMemberSchema } from '../controllers/sdhc-team-member/update-sdhc-team-member-controller.ts'

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

const sdhcTeamMemberSchema = z.object({
  id: z.uuid(),
  role: z.string(),
  description: z.string().nullable(),
  order: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.uuid(),
  user: userSchema,
})

export const createSDHCTeamMemberRegistry: RouteConfig = {
  method: 'post',
  path: '/sdhc-team-member',
  tags: ['SDHC Team Members'],
  summary: 'Create a new SDHC Team Member',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createSDHCTeamMemberSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'SDHC Team Member created successfully',
      summary: 'SDHC Team Member Created',
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

export const findSDHCTeamMembersRegistry: RouteConfig = {
  method: 'get',
  path: '/sdhc-team-member',
  tags: ['SDHC Team Members'],
  summary: 'List all SDHC Team Members with filters',
  request: {
    query: z.object({
      role: z.string().optional(),
      orderBy: z.enum(['asc', 'desc']).optional(),
    }),
  },
  responses: {
    200: {
      description: 'List of SDHC Team Members retrieved successfully',
      summary: 'SDHC Team Members Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            members: z.array(sdhcTeamMemberSchema),
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

export const findSDHCTeamMemberByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/sdhc-team-member/{id}',
  tags: ['SDHC Team Members'],
  summary: 'Find SDHC Team Member by ID',
  request: {
    params: findSDHCTeamMemberByIdSchema,
  },
  responses: {
    200: {
      description: 'SDHC Team Member details retrieved successfully',
      summary: 'SDHC Team Member Retrieved',
      content: {
        'application/json': {
          schema: sdhcTeamMemberSchema,
        },
      },
    },
    400: {
      description: 'Invalid SDHC Team Member ID format',
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
      description: 'SDHC Team Member not found with the provided ID',
      summary: 'SDHC Team Member Not Found',
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

export const updateSDHCTeamMemberRegistry: RouteConfig = {
  method: 'put',
  path: '/sdhc-team-member/{id}',
  tags: ['SDHC Team Members'],
  summary: 'Update SDHC Team Member',
  security: [{ bearerAuth: [] }],
  request: {
    params: findSDHCTeamMemberByIdSchema,
    body: {
      content: {
        'application/json': {
          schema: updateSDHCTeamMemberSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'SDHC Team Member updated successfully',
      summary: 'SDHC Team Member Updated',
    },
    400: {
      description: 'Invalid input data or SDHC Team Member ID format',
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
      description: 'SDHC Team Member not found with the provided ID',
      summary: 'SDHC Team Member Not Found',
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

export const deleteSDHCTeamMemberRegistry: RouteConfig = {
  method: 'delete',
  path: '/sdhc-team-member/{id}',
  tags: ['SDHC Team Members'],
  summary: 'Delete SDHC Team Member',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteSDHCTeamMemberSchema,
  },
  responses: {
    200: {
      description: 'SDHC Team Member deleted successfully',
      summary: 'SDHC Team Member Deleted',
    },
    400: {
      description: 'Invalid SDHC Team Member ID format',
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
      description: 'SDHC Team Member not found with the provided ID',
      summary: 'SDHC Team Member Not Found',
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
