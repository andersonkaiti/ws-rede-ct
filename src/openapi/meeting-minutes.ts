import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import {
  MeetingFormat,
  MeetingStatus,
} from '../../config/database/generated/enums.ts'
import { createMeetingMinuteSchema } from '../controllers/meeting-minute/create-meeting-minute-controller.ts'
import { findMeetingMinuteByMeetingIdSchema } from '../controllers/meeting-minute/find-meeting-minute-by-meeting-id-controller.ts'
import { updateMeetingMinuteByMeetingIdSchema } from '../controllers/meeting-minute/update-meeting-minute-by-meeting-id-controller.ts'

const meetingSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  scheduledAt: z.date(),
  format: z.enum(MeetingFormat),
  agenda: z.string(),
  meetingLink: z.string().nullable(),
  location: z.string().nullable(),
  status: z.enum(MeetingStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
})

const meetingMinuteSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  publishedAt: z.date(),
  documentUrl: z.string(),
  meetingId: z.uuid(),
  meeting: meetingSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createMeetingMinuteRegistry: RouteConfig = {
  method: 'post',
  path: '/meeting/{meetingId}/minute',
  tags: ['Meetings'],
  summary: 'Create a new meeting minute with document upload',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({
      meetingId: z.uuid(),
    }),
    body: {
      content: {
        'multipart/form-data': {
          schema: createMeetingMinuteSchema.omit({ meetingId: true }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Meeting minute created successfully',
      summary: 'Meeting Minute Created',
    },
    400: {
      description:
        'Invalid input data, missing required fields, or invalid document format/size',
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
    409: {
      description: 'Meeting already has a minute',
      summary: 'Conflict',
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

export const findMeetingMinuteByMeetingIdRegistry: RouteConfig = {
  method: 'get',
  path: '/meeting/{meetingId}/minute',
  tags: ['Meetings'],
  summary: 'Find meeting minute by meeting ID',
  request: {
    params: findMeetingMinuteByMeetingIdSchema,
  },
  responses: {
    200: {
      description: 'Meeting minute retrieved successfully by meeting ID',
      summary: 'Meeting Minute Retrieved by Meeting ID',
      content: {
        'application/json': {
          schema: meetingMinuteSchema.nullable(),
        },
      },
    },
    400: {
      description: 'Invalid meeting ID parameter provided',
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

export const updateMeetingMinuteRegistry: RouteConfig = {
  method: 'put',
  path: '/meeting/{meetingId}/minute',
  tags: ['Meetings'],
  summary: 'Update meeting minute with optional document upload',
  security: [{ bearerAuth: [] }],
  request: {
    params: findMeetingMinuteByMeetingIdSchema,
    body: {
      content: {
        'multipart/form-data': {
          schema: updateMeetingMinuteByMeetingIdSchema.omit({
            meetingId: true,
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Meeting minute updated successfully',
      summary: 'Meeting Minute Updated',
    },
    400: {
      description:
        'Invalid input data, meeting minute ID format, or invalid document format/size',
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
      description: 'Meeting minute not found with the provided ID',
      summary: 'Meeting Minute Not Found',
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

export const deleteMeetingMinuteRegistry: RouteConfig = {
  method: 'delete',
  path: '/meeting/{meetingId}/minute',
  tags: ['Meetings'],
  summary: 'Delete meeting minute',
  security: [{ bearerAuth: [] }],
  request: {
    params: findMeetingMinuteByMeetingIdSchema,
  },
  responses: {
    200: {
      description: 'Meeting minute deleted successfully',
      summary: 'Meeting Minute Deleted',
    },
    400: {
      description: 'Invalid meeting minute ID format',
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
      description: 'Meeting minute not found with the provided ID',
      summary: 'Meeting Minute Not Found',
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
