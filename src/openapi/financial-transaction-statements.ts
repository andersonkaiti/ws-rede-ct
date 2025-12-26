import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { createFinancialTransactionStatementSchema } from '../controllers/financial-transaction-statement/create-financial-transaction-statement-controller.ts'
import { deleteFinancialTransactionStatementSchema } from '../controllers/financial-transaction-statement/delete-financial-transaction-statement-controller.ts'
import { findFinancialTransactionStatementByIdSchema } from '../controllers/financial-transaction-statement/find-financial-transaction-statement-by-id-controller.ts'
import { findFinancialTransactionStatementSchema } from '../controllers/financial-transaction-statement/find-financial-transaction-statements-controller.ts'
import { updateFinancialTransactionStatementSchema } from '../controllers/financial-transaction-statement/update-financial-transaction-statement-controller.ts'

const financialTransactionStatementSchema = z.object({
  id: z.uuid(),
  documentUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createFinancialTransactionStatementRegistry: RouteConfig = {
  method: 'post',
  path: '/financial-transaction-statement',
  tags: ['Financial Transaction Statements'],
  summary: 'Create a new financial transaction statement with document upload',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: createFinancialTransactionStatementSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Financial transaction statement created successfully',
      summary: 'Statement Created',
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

export const findFinancialTransactionStatementsRegistry: RouteConfig = {
  method: 'get',
  path: '/financial-transaction-statement',
  tags: ['Financial Transaction Statements'],
  summary: 'List all financial transaction statements with pagination',
  request: {
    query: findFinancialTransactionStatementSchema,
  },
  responses: {
    200: {
      description:
        'List of financial transaction statements retrieved successfully with pagination',
      summary: 'Statements Retrieved',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number().optional(),
            limit: z.number().optional(),
            financialTransactionStatements: z.array(
              financialTransactionStatementSchema,
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

export const findLatestFinancialTransactionStatementRegistry: RouteConfig = {
  method: 'get',
  path: '/financial-transaction-statement/latest',
  tags: ['Financial Transaction Statements'],
  summary: 'Get the most recent financial transaction statement',
  responses: {
    200: {
      description:
        'Latest financial transaction statement retrieved successfully',
      summary: 'Latest Statement Retrieved',
      content: {
        'application/json': {
          schema: financialTransactionStatementSchema.nullable(),
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

export const findFinancialTransactionStatementByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/financial-transaction-statement/{id}',
  tags: ['Financial Transaction Statements'],
  summary: 'Find financial transaction statement by ID',
  request: {
    params: findFinancialTransactionStatementByIdSchema,
  },
  responses: {
    200: {
      description:
        'Financial transaction statement details retrieved successfully',
      summary: 'Statement Retrieved',
      content: {
        'application/json': {
          schema: financialTransactionStatementSchema,
        },
      },
    },
    400: {
      description: 'Invalid statement ID format',
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
      description:
        'Financial transaction statement not found with the provided ID',
      summary: 'Statement Not Found',
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

export const updateFinancialTransactionStatementRegistry: RouteConfig = {
  method: 'put',
  path: '/financial-transaction-statement/{id}',
  tags: ['Financial Transaction Statements'],
  summary:
    'Update financial transaction statement with optional document upload',
  security: [{ bearerAuth: [] }],
  request: {
    params: findFinancialTransactionStatementByIdSchema,
    body: {
      content: {
        'multipart/form-data': {
          schema: updateFinancialTransactionStatementSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Financial transaction statement updated successfully',
      summary: 'Statement Updated',
    },
    400: {
      description:
        'Invalid input data, statement ID format, or invalid document format/size',
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
      description:
        'Financial transaction statement not found with the provided ID',
      summary: 'Statement Not Found',
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

export const deleteFinancialTransactionStatementRegistry: RouteConfig = {
  method: 'delete',
  path: '/financial-transaction-statement/{id}',
  tags: ['Financial Transaction Statements'],
  summary: 'Delete financial transaction statement',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteFinancialTransactionStatementSchema,
  },
  responses: {
    200: {
      description: 'Financial transaction statement deleted successfully',
      summary: 'Statement Deleted',
    },
    400: {
      description: 'Invalid statement ID format',
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
      description:
        'Financial transaction statement not found with the provided ID',
      summary: 'Statement Not Found',
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
