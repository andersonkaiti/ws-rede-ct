import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import {
  EventFormat,
  EventStatus,
} from '../../config/database/generated/enums.ts'
import { createEventSchema } from '../controllers/event/create-event-controller.ts'
import { deleteEventSchema } from '../controllers/event/delete-event-controller.ts'
import { findEventByIdSchema } from '../controllers/event/find-event-by-id-controller.ts'
import { findEventsSchema } from '../controllers/event/find-events-controller.ts'
import { updateEventSchema } from '../controllers/event/update-event-controller.ts'

const eventSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  startDate: z.date(),
  endDate: z.date(),
  location: z.string().nullable(),
  status: z.enum(EventStatus),
  format: z.enum(EventFormat),
  eventLink: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createEventRegistry: RouteConfig = {
  method: 'post',
  path: '/event',
  tags: ['Events'],
  summary: 'Create a new event',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: createEventSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Event created successfully',
      summary: 'Event Created',
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

export const findEventsRegistry: RouteConfig = {
  method: 'get',
  path: '/event',
  tags: ['Events'],
  summary: 'List all events with pagination and filters',
  request: {
    query: findEventsSchema,
  },
  responses: {
    200: {
      description: 'List of events retrieved successfully with pagination',
      summary: 'Events Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number().optional(),
            limit: z.number().optional(),
            events: z.array(eventSchema),
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

export const findEventByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/event/{id}',
  tags: ['Events'],
  summary: 'Find event by ID',
  request: {
    params: findEventByIdSchema,
  },
  responses: {
    200: {
      description: 'Event details retrieved successfully',
      summary: 'Event Retrieved',
      content: {
        'application/json': {
          schema: eventSchema,
        },
      },
    },
    400: {
      description: 'Invalid event ID format',
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
      description: 'Event not found with the provided ID',
      summary: 'Event Not Found',
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

export const updateEventRegistry: RouteConfig = {
  method: 'put',
  path: '/event/{id}',
  tags: ['Events'],
  summary: 'Update event',
  security: [{ bearerAuth: [] }],
  request: {
    params: findEventByIdSchema,
    body: {
      content: {
        'multipart/form-data': {
          schema: updateEventSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Event updated successfully',
      summary: 'Event Updated',
    },
    400: {
      description: 'Invalid input data or event ID format',
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
      description: 'Event not found with the provided ID',
      summary: 'Event Not Found',
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

export const deleteEventRegistry: RouteConfig = {
  method: 'delete',
  path: '/event/{id}',
  tags: ['Events'],
  summary: 'Delete event',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteEventSchema,
  },
  responses: {
    200: {
      description: 'Event deleted successfully',
      summary: 'Event Deleted',
    },
    400: {
      description: 'Invalid event ID format',
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
      description: 'Event not found with the provided ID',
      summary: 'Event Not Found',
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
