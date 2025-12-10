import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { deleteResearchGroupSchema } from '../controllers/research-groups/delete-research-group-controller.ts'
import { findResearchGroupByIdSchema } from '../controllers/research-groups/find-research-group-by-id-controller.ts'
import { findResearchGroupsControllerSchema } from '../controllers/research-groups/find-research-groups-controller.ts'
import { updateResearchGroupSchema } from '../controllers/research-groups/update-research-group-controller.ts'

export const createResearchGroupRegistry: RouteConfig = {
  method: 'post',
  path: '/research-groups',
  tags: ['Research Groups'],
  summary: 'Create research group',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            name: z
              .string()
              .min(1)
              .openapi({ description: 'Nome do grupo de pesquisa' }),
            acronym: z
              .string()
              .optional()
              .openapi({ description: 'Sigla do grupo' }),
            description: z
              .string()
              .optional()
              .openapi({ description: 'Descrição do grupo' }),
            url: z
              .string()
              .url()
              .optional()
              .openapi({ description: 'URL do grupo' }),
            foundedAt: z.string().openapi({
              description: 'Data de fundação (ISO 8601)',
              example: '2024-01-01T00:00:00Z',
            }),
            scope: z
              .string()
              .optional()
              .openapi({ description: 'Escopo do grupo' }),
            email: z
              .string()
              .email()
              .optional()
              .openapi({ description: 'E-mail de contato' }),
            leaderId: z
              .string()
              .uuid()
              .openapi({ description: 'ID do líder (UUID)' }),
            deputyLeaderId: z
              .string()
              .uuid()
              .openapi({ description: 'ID do vice-líder (UUID)' }),
            logo: z.string().optional().openapi({
              description: 'Logo do grupo (máximo 5MB)',
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
      description: 'Research group created successfully',
      summary: 'Research Group Created',
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

export const findResearchGroupsRegistry: RouteConfig = {
  method: 'get',
  path: '/research-groups',
  tags: ['Research Groups'],
  summary: 'List research groups',
  security: [{ bearerAuth: [] }],
  request: {
    query: findResearchGroupsControllerSchema,
  },
  responses: {
    200: {
      description:
        'Paginated list of research groups with leader information retrieved successfully',
      summary: 'Research Groups Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            researchGroups: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                acronym: z.string().nullable(),
                description: z.string().nullable(),
                url: z.string().nullable(),
                logoUrl: z.string().nullable(),
                foundedAt: z.date(),
                scope: z.string().nullable(),
                email: z.string().nullable(),
                leaderId: z.string(),
                deputyLeaderId: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
                leader: z.object({
                  id: z.uuid(),
                  name: z.string(),
                  emailAddress: z.email(),
                  avatarUrl: z.string().nullable(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                }),
                deputyLeader: z.object({
                  id: z.uuid(),
                  name: z.string(),
                  emailAddress: z.email(),
                  avatarUrl: z.string().nullable(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                }),
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

export const findResearchGroupByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/research-groups/{id}',
  tags: ['Research Groups'],
  summary: 'Find research group by ID',
  security: [{ bearerAuth: [] }],
  request: {
    params: findResearchGroupByIdSchema,
  },
  responses: {
    200: {
      description: 'Research group details retrieved successfully',
      summary: 'Research Group Retrieved',
      content: {
        'application/json': {
          schema: z
            .object({
              id: z.string(),
              name: z.string(),
              acronym: z.string().nullable(),
              description: z.string().nullable(),
              url: z.string().nullable(),
              logoUrl: z.string().nullable(),
              foundedAt: z.date(),
              scope: z.string().nullable(),
              email: z.string().nullable(),
              leaderId: z.string(),
              deputyLeaderId: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
              leader: z.object({
                id: z.uuid(),
                name: z.string(),
                emailAddress: z.email(),
                avatarUrl: z.string().nullable(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
              deputyLeader: z.object({
                id: z.uuid(),
                name: z.string(),
                emailAddress: z.email(),
                avatarUrl: z.string().nullable(),
                createdAt: z.date(),
                updatedAt: z.date(),
              }),
            })
            .nullable(),
        },
      },
    },
    400: {
      description: 'Invalid research group ID format',
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
      description: 'Research group not found with the provided ID',
      summary: 'Research Group Not Found',
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

export const updateResearchGroupRegistry: RouteConfig = {
  method: 'put',
  path: '/research-groups/{id}',
  tags: ['Research Groups'],
  summary: 'Update research group',
  security: [{ bearerAuth: [] }],
  request: {
    params: updateResearchGroupSchema.pick({ id: true }),
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            name: z
              .string()
              .min(1)
              .optional()
              .openapi({ description: 'Nome do grupo de pesquisa' }),
            acronym: z
              .string()
              .optional()
              .openapi({ description: 'Sigla do grupo' }),
            description: z
              .string()
              .optional()
              .openapi({ description: 'Descrição do grupo' }),
            url: z
              .string()
              .url()
              .optional()
              .openapi({ description: 'URL do grupo' }),
            foundedAt: z.string().optional().openapi({
              description: 'Data de fundação (ISO 8601)',
              example: '2024-01-01T00:00:00Z',
            }),
            scope: z
              .string()
              .optional()
              .openapi({ description: 'Escopo do grupo' }),
            email: z
              .string()
              .email()
              .optional()
              .openapi({ description: 'E-mail de contato' }),
            leaderId: z
              .string()
              .uuid()
              .optional()
              .openapi({ description: 'ID do líder (UUID)' }),
            deputyLeaderId: z
              .string()
              .uuid()
              .optional()
              .openapi({ description: 'ID do vice-líder (UUID)' }),
            logo: z.string().optional().openapi({
              description: 'Logo do grupo (máximo 5MB)',
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
      description: 'Research group updated successfully',
      summary: 'Research Group Updated',
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
      description: 'Research group not found with the provided ID',
      summary: 'Research Group Not Found',
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

export const deleteResearchGroupRegistry: RouteConfig = {
  method: 'delete',
  path: '/research-groups/{id}',
  tags: ['Research Groups'],
  summary: 'Delete research group',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteResearchGroupSchema,
  },
  responses: {
    200: {
      description: 'Research group deleted successfully',
      summary: 'Research Group Deleted',
    },
    400: {
      description: 'Invalid research group ID format',
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
      description: 'Research group not found with the provided ID',
      summary: 'Research Group Not Found',
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
