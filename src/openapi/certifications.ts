import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { UserRole } from '../../config/database/generated/enums.ts'
import { deleteCertificationSchema } from '../controllers/certifications/delete-certification-controller.ts'
import { findCertificationByIdControllerSchema } from '../controllers/certifications/find-certification-by-id-controller.ts'
import { findCertificationsControllerSchema } from '../controllers/certifications/find-certifications-controller.ts'
import { registerCertificationSchema } from '../controllers/certifications/register-certification-controller.ts'
import { updateCertificationSchema } from '../controllers/certifications/update-certification-controller.ts'

export const registerCertificationRegistry: RouteConfig = {
  method: 'post',
  path: '/certifications/{user_id}',
  tags: ['Certifications'],
  summary: 'Register certification for user',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      user_id: z.string().openapi({
        param: {
          name: 'user_id',
          in: 'path',
        },
      }),
    }),
    body: {
      content: {
        'multipart/form-data': {
          schema: registerCertificationSchema.omit({ userId: true }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Certification registered successfully for the user',
      summary: 'Certification Registered',
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

export const findCertificationsRegistry: RouteConfig = {
  method: 'get',
  path: '/certifications',
  tags: ['Certifications'],
  summary: 'List certifications',
  security: [{ bearerAuth: [] }],
  request: {
    query: findCertificationsControllerSchema,
  },
  responses: {
    200: {
      description:
        'Paginated list of certifications with user information retrieved successfully',
      summary: 'Certifications Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number().optional(),
            limit: z.number().optional(),
            certifications: z.array(
              z.object({
                description: z.string(),
                userId: z.string(),
                title: z.string(),
                id: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
                certificationUrl: z.url(),
                user: z.object({
                  id: z.uuid(),
                  name: z.string(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                  avatarUrl: z.string().nullable(),
                  emailAddress: z.email(),
                  orcid: z.string().nullable(),
                  phone: z.string().nullable(),
                  lattesUrl: z.url().nullable(),
                  role: z.enum(UserRole),
                }),
              }),
            ),
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

export const findCertificationByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/certifications/{certification_id}',
  tags: ['Certifications'],
  summary: 'Find certification by ID',
  security: [{ bearerAuth: [] }],
  request: {
    params: findCertificationByIdControllerSchema,
  },
  responses: {
    200: {
      description: 'Certification details retrieved successfully',
      summary: 'Certification Retrieved',
      content: {
        'application/json': {
          schema: z
            .object({
              description: z.string(),
              userId: z.string(),
              title: z.string(),
              id: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
              certificationUrl: z.url(),
            })
            .nullable(),
        },
      },
    },
    400: {
      description: 'Invalid certification ID format',
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
      description: 'Certification not found with the provided ID',
      summary: 'Certification Not Found',
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

export const updateCertificationRegistry: RouteConfig = {
  method: 'put',
  path: '/certifications/{certification_id}',
  tags: ['Certifications'],
  summary: 'Update certification',
  security: [{ bearerAuth: [] }],
  request: {
    params: updateCertificationSchema
      .pick({ id: true })
      .transform(() => ({ certification_id: '' })),
    body: {
      content: {
        'multipart/form-data': {
          schema: updateCertificationSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Certification updated successfully',
      summary: 'Certification Updated',
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
    404: {
      description: 'Certification not found with the provided ID',
      summary: 'Certification Not Found',
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

export const deleteCertificationRegistry: RouteConfig = {
  method: 'delete',
  path: '/certifications/{certification_id}',
  tags: ['Certifications'],
  summary: 'Delete certification',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteCertificationSchema,
  },
  responses: {
    204: {
      description: 'Certification deleted successfully',
      summary: 'Certification Deleted',
    },
    400: {
      description: 'Invalid certification ID format',
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
      description: 'Certification not found with the provided ID',
      summary: 'Certification Not Found',
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
