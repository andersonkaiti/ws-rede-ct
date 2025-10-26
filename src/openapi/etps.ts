import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import { $Enums } from '@prisma/client'
import z from 'zod'
import { createETPSchema } from '../controllers/etps/create-etp-controller.ts'
import { deleteETPSchema } from '../controllers/etps/delete-etp-controller.ts'
import { findETPByIdSchema } from '../controllers/etps/find-etp-by-id-controller.ts'
import { updateETPSchema } from '../controllers/etps/update-etp-controller.ts'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 9

const researcherSchema = z.object({
  id: z.uuid(),
  registrationNumber: z.string(),
  mainEtps: z.string().nullable(),
  formations: z.string().nullable(),
  degrees: z.array(z.enum($Enums.Degree)),
  occupations: z.string(),
  seniority: z.enum($Enums.Seniority),
  institutions: z.string(),
  biography: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.object({
    id: z.uuid(),
    name: z.string(),
    emailAddress: z.string(),
    avatarUrl: z.string().nullable(),
    orcid: z.string().nullable(),
    phone: z.string().nullable(),
    lattesUrl: z.string().nullable(),
    role: z.enum($Enums.UserRole),
  }),
})

const etpSchema = z.object({
  id: z.uuid(),
  code: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  leader: z
    .object({
      id: z.uuid(),
      researcher: researcherSchema,
    })
    .nullable(),
  deputyLeader: z
    .object({
      id: z.uuid(),
      researcher: researcherSchema,
    })
    .nullable(),
  secretary: z
    .object({
      id: z.uuid(),
      researcher: researcherSchema,
    })
    .nullable(),
  members: z.array(researcherSchema),
})

export const createETPRegistry: RouteConfig = {
  method: 'post',
  path: '/etp',
  tags: ['ETPs'],
  summary:
    'Create a new ETP with single leader, deputy leader, secretary and multiple members',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createETPSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'ETP created successfully',
      summary: 'ETP Created',
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
      description: 'ETP with this code already exists',
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

export const findETPsRegistry: RouteConfig = {
  method: 'get',
  path: '/etp',
  tags: ['ETPs'],
  summary: 'List all ETPs with pagination and filters',
  request: {
    query: z.object({
      page: z.coerce.number().min(1).default(DEFAULT_PAGE).optional(),
      limit: z.coerce.number().min(1).default(DEFAULT_LIMIT).optional(),
      code: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      notes: z.string().optional(),
      orderBy: z.enum(['asc', 'desc']).optional(),
    }),
  },
  responses: {
    200: {
      description: 'List of ETPs retrieved successfully with pagination',
      summary: 'ETPs Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            etps: z.array(etpSchema),
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

export const findETPByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/etp/{id}',
  tags: ['ETPs'],
  summary: 'Find ETP by ID',
  request: {
    params: findETPByIdSchema,
  },
  responses: {
    200: {
      description: 'ETP details retrieved successfully',
      summary: 'ETP Retrieved',
      content: {
        'application/json': {
          schema: etpSchema,
        },
      },
    },
    400: {
      description: 'Invalid ETP ID format',
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
      description: 'ETP not found with the provided ID',
      summary: 'ETP Not Found',
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

export const updateETPRegistry: RouteConfig = {
  method: 'put',
  path: '/etp/{id}',
  tags: ['ETPs'],
  summary:
    'Update ETP and manage user relationships (single leader, deputy leader, secretary, multiple members)',
  security: [{ bearerAuth: [] }],
  request: {
    params: findETPByIdSchema,
    body: {
      content: {
        'application/json': {
          schema: updateETPSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'ETP updated successfully',
      summary: 'ETP Updated',
    },
    400: {
      description: 'Invalid input data or ETP ID format',
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
      description: 'ETP not found with the provided ID',
      summary: 'ETP Not Found',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    409: {
      description: 'ETP with this code already exists',
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

export const deleteETPRegistry: RouteConfig = {
  method: 'delete',
  path: '/etp/{id}',
  tags: ['ETPs'],
  summary: 'Delete ETP',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteETPSchema,
  },
  responses: {
    200: {
      description: 'ETP deleted successfully',
      summary: 'ETP Deleted',
    },
    400: {
      description: 'Invalid ETP ID format',
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
      description: 'ETP not found with the provided ID',
      summary: 'ETP Not Found',
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
