import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { deletePostGraduateProgramSchema } from '../controllers/post-graduate-programs/delete-post-graduate-program-controller.ts'
import { findPostGraduateProgramByIdSchema } from '../controllers/post-graduate-programs/find-post-graduate-program-by-id-controller.ts'
import { findPostGraduateProgramsControllerSchema } from '../controllers/post-graduate-programs/find-post-graduate-programs-controller.ts'
import { updatePostGraduateProgramSchema } from '../controllers/post-graduate-programs/update-post-graduate-program-controller.ts'

export const createPostGraduateProgramRegistry: RouteConfig = {
  method: 'post',
  path: '/post-graduate-programs',
  tags: ['Post Graduate Programs'],
  summary: 'Create post-graduate program',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            title: z
              .string()
              .min(1)
              .openapi({ description: 'Título do programa' }),
            description: z
              .string()
              .optional()
              .openapi({ description: 'Descrição do programa' }),
            startDate: z.string().openapi({
              description: 'Data de início (ISO 8601)',
              example: '2024-01-01T10:00:00Z',
            }),
            endDate: z.string().openapi({
              description: 'Data de término (ISO 8601)',
              example: '2024-12-31T10:00:00Z',
            }),
            contact: z
              .string()
              .min(1)
              .openapi({ description: 'Informações de contato' }),
            registrationLink: z
              .string()
              .url()
              .optional()
              .openapi({ description: 'Link de inscrição' }),
            image: z.string().optional().openapi({
              description: 'Imagem do programa (máximo 5MB)',
              type: 'string',
              format: 'binary',
            }),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Post-graduate program created successfully',
      summary: 'Program Created',
    },
    400: {
      description: 'Invalid input data',
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

export const findPostGraduateProgramsRegistry: RouteConfig = {
  method: 'get',
  path: '/post-graduate-programs',
  tags: ['Post Graduate Programs'],
  summary: 'List post-graduate programs',
  security: [{ bearerAuth: [] }],
  request: {
    query: findPostGraduateProgramsControllerSchema,
  },
  responses: {
    200: {
      description:
        'Paginated list of post-graduate programs retrieved successfully',
      summary: 'Programs Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number().optional(),
            limit: z.number().optional(),
            postGraduatePrograms: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                imageUrl: z.string().nullable(),
                description: z.string().nullable(),
                startDate: z.date(),
                endDate: z.date(),
                contact: z.string(),
                registrationLink: z.string().nullable(),
                createdAt: z.date(),
                updatedAt: z.date(),
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

export const findPostGraduateProgramByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/post-graduate-programs/{id}',
  tags: ['Post Graduate Programs'],
  summary: 'Find post-graduate program by ID',
  security: [{ bearerAuth: [] }],
  request: {
    params: findPostGraduateProgramByIdSchema,
  },
  responses: {
    200: {
      description: 'Post-graduate program details retrieved successfully',
      summary: 'Program Retrieved',
      content: {
        'application/json': {
          schema: z
            .object({
              id: z.string(),
              title: z.string(),
              imageUrl: z.string().nullable(),
              description: z.string().nullable(),
              startDate: z.date(),
              endDate: z.date(),
              contact: z.string(),
              registrationLink: z.string().nullable(),
              createdAt: z.date(),
              updatedAt: z.date(),
            })
            .nullable(),
        },
      },
    },
    400: {
      description: 'Invalid program ID format',
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
      description: 'Post-graduate program not found with the provided ID',
      summary: 'Program Not Found',
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

export const updatePostGraduateProgramRegistry: RouteConfig = {
  method: 'put',
  path: '/post-graduate-programs/{id}',
  tags: ['Post Graduate Programs'],
  summary: 'Update post-graduate program',
  security: [{ bearerAuth: [] }],
  request: {
    params: updatePostGraduateProgramSchema.pick({ id: true }),
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            title: z
              .string()
              .min(1)
              .optional()
              .openapi({ description: 'Título do programa' }),
            description: z
              .string()
              .optional()
              .openapi({ description: 'Descrição do programa' }),
            startDate: z.string().optional().openapi({
              description: 'Data de início (ISO 8601)',
              example: '2024-01-01T10:00:00Z',
            }),
            endDate: z.string().optional().openapi({
              description: 'Data de término (ISO 8601)',
              example: '2024-12-31T10:00:00Z',
            }),
            contact: z
              .string()
              .min(1)
              .optional()
              .openapi({ description: 'Informações de contato' }),
            registrationLink: z
              .string()
              .url()
              .optional()
              .openapi({ description: 'Link de inscrição' }),
            image: z.string().optional().openapi({
              description: 'Imagem do programa (máximo 5MB)',
              type: 'string',
              format: 'binary',
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Post-graduate program updated successfully',
      summary: 'Program Updated',
    },
    400: {
      description: 'Invalid input data',
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
      description: 'Post-graduate program not found with the provided ID',
      summary: 'Program Not Found',
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

export const deletePostGraduateProgramRegistry: RouteConfig = {
  method: 'delete',
  path: '/post-graduate-programs/{id}',
  tags: ['Post Graduate Programs'],
  summary: 'Delete post-graduate program',
  security: [{ bearerAuth: [] }],
  request: {
    params: deletePostGraduateProgramSchema,
  },
  responses: {
    200: {
      description: 'Post-graduate program deleted successfully',
      summary: 'Program Deleted',
    },
    400: {
      description: 'Invalid program ID format',
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
      description: 'Post-graduate program not found with the provided ID',
      summary: 'Program Not Found',
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
