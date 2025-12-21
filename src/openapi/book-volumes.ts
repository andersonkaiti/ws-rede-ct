import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { deleteBookVolumeSchema } from '../controllers/book-volumes/delete-book-volume-controller.ts'
import { findBookVolumeByIdSchema } from '../controllers/book-volumes/find-book-volume-by-id-controller.ts'
import { findBookVolumesControllerSchema } from '../controllers/book-volumes/find-book-volumes-controller.ts'
import { updateBookVolumeSchema } from '../controllers/book-volumes/update-book-volume-controller.ts'

export const createBookVolumeRegistry: RouteConfig = {
  method: 'post',
  path: '/book-volumes',
  tags: ['Book Volumes'],
  summary: 'Create book volume',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            volumeNumber: z
              .number()
              .int()
              .positive()
              .openapi({ description: 'Número do volume' }),
            year: z
              .number()
              .int()
              .positive()
              .openapi({ description: 'Ano de publicação' }),
            title: z
              .string()
              .min(1)
              .openapi({ description: 'Título do livro' }),
            author: z
              .string()
              .uuid()
              .openapi({ description: 'ID do autor (UUID)' }),
            accessUrl: z
              .string()
              .url()
              .optional()
              .openapi({ description: 'URL de acesso ao livro' }),
            description: z
              .string()
              .optional()
              .openapi({ description: 'Descrição do livro' }),
            authorImage: z.string().optional().openapi({
              description: 'Imagem do autor (máximo 5MB)',
              type: 'string',
              format: 'binary',
            }),
            coverImage: z.string().optional().openapi({
              description: 'Imagem da capa (máximo 5MB)',
              type: 'string',
              format: 'binary',
            }),
            catalogSheet: z.string().optional().openapi({
              description: 'Ficha catalográfica (máximo 5MB)',
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
      description: 'Book volume created successfully',
      summary: 'Volume Created',
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

export const findBookVolumesRegistry: RouteConfig = {
  method: 'get',
  path: '/book-volumes',
  tags: ['Book Volumes'],
  summary: 'List book volumes',
  security: [{ bearerAuth: [] }],
  request: {
    query: findBookVolumesControllerSchema,
  },
  responses: {
    200: {
      description: 'Paginated list of book volumes retrieved successfully',
      summary: 'Volumes Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            bookVolumes: z.array(
              z.object({
                id: z.string(),
                volumeNumber: z.number(),
                year: z.number(),
                title: z.string(),
                author: z.object({
                  id: z.string(),
                  name: z.string(),
                  emailAddress: z.string(),
                  avatarUrl: z.string().nullable(),
                  orcid: z.string().nullable(),
                  lattesUrl: z.string().nullable(),
                  role: z.string(),
                }),
                accessUrl: z.string().nullable(),
                authorImageUrl: z.string().nullable(),
                coverImageUrl: z.string().nullable(),
                catalogSheetUrl: z.string().nullable(),
                description: z.string().nullable(),
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

export const findBookVolumeByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/book-volumes/{id}',
  tags: ['Book Volumes'],
  summary: 'Find book volume by ID',
  security: [{ bearerAuth: [] }],
  request: {
    params: findBookVolumeByIdSchema,
  },
  responses: {
    200: {
      description: 'Book volume details retrieved successfully',
      summary: 'Volume Retrieved',
      content: {
        'application/json': {
          schema: z
            .object({
              id: z.string(),
              volumeNumber: z.number(),
              year: z.number(),
              title: z.string(),
              author: z.object({
                id: z.string(),
                name: z.string(),
                emailAddress: z.string(),
                avatarUrl: z.string().nullable(),
                orcid: z.string().nullable(),
                lattesUrl: z.string().nullable(),
                role: z.string(),
              }),
              accessUrl: z.string().nullable(),
              authorImageUrl: z.string().nullable(),
              coverImageUrl: z.string().nullable(),
              catalogSheetUrl: z.string().nullable(),
              description: z.string().nullable(),
              createdAt: z.date(),
              updatedAt: z.date(),
            })
            .nullable(),
        },
      },
    },
    400: {
      description: 'Invalid volume ID format',
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
      description: 'Book volume not found with the provided ID',
      summary: 'Volume Not Found',
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

export const updateBookVolumeRegistry: RouteConfig = {
  method: 'put',
  path: '/book-volumes/{id}',
  tags: ['Book Volumes'],
  summary: 'Update book volume',
  security: [{ bearerAuth: [] }],
  request: {
    params: updateBookVolumeSchema.pick({ id: true }),
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            volumeNumber: z
              .number()
              .int()
              .positive()
              .optional()
              .openapi({ description: 'Número do volume' }),
            year: z
              .number()
              .int()
              .positive()
              .optional()
              .openapi({ description: 'Ano de publicação' }),
            title: z
              .string()
              .min(1)
              .optional()
              .openapi({ description: 'Título do livro' }),
            authorId: z
              .string()
              .uuid()
              .optional()
              .openapi({ description: 'ID do autor (UUID)' }),
            accessUrl: z
              .string()
              .url()
              .optional()
              .openapi({ description: 'URL de acesso ao livro' }),
            description: z
              .string()
              .optional()
              .openapi({ description: 'Descrição do livro' }),
            authorImage: z.string().optional().openapi({
              description: 'Imagem do autor (máximo 5MB)',
              type: 'string',
              format: 'binary',
            }),
            coverImage: z.string().optional().openapi({
              description: 'Imagem da capa (máximo 5MB)',
              type: 'string',
              format: 'binary',
            }),
            catalogSheet: z.string().optional().openapi({
              description: 'Ficha catalográfica (máximo 5MB)',
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
      description: 'Book volume updated successfully',
      summary: 'Volume Updated',
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
      description: 'Book volume not found with the provided ID',
      summary: 'Volume Not Found',
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

export const deleteBookVolumeRegistry: RouteConfig = {
  method: 'delete',
  path: '/book-volumes/{id}',
  tags: ['Book Volumes'],
  summary: 'Delete book volume',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteBookVolumeSchema,
  },
  responses: {
    200: {
      description: 'Book volume deleted successfully',
      summary: 'Volume Deleted',
    },
    400: {
      description: 'Invalid volume ID format',
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
      description: 'Book volume not found with the provided ID',
      summary: 'Volume Not Found',
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
