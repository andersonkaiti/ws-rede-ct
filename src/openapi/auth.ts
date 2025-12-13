import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import {
  PendencyStatus,
  UserRole,
} from '../../config/database/generated/enums.ts'
import { findAuthenticatedUserCertificationsSchema } from '../controllers/auth/find-user-certifications-controller.ts'
import { findByAuthenticatedUserSchema } from '../controllers/auth/find-user-news-controller.ts'
import { findAuthenticatedUserPendenciesSchema } from '../controllers/auth/find-user-pendencies-controller.ts'
import { signInSchema } from '../controllers/auth/sign-in-controller.ts'
import { createUserSchema } from '../controllers/auth/sign-up-controller.ts'

export const signUpRegistry: RouteConfig = {
  method: 'post',
  path: '/auth/sign-up',
  tags: ['Authentication'],
  summary: 'Create a new user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: createUserSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'User created successfully',
      summary: 'User Registration Successful',
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
    409: {
      description: 'User already exists with this email',
      summary: 'User Already Exists',
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

export const signInRegistry: RouteConfig = {
  method: 'post',
  path: '/auth/sign-in',
  tags: ['Authentication'],
  summary: 'Sign in',
  request: {
    body: {
      content: {
        'application/json': {
          schema: signInSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Authentication successful, JWT token returned',
      summary: 'Login Successful',
      content: {
        'application/json': {
          schema: z.object({
            token: z.string(),
          }),
        },
      },
    },
    400: {
      description: 'Invalid credentials or input data',
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
      description: 'Invalid email or password',
      summary: 'Authentication Failed',
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

export const authUserRegistry: RouteConfig = {
  method: 'get',
  path: '/auth/user',
  tags: ['Authentication'],
  summary: 'Search for authenticated user',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Authenticated user information retrieved successfully',
      summary: 'User Information Retrieved',
      content: {
        'application/json': {
          schema: z
            .object({
              name: z.string(),
              id: z.string(),
              avatarUrl: z.string().nullable(),
              createdAt: z.date(),
              updatedAt: z.date(),
              emailAddress: z.string(),
              orcid: z.string().nullable(),
              phone: z.string().nullable(),
              lattesUrl: z.string().nullable(),
              role: z.nativeEnum(UserRole),
            })
            .nullable(),
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
    404: {
      description: 'User not found or not authenticated',
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

export const authUserNewsRegistry: RouteConfig = {
  method: 'get',
  path: '/auth/user/news',
  tags: ['Authentication'],
  summary: 'List authenticated user news',
  security: [{ bearerAuth: [] }],
  request: {
    query: findByAuthenticatedUserSchema,
  },
  responses: {
    200: {
      description:
        'Paginated list of authenticated user news retrieved successfully',
      summary: 'User News Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            news: z.object({
              content: z.string(),
              id: z.string(),
              title: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
              imageUrl: z.string().nullable(),
            }),
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

export const adminPingRegistry: RouteConfig = {
  method: 'get',
  path: '/auth/admin',
  tags: ['Authentication'],
  summary: 'Verify admin access',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Admin access verified successfully',
      summary: 'Admin Access Granted',
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
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

export const authUserCertificationsRegistry: RouteConfig = {
  method: 'get',
  path: '/auth/certifications',
  tags: ['Authentication'],
  summary: "List all authenticated user's certifications",
  security: [{ bearerAuth: [] }],
  request: {
    query: findAuthenticatedUserCertificationsSchema,
  },
  responses: {
    200: {
      description:
        'Paginated list of authenticated user certifications retrieved successfully',
      summary: 'User Certifications Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            certifications: z.object({
              description: z.string(),
              id: z.string(),
              title: z.string(),
              certificationUrl: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
              userId: z.string(),
            }),
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

export const authUserPendenciesRegistry: RouteConfig = {
  method: 'get',
  path: '/auth/pendencies',
  tags: ['Authentication'],
  summary: "List all authenticated user's pendencies",
  security: [{ bearerAuth: [] }],
  request: {
    query: findAuthenticatedUserPendenciesSchema,
  },
  responses: {
    200: {
      description:
        'Paginated list of authenticated user pendencies retrieved successfully',
      summary: 'User Pendencies Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            pendencies: z.object({
              id: z.string(),
              title: z.string(),
              description: z.string(),
              status: z.nativeEnum(PendencyStatus),
              createdAt: z.date(),
              updatedAt: z.date(),
              userId: z.string(),
            }),
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
