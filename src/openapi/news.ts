import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { createNewsSchema } from '../controllers/news/create-news-controller.ts'
import { findNewsByAuthorSchema } from '../controllers/news/find-news-by-author-id-controller.ts'
import { findNewsByIdSchema } from '../controllers/news/find-news-by-id-controller.ts'
import { findNewsSchema } from '../controllers/news/find-news-controller.ts'

export const createNewsRegistry: RouteConfig = {
  method: 'post',
  path: '/news',
  tags: ['News'],
  summary: 'Create news',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: createNewsSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'News article created successfully',
      summary: 'News Created',
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

export const findAllNewsRegistry: RouteConfig = {
  method: 'get',
  path: '/news',
  tags: ['News'],
  summary: 'List news',
  request: {
    query: findNewsSchema,
  },
  responses: {
    200: {
      description: 'Paginated list of news articles retrieved successfully',
      summary: 'News Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            news: z.array(
              z.object({
                title: z.string(),
                content: z.string(),
                id: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
                imageUrl: z.string().nullable(),
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

export const findNewsByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/news/{id}',
  tags: ['News'],
  summary: 'Find news by ID',
  request: {
    params: findNewsByIdSchema,
  },
  responses: {
    200: {
      description: 'News article details retrieved successfully',
      summary: 'News Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            news: z.object({
              title: z.string(),
              content: z.string(),
              id: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
              imageUrl: z.string().nullable(),
            }),
          }),
        },
      },
    },
    400: {
      description: 'Invalid news ID format',
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
      description: 'News article not found with the provided ID',
      summary: 'News Not Found',
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

export const findNewsByAuthorIdRegistry: RouteConfig = {
  method: 'get',
  path: '/news/author/{author_id}',
  tags: ['News'],
  summary: 'List news by author',
  request: {
    params: z.object({
      author_id: z.string().openapi({
        param: {
          name: 'author_id',
          in: 'path',
        },
      }),
    }),
    query: findNewsByAuthorSchema.omit({ id: true }),
  },
  responses: {
    200: {
      description:
        'Paginated list of news articles by author retrieved successfully',
      summary: 'Author News Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            news: z.array(
              z.object({
                title: z.string(),
                content: z.string(),
                id: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
                imageUrl: z.string().nullable(),
              }),
            ),
          }),
        },
      },
    },
    400: {
      description: 'Invalid author ID or query parameters',
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
      description: 'Author not found with the provided ID',
      summary: 'Author Not Found',
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
