import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import {
  Degree,
  Seniority,
  UserRole,
} from '../../config/database/generated/enums.ts'
import { createResearcherSchema } from '../controllers/researchers/create-researcher-controller.ts'
import { deleteResearcherSchema } from '../controllers/researchers/delete-researcher-controller.ts'
import { findResearcherByIdSchema } from '../controllers/researchers/find-researcher-by-id-controller.ts'
import { findResearcherByUserIdSchema } from '../controllers/researchers/find-researcher-by-user-id-controller.ts'
import { updateResearcherSchema } from '../controllers/researchers/update-researcher-controller.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 9

const researcherSchema = z.object({
  id: z.uuid(),
  registrationNumber: z.string(),
  mainEtps: z.string().nullable(),
  formations: z.string().nullable(),
  degrees: z.array(z.enum(Degree)),
  occupations: z.string(),
  seniority: z.enum(Seniority),
  institutions: z.string(),
  biography: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.uuid(),
  user: z.object({
    id: z.uuid(),
    name: z.string(),
    emailAddress: z.string(),
    avatarUrl: z.string().nullable(),
    orcid: z.string().nullable(),
    phone: z.string().nullable(),
    lattesUrl: z.string().nullable(),
    role: z.enum(UserRole),
  }),
})

export const createResearcherRegistry: RouteConfig = {
  method: 'post',
  path: '/researcher',
  tags: ['Researchers'],
  summary: 'Create a new researcher profile',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createResearcherSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Researcher profile created successfully',
      summary: 'Researcher Created',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
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
      description:
        'Researcher with this registration number already exists or user already has a researcher profile',
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

export const findResearchersRegistry: RouteConfig = {
  method: 'get',
  path: '/researcher',
  tags: ['Researchers'],
  summary: 'List all researchers with pagination and filters',
  request: {
    query: z.object({
      page: z.coerce.number().min(1).default(DEFAULT_PAGE).optional(),
      limit: z.coerce.number().min(1).default(DEFAULT_LIMIT).optional(),
      userId: z.string().optional(),
      registrationNumber: z.string().optional(),
      name: z.string().optional(),
      emailAddress: z.string().optional(),
      mainEtps: z.string().optional(),
      formations: z.string().optional(),
      occupations: z.string().optional(),
      institutions: z.string().optional(),
      biography: z.string().optional(),
      orderBy: z.enum(['asc', 'desc']).default('desc'),
    }),
  },
  responses: {
    200: {
      description: 'List of researchers retrieved successfully with pagination',
      summary: 'Researchers Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number().optional(),
            limit: z.number().optional(),
            researchers: z.array(researcherSchema),
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

export const findResearcherByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/researcher/{id}',
  tags: ['Researchers'],
  summary: 'Find researcher by ID',
  request: {
    params: findResearcherByIdSchema,
  },
  responses: {
    200: {
      description: 'Researcher details retrieved successfully',
      summary: 'Researcher Retrieved',
      content: {
        'application/json': {
          schema: researcherSchema,
        },
      },
    },
    400: {
      description: 'Invalid researcher ID format',
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
      description: 'Researcher not found with the provided ID',
      summary: 'Researcher Not Found',
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

export const findResearcherByUserIdRegistry: RouteConfig = {
  method: 'get',
  path: '/researcher/user/{userId}',
  tags: ['Researchers'],
  summary: 'Find researcher by user ID',
  request: {
    params: findResearcherByUserIdSchema,
  },
  responses: {
    200: {
      description: 'Researcher details retrieved successfully',
      summary: 'Researcher Retrieved',
      content: {
        'application/json': {
          schema: researcherSchema,
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
      description: 'Researcher not found for this user',
      summary: 'Researcher Not Found',
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

export const updateResearcherRegistry: RouteConfig = {
  method: 'put',
  path: '/researcher/{id}',
  tags: ['Researchers'],
  summary: 'Update researcher profile',
  security: [{ bearerAuth: [] }],
  request: {
    params: findResearcherByIdSchema,
    body: {
      content: {
        'application/json': {
          schema: updateResearcherSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Researcher profile updated successfully',
      summary: 'Researcher Updated',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    400: {
      description: 'Invalid input data or researcher ID format',
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
      description: 'Researcher not found with the provided ID',
      summary: 'Researcher Not Found',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    409: {
      description: 'Researcher with this registration number already exists',
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

export const deleteResearcherRegistry: RouteConfig = {
  method: 'delete',
  path: '/researcher/{id}',
  tags: ['Researchers'],
  summary: 'Delete researcher profile',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteResearcherSchema,
  },
  responses: {
    200: {
      description: 'Researcher profile deleted successfully',
      summary: 'Researcher Deleted',
    },
    400: {
      description: 'Invalid researcher ID format',
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
      description: 'Researcher not found with the provided ID',
      summary: 'Researcher Not Found',
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
