import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { deleteScientificJournalSchema } from '../controllers/scientific-journals/delete-scientific-journal-controller.ts'
import { findScientificJournalByIdSchema } from '../controllers/scientific-journals/find-scientific-journal-by-id-controller.ts'
import { findScientificJournalsControllerSchema } from '../controllers/scientific-journals/find-scientific-journals-controller.ts'
import { updateScientificJournalSchema } from '../controllers/scientific-journals/update-scientific-journal-controller.ts'

export const createScientificJournalRegistry: RouteConfig = {
  method: 'post',
  path: '/scientific-journals',
  tags: ['Scientific Journals'],
  summary: 'Create scientific journal',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            name: z
              .string()
              .min(1)
              .openapi({ description: 'Nome da revista científica' }),
            issn: z.string().min(1).openapi({ description: 'ISSN da revista' }),
            description: z
              .string()
              .min(1)
              .openapi({ description: 'Descrição da revista' }),
            journalUrl: z
              .string()
              .url()
              .openapi({ description: 'URL da revista' }),
            directors: z
              .string()
              .optional()
              .openapi({ description: 'Diretores da revista' }),
            editorialBoard: z
              .string()
              .optional()
              .openapi({ description: 'Conselho editorial' }),
            logo: z.string().optional().openapi({
              description: 'Logo da revista (máximo 5MB)',
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
      description: 'Scientific journal created successfully',
      summary: 'Journal Created',
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

export const findScientificJournalsRegistry: RouteConfig = {
  method: 'get',
  path: '/scientific-journals',
  tags: ['Scientific Journals'],
  summary: 'List scientific journals',
  security: [{ bearerAuth: [] }],
  request: {
    query: findScientificJournalsControllerSchema,
  },
  responses: {
    200: {
      description:
        'Paginated list of scientific journals retrieved successfully',
      summary: 'Journals Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number().optional(),
            limit: z.number().optional(),
            scientificJournals: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                issn: z.string(),
                description: z.string(),
                logoUrl: z.string().nullable(),
                journalUrl: z.string(),
                directors: z.string().nullable(),
                editorialBoard: z.string().nullable(),
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

export const findScientificJournalByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/scientific-journals/{id}',
  tags: ['Scientific Journals'],
  summary: 'Find scientific journal by ID',
  security: [{ bearerAuth: [] }],
  request: {
    params: findScientificJournalByIdSchema,
  },
  responses: {
    200: {
      description: 'Scientific journal details retrieved successfully',
      summary: 'Journal Retrieved',
      content: {
        'application/json': {
          schema: z
            .object({
              id: z.string(),
              name: z.string(),
              issn: z.string(),
              description: z.string(),
              logoUrl: z.string().nullable(),
              journalUrl: z.string(),
              directors: z.string().nullable(),
              editorialBoard: z.string().nullable(),
              createdAt: z.date(),
              updatedAt: z.date(),
            })
            .nullable(),
        },
      },
    },
    400: {
      description: 'Invalid journal ID format',
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
      description: 'Scientific journal not found with the provided ID',
      summary: 'Journal Not Found',
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

export const updateScientificJournalRegistry: RouteConfig = {
  method: 'put',
  path: '/scientific-journals/{id}',
  tags: ['Scientific Journals'],
  summary: 'Update scientific journal',
  security: [{ bearerAuth: [] }],
  request: {
    params: updateScientificJournalSchema.pick({ id: true }),
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            name: z
              .string()
              .min(1)
              .optional()
              .openapi({ description: 'Nome da revista científica' }),
            issn: z
              .string()
              .min(1)
              .optional()
              .openapi({ description: 'ISSN da revista' }),
            description: z
              .string()
              .min(1)
              .optional()
              .openapi({ description: 'Descrição da revista' }),
            journalUrl: z
              .string()
              .url()
              .optional()
              .openapi({ description: 'URL da revista' }),
            directors: z
              .string()
              .optional()
              .openapi({ description: 'Diretores da revista' }),
            editorialBoard: z
              .string()
              .optional()
              .openapi({ description: 'Conselho editorial' }),
            logo: z.string().optional().openapi({
              description: 'Logo da revista (máximo 5MB)',
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
      description: 'Scientific journal updated successfully',
      summary: 'Journal Updated',
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
      description: 'Scientific journal not found with the provided ID',
      summary: 'Journal Not Found',
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

export const deleteScientificJournalRegistry: RouteConfig = {
  method: 'delete',
  path: '/scientific-journals/{id}',
  tags: ['Scientific Journals'],
  summary: 'Delete scientific journal',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteScientificJournalSchema,
  },
  responses: {
    200: {
      description: 'Scientific journal deleted successfully',
      summary: 'Journal Deleted',
    },
    400: {
      description: 'Invalid journal ID format',
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
      description: 'Scientific journal not found with the provided ID',
      summary: 'Journal Not Found',
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
