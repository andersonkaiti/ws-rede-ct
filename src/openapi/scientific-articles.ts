import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { deleteScientificArticleSchema } from '../controllers/scientific-articles/delete-scientific-article-controller.ts'
import { findScientificArticleByIdSchema } from '../controllers/scientific-articles/find-scientific-article-by-id-controller.ts'
import { findScientificArticlesControllerSchema } from '../controllers/scientific-articles/find-scientific-articles-controller.ts'
import { updateScientificArticleSchema } from '../controllers/scientific-articles/update-scientific-article-controller.ts'

export const createScientificArticleRegistry: RouteConfig = {
  method: 'post',
  path: '/scientific-articles',
  tags: ['Scientific Articles'],
  summary: 'Create scientific article',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            title: z
              .string()
              .min(1)
              .openapi({ description: 'Título do artigo' }),
            author: z
              .string()
              .min(1)
              .openapi({ description: 'Autor do artigo' }),
            journal: z
              .string()
              .optional()
              .openapi({ description: 'Nome do periódico/revista' }),
            volume: z.string().optional().openapi({ description: 'Volume' }),
            edition: z
              .string()
              .optional()
              .openapi({ description: 'Número/Edição' }),
            pageStart: z
              .number()
              .optional()
              .openapi({ description: 'Página inicial' }),
            pageEnd: z
              .number()
              .optional()
              .openapi({ description: 'Página final' }),
            startDate: z.string().openapi({
              description: 'Data de início (ISO 8601)',
              example: '2024-01-01T10:00:00Z',
            }),
            endDate: z.string().openapi({
              description: 'Data de término (ISO 8601)',
              example: '2024-12-31T10:00:00Z',
            }),
            city: z.string().optional().openapi({ description: 'Cidade' }),
            state: z.string().optional().openapi({ description: 'Estado' }),
            country: z.string().optional().openapi({ description: 'País' }),
            publisher: z
              .string()
              .optional()
              .openapi({ description: 'Editora/Instituição' }),
            description: z
              .string()
              .optional()
              .openapi({ description: 'Descrição do artigo' }),
            year: z.number().optional().openapi({ description: 'Ano' }),
            accessUrl: z
              .string()
              .url()
              .optional()
              .openapi({ description: 'URL de acesso' }),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Scientific article created successfully',
      summary: 'Article Created',
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

export const findScientificArticlesRegistry: RouteConfig = {
  method: 'get',
  path: '/scientific-articles',
  tags: ['Scientific Articles'],
  summary: 'List scientific articles',
  security: [{ bearerAuth: [] }],
  request: {
    query: findScientificArticlesControllerSchema,
  },
  responses: {
    200: {
      description:
        'Paginated list of scientific articles retrieved successfully',
      summary: 'Articles Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            scientificArticles: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                author: z.string(),
                journal: z.string().nullable(),
                volume: z.string().nullable(),
                edition: z.string().nullable(),
                pageStart: z.number().nullable(),
                pageEnd: z.number().nullable(),
                startDate: z.date(),
                endDate: z.date(),
                city: z.string().nullable(),
                state: z.string().nullable(),
                country: z.string().nullable(),
                publisher: z.string().nullable(),
                description: z.string().nullable(),
                year: z.number().nullable(),
                accessUrl: z.string().nullable(),
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

export const findScientificArticleByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/scientific-articles/{id}',
  tags: ['Scientific Articles'],
  summary: 'Find scientific article by ID',
  security: [{ bearerAuth: [] }],
  request: {
    params: findScientificArticleByIdSchema,
  },
  responses: {
    200: {
      description: 'Scientific article details retrieved successfully',
      summary: 'Article Retrieved',
      content: {
        'application/json': {
          schema: z
            .object({
              id: z.string(),
              title: z.string(),
              author: z.string(),
              journal: z.string().nullable(),
              volume: z.string().nullable(),
              edition: z.string().nullable(),
              pageStart: z.number().nullable(),
              pageEnd: z.number().nullable(),
              startDate: z.date(),
              endDate: z.date(),
              city: z.string().nullable(),
              state: z.string().nullable(),
              country: z.string().nullable(),
              publisher: z.string().nullable(),
              description: z.string().nullable(),
              year: z.number().nullable(),
              accessUrl: z.string().nullable(),
              createdAt: z.date(),
              updatedAt: z.date(),
            })
            .nullable(),
        },
      },
    },
    400: {
      description: 'Invalid article ID format',
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
      description: 'Scientific article not found with the provided ID',
      summary: 'Article Not Found',
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

export const updateScientificArticleRegistry: RouteConfig = {
  method: 'put',
  path: '/scientific-articles/{id}',
  tags: ['Scientific Articles'],
  summary: 'Update scientific article',
  security: [{ bearerAuth: [] }],
  request: {
    params: updateScientificArticleSchema.pick({ id: true }),
    body: {
      content: {
        'application/json': {
          schema: z.object({
            title: z
              .string()
              .min(1)
              .optional()
              .openapi({ description: 'Título do artigo' }),
            author: z
              .string()
              .min(1)
              .optional()
              .openapi({ description: 'Autor do artigo' }),
            journal: z
              .string()
              .optional()
              .openapi({ description: 'Nome do periódico/revista' }),
            volume: z.string().optional().openapi({ description: 'Volume' }),
            edition: z
              .string()
              .optional()
              .openapi({ description: 'Número/Edição' }),
            pageStart: z
              .number()
              .optional()
              .openapi({ description: 'Página inicial' }),
            pageEnd: z
              .number()
              .optional()
              .openapi({ description: 'Página final' }),
            startDate: z.string().optional().openapi({
              description: 'Data de início (ISO 8601)',
              example: '2024-01-01T10:00:00Z',
            }),
            endDate: z.string().optional().openapi({
              description: 'Data de término (ISO 8601)',
              example: '2024-12-31T10:00:00Z',
            }),
            city: z.string().optional().openapi({ description: 'Cidade' }),
            state: z.string().optional().openapi({ description: 'Estado' }),
            country: z.string().optional().openapi({ description: 'País' }),
            publisher: z
              .string()
              .optional()
              .openapi({ description: 'Editora/Instituição' }),
            description: z
              .string()
              .optional()
              .openapi({ description: 'Descrição do artigo' }),
            year: z.number().optional().openapi({ description: 'Ano' }),
            accessUrl: z
              .string()
              .url()
              .optional()
              .openapi({ description: 'URL de acesso' }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Scientific article updated successfully',
      summary: 'Article Updated',
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
      description: 'Scientific article not found with the provided ID',
      summary: 'Article Not Found',
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

export const deleteScientificArticleRegistry: RouteConfig = {
  method: 'delete',
  path: '/scientific-articles/{id}',
  tags: ['Scientific Articles'],
  summary: 'Delete scientific article',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteScientificArticleSchema,
  },
  responses: {
    200: {
      description: 'Scientific article deleted successfully',
      summary: 'Article Deleted',
    },
    400: {
      description: 'Invalid article ID format',
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
      description: 'Scientific article not found with the provided ID',
      summary: 'Article Not Found',
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
