import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { deleteWebinarSchema } from '../controllers/webinars/delete-webinar-controller.ts'
import { findWebinarByIdSchema } from '../controllers/webinars/find-webinar-by-id-controller.ts'
import { findWebinarsControllerSchema } from '../controllers/webinars/find-webinars-controller.ts'
import { updateWebinarSchema } from '../controllers/webinars/update-webinar-controller.ts'

export const createWebinarRegistry: RouteConfig = {
  method: 'post',
  path: '/webinars',
  tags: ['Webinars'],
  summary: 'Create webinar',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            title: z
              .string()
              .min(1)
              .openapi({ description: 'Título do webinar' }),
            description: z
              .string()
              .optional()
              .openapi({ description: 'Descrição do webinar' }),
            scheduledAt: z.string().openapi({
              description: 'Data e hora agendada (ISO 8601)',
              example: '2024-01-01T10:00:00Z',
            }),
            webinarLink: z
              .string()
              .url()
              .optional()
              .openapi({ description: 'Link do webinar' }),
            guestIds: z.string().openapi({
              description: 'IDs dos convidados separados por vírgula',
              example: 'uuid1,uuid2,uuid3',
            }),
            thumbnail: z.string().optional().openapi({
              description: 'Imagem de thumbnail (máximo 5MB)',
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
      description: 'Webinar created successfully',
      summary: 'Webinar Created',
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

export const findWebinarsRegistry: RouteConfig = {
  method: 'get',
  path: '/webinars',
  tags: ['Webinars'],
  summary: 'List webinars',
  security: [{ bearerAuth: [] }],
  request: {
    query: findWebinarsControllerSchema,
  },
  responses: {
    200: {
      description:
        'Paginated list of webinars with guest information retrieved successfully',
      summary: 'Webinars Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            webinars: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                description: z.string().nullable(),
                scheduledAt: z.date(),
                webinarLink: z.string().nullable(),
                thumbnailUrl: z.string().nullable(),
                createdAt: z.date(),
                updatedAt: z.date(),
                guests: z.array(
                  z.object({
                    id: z.uuid(),
                    name: z.string(),
                    emailAddress: z.email(),
                    avatarUrl: z.string().nullable(),
                    createdAt: z.date(),
                    updatedAt: z.date(),
                  })
                ),
              })
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

export const findWebinarByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/webinars/{id}',
  tags: ['Webinars'],
  summary: 'Find webinar by ID',
  security: [{ bearerAuth: [] }],
  request: {
    params: findWebinarByIdSchema,
  },
  responses: {
    200: {
      description: 'Webinar details retrieved successfully',
      summary: 'Webinar Retrieved',
      content: {
        'application/json': {
          schema: z
            .object({
              id: z.string(),
              title: z.string(),
              description: z.string().nullable(),
              scheduledAt: z.date(),
              webinarLink: z.string().nullable(),
              thumbnailUrl: z.string().nullable(),
              createdAt: z.date(),
              updatedAt: z.date(),
              guests: z.array(
                z.object({
                  id: z.uuid(),
                  name: z.string(),
                  emailAddress: z.email(),
                  avatarUrl: z.string().nullable(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                })
              ),
            })
            .nullable(),
        },
      },
    },
    400: {
      description: 'Invalid webinar ID format',
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
      description: 'Webinar not found with the provided ID',
      summary: 'Webinar Not Found',
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

export const updateWebinarRegistry: RouteConfig = {
  method: 'put',
  path: '/webinars/{id}',
  tags: ['Webinars'],
  summary: 'Update webinar',
  security: [{ bearerAuth: [] }],
  request: {
    params: updateWebinarSchema.pick({ id: true }),
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            title: z
              .string()
              .min(1)
              .optional()
              .openapi({ description: 'Título do webinar' }),
            description: z
              .string()
              .optional()
              .openapi({ description: 'Descrição do webinar' }),
            scheduledAt: z.string().optional().openapi({
              description: 'Data e hora agendada (ISO 8601)',
              example: '2024-01-01T10:00:00Z',
            }),
            webinarLink: z
              .string()
              .url()
              .optional()
              .openapi({ description: 'Link do webinar' }),
            guestIds: z.string().optional().openapi({
              description: 'IDs dos convidados separados por vírgula',
              example: 'uuid1,uuid2,uuid3',
            }),
            thumbnail: z.string().optional().openapi({
              description: 'Imagem de thumbnail (máximo 5MB)',
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
      description: 'Webinar updated successfully',
      summary: 'Webinar Updated',
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
      description: 'Webinar not found with the provided ID',
      summary: 'Webinar Not Found',
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

export const deleteWebinarRegistry: RouteConfig = {
  method: 'delete',
  path: '/webinars/{id}',
  tags: ['Webinars'],
  summary: 'Delete webinar',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteWebinarSchema,
  },
  responses: {
    200: {
      description: 'Webinar deleted successfully',
      summary: 'Webinar Deleted',
    },
    400: {
      description: 'Invalid webinar ID format',
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
      description: 'Webinar not found with the provided ID',
      summary: 'Webinar Not Found',
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
