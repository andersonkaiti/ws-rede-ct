import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { deleteCourseSchema } from '../controllers/courses/delete-course-controller.ts'
import { findCourseByIdSchema } from '../controllers/courses/find-course-by-id-controller.ts'
import { findCoursesControllerSchema } from '../controllers/courses/find-courses-controller.ts'
import { updateCourseSchema } from '../controllers/courses/update-course-controller.ts'

export const createCourseRegistry: RouteConfig = {
  method: 'post',
  path: '/courses',
  tags: ['Courses'],
  summary: 'Create course',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            title: z
              .string()
              .min(1)
              .openapi({ description: 'Título do curso' }),
            coordinator: z
              .string()
              .min(1)
              .openapi({ description: 'Nome do coordenador' }),
            email: z
              .string()
              .email()
              .openapi({ description: 'E-mail de contato' }),
            location: z
              .string()
              .min(1)
              .openapi({ description: 'Localização do curso' }),
            scheduledAt: z.string().openapi({
              description: 'Data e hora agendada (ISO 8601)',
              example: '2024-01-01T10:00:00Z',
            }),
            registrationLink: z
              .string()
              .url()
              .optional()
              .openapi({ description: 'Link de inscrição' }),
            description: z
              .string()
              .optional()
              .openapi({ description: 'Descrição do curso' }),
            instructorIds: z.string().openapi({
              description: 'IDs dos instrutores separados por vírgula',
              example: 'uuid1,uuid2,uuid3',
            }),
            image: z.string().optional().openapi({
              description: 'Imagem do curso (máximo 5MB)',
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
      description: 'Course created successfully',
      summary: 'Course Created',
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

export const findCoursesRegistry: RouteConfig = {
  method: 'get',
  path: '/courses',
  tags: ['Courses'],
  summary: 'List courses',
  security: [{ bearerAuth: [] }],
  request: {
    query: findCoursesControllerSchema,
  },
  responses: {
    200: {
      description:
        'Paginated list of courses with instructor information retrieved successfully',
      summary: 'Courses Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number().optional(),
            limit: z.number().optional(),
            courses: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                imageUrl: z.string().nullable(),
                coordinator: z.string(),
                email: z.string(),
                scheduledAt: z.date(),
                location: z.string(),
                registrationLink: z.string().nullable(),
                description: z.string().nullable(),
                createdAt: z.date(),
                updatedAt: z.date(),
                instructors: z.array(
                  z.object({
                    id: z.uuid(),
                    name: z.string(),
                    emailAddress: z.email(),
                    avatarUrl: z.string().nullable(),
                    createdAt: z.date(),
                    updatedAt: z.date(),
                  }),
                ),
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

export const findCourseByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/courses/{id}',
  tags: ['Courses'],
  summary: 'Find course by ID',
  security: [{ bearerAuth: [] }],
  request: {
    params: findCourseByIdSchema,
  },
  responses: {
    200: {
      description: 'Course details retrieved successfully',
      summary: 'Course Retrieved',
      content: {
        'application/json': {
          schema: z
            .object({
              id: z.string(),
              title: z.string(),
              imageUrl: z.string().nullable(),
              coordinator: z.string(),
              email: z.string(),
              scheduledAt: z.date(),
              location: z.string(),
              registrationLink: z.string().nullable(),
              description: z.string().nullable(),
              createdAt: z.date(),
              updatedAt: z.date(),
              instructors: z.array(
                z.object({
                  id: z.uuid(),
                  name: z.string(),
                  emailAddress: z.email(),
                  avatarUrl: z.string().nullable(),
                  createdAt: z.date(),
                  updatedAt: z.date(),
                }),
              ),
            })
            .nullable(),
        },
      },
    },
    400: {
      description: 'Invalid course ID format',
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
      description: 'Course not found with the provided ID',
      summary: 'Course Not Found',
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

export const updateCourseRegistry: RouteConfig = {
  method: 'put',
  path: '/courses/{id}',
  tags: ['Courses'],
  summary: 'Update course',
  security: [{ bearerAuth: [] }],
  request: {
    params: updateCourseSchema.pick({ id: true }),
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            title: z
              .string()
              .min(1)
              .optional()
              .openapi({ description: 'Título do curso' }),
            coordinator: z
              .string()
              .min(1)
              .optional()
              .openapi({ description: 'Nome do coordenador' }),
            email: z
              .string()
              .email()
              .optional()
              .openapi({ description: 'E-mail de contato' }),
            location: z
              .string()
              .min(1)
              .optional()
              .openapi({ description: 'Localização do curso' }),
            scheduledAt: z.string().optional().openapi({
              description: 'Data e hora agendada (ISO 8601)',
              example: '2024-01-01T10:00:00Z',
            }),
            registrationLink: z
              .string()
              .url()
              .optional()
              .openapi({ description: 'Link de inscrição' }),
            description: z
              .string()
              .optional()
              .openapi({ description: 'Descrição do curso' }),
            instructorIds: z.string().optional().openapi({
              description: 'IDs dos instrutores separados por vírgula',
              example: 'uuid1,uuid2,uuid3',
            }),
            image: z.string().optional().openapi({
              description: 'Imagem do curso (máximo 5MB)',
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
      description: 'Course updated successfully',
      summary: 'Course Updated',
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
      description: 'Course not found with the provided ID',
      summary: 'Course Not Found',
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

export const deleteCourseRegistry: RouteConfig = {
  method: 'delete',
  path: '/courses/{id}',
  tags: ['Courses'],
  summary: 'Delete course',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteCourseSchema,
  },
  responses: {
    200: {
      description: 'Course deleted successfully',
      summary: 'Course Deleted',
    },
    400: {
      description: 'Invalid course ID format',
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
      description: 'Course not found with the provided ID',
      summary: 'Course Not Found',
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
