import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import {
  MeetingFormat,
  MeetingStatus,
} from '../../config/database/generated/enums.ts'
import { createMeetingSchema } from '../controllers/meeting/create-meeting-controller.ts'
import { deleteMeetingSchema } from '../controllers/meeting/delete-meeting-controller.ts'
import { findMeetingByIdSchema } from '../controllers/meeting/find-meeting-by-id-controller.ts'
import { findMeetingByStatusSchema } from '../controllers/meeting/find-meeting-by-status-controller.ts'
import { findMeetingSchema } from '../controllers/meeting/find-meetings-controller.ts'
import { updateMeetingSchema } from '../controllers/meeting/update-meeting-controller.ts'

const meetingMinuteSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  publishedAt: z.date(),
  documentUrl: z.string(),
  meetingId: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

const meetingSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  scheduledAt: z.date(),
  format: z.enum(MeetingFormat),
  agenda: z.string(),
  meetingLink: z.string().nullable(),
  location: z.string().nullable(),
  status: z.enum(MeetingStatus),
  minutes: meetingMinuteSchema.nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createMeetingRegistry: RouteConfig = {
  method: 'post',
  path: '/meeting',
  tags: ['Meetings'],
  summary: 'Create a new meeting',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createMeetingSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Meeting created successfully',
      summary: 'Meeting Created',
    },
    400: {
      description: 'Invalid input data or missing required fields',
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
      description: 'User not authenticated',
      summary: 'Authentication Required',
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

export const findMeetingsRegistry: RouteConfig = {
  method: 'get',
  path: '/meeting',
  tags: ['Meetings'],
  summary: 'List all meetings with pagination and filters',
  request: {
    query: findMeetingSchema,
  },
  responses: {
    200: {
      description: 'List of meetings retrieved successfully with pagination',
      summary: 'Meetings Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            meetings: z.array(meetingSchema),
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

export const findMeetingByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/meeting/{id}',
  tags: ['Meetings'],
  summary: 'Find meeting by ID',
  request: {
    params: findMeetingByIdSchema,
  },
  responses: {
    200: {
      description: 'Meeting details retrieved successfully',
      summary: 'Meeting Retrieved',
      content: {
        'application/json': {
          schema: meetingSchema,
        },
      },
    },
    400: {
      description: 'Invalid meeting ID format',
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
      description: 'Meeting not found with the provided ID',
      summary: 'Meeting Not Found',
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

export const findMeetingByStatusRegistry: RouteConfig = {
  method: 'get',
  path: '/meeting/status/{status}',
  tags: ['Meetings'],
  summary: 'Find meetings by status',
  request: {
    params: findMeetingByStatusSchema,
  },
  responses: {
    200: {
      description: 'Meetings retrieved successfully by status',
      summary: 'Meetings Retrieved by Status',
      content: {
        'application/json': {
          schema: z.array(meetingSchema),
        },
      },
    },
    400: {
      description: 'Invalid status parameter provided',
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

export const updateMeetingRegistry: RouteConfig = {
  method: 'put',
  path: '/meeting/{id}',
  tags: ['Meetings'],
  summary: 'Update meeting',
  security: [{ bearerAuth: [] }],
  request: {
    params: findMeetingByIdSchema,
    body: {
      content: {
        'application/json': {
          schema: updateMeetingSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Meeting updated successfully',
      summary: 'Meeting Updated',
    },
    400: {
      description: 'Invalid input data or meeting ID format',
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
      description: 'User not authenticated',
      summary: 'Authentication Required',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: 'Meeting not found with the provided ID',
      summary: 'Meeting Not Found',
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

export const deleteMeetingRegistry: RouteConfig = {
  method: 'delete',
  path: '/meeting/{id}',
  tags: ['Meetings'],
  summary: 'Delete meeting',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteMeetingSchema,
  },
  responses: {
    200: {
      description: 'Meeting deleted successfully',
      summary: 'Meeting Deleted',
    },
    400: {
      description: 'Invalid meeting ID format',
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
      description: 'User not authenticated',
      summary: 'Authentication Required',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    404: {
      description: 'Meeting not found with the provided ID',
      summary: 'Meeting Not Found',
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
