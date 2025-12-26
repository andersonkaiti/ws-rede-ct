import type { RouteConfig } from '@asteasolutions/zod-to-openapi'
import z from 'zod'
import { createCheckingAccountSchema } from '../controllers/checking-account/create-checking-account-controller.ts'
import { deleteCheckingAccountSchema } from '../controllers/checking-account/delete-checking-account-controller.ts'
import { findCheckingAccountByIdSchema } from '../controllers/checking-account/find-checking-account-by-id-controller.ts'
import { findCheckingAccountsSchema } from '../controllers/checking-account/find-checking-accounts-controller.ts'
import { findLatestByTypeSchema } from '../controllers/checking-account/find-latest-by-type-controller.ts'
import { updateCheckingAccountSchema } from '../controllers/checking-account/update-checking-account-controller.ts'

const checkingAccountSchema = z.object({
  id: z.uuid(),
  type: z.enum(['EXCLUSIVE_REDECT_USE', 'EVENTS', 'COLLOQUIUM']),
  balance: z.number(),
  balanceInCents: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const createCheckingAccountRegistry: RouteConfig = {
  method: 'post',
  path: '/checking-account',
  tags: ['Checking Accounts'],
  summary: 'Create a new checking account',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createCheckingAccountSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Checking account created successfully',
      content: {
        'application/json': {
          schema: checkingAccountSchema,
        },
      },
    },
    400: {
      description: 'Invalid input data',
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

export const findCheckingAccountsRegistry: RouteConfig = {
  method: 'get',
  path: '/checking-account',
  tags: ['Checking Accounts'],
  summary: 'List all checking accounts with pagination',
  request: {
    query: findCheckingAccountsSchema,
  },
  responses: {
    200: {
      description: 'List of checking accounts retrieved successfully',
      content: {
        'application/json': {
          schema: z.object({
            page: z.number(),
            totalPages: z.number(),
            offset: z.number(),
            limit: z.number(),
            checkingAccounts: z.array(checkingAccountSchema),
          }),
        },
      },
    },
  },
}

export const getTotalBalanceRegistry: RouteConfig = {
  method: 'get',
  path: '/checking-account/total-balance',
  tags: ['Checking Accounts'],
  summary: 'Get total balance from latest records of all 3 account types',
  responses: {
    200: {
      description: 'Total balance calculated successfully',
      content: {
        'application/json': {
          schema: z.object({
            totalBalance: z.number(),
            totalBalanceInCents: z.number(),
            accounts: z.object({
              exclusiveRedectUse: checkingAccountSchema
                .pick({
                  id: true,
                  balanceInCents: true,
                  updatedAt: true,
                })
                .extend({ balance: z.number() })
                .nullable(),
              events: checkingAccountSchema
                .pick({
                  id: true,
                  balanceInCents: true,
                  updatedAt: true,
                })
                .extend({ balance: z.number() })
                .nullable(),
              colloquium: checkingAccountSchema
                .pick({
                  id: true,
                  balanceInCents: true,
                  updatedAt: true,
                })
                .extend({ balance: z.number() })
                .nullable(),
            }),
          }),
        },
      },
    },
  },
}

export const findLatestByTypeRegistry: RouteConfig = {
  method: 'get',
  path: '/checking-account/latest/{type}',
  tags: ['Checking Accounts'],
  summary: 'Get latest checking account by type',
  request: {
    params: findLatestByTypeSchema,
  },
  responses: {
    200: {
      description: 'Latest checking account retrieved successfully',
      content: {
        'application/json': {
          schema: checkingAccountSchema.nullable(),
        },
      },
    },
  },
}

export const findCheckingAccountByIdRegistry: RouteConfig = {
  method: 'get',
  path: '/checking-account/{id}',
  tags: ['Checking Accounts'],
  summary: 'Find checking account by ID',
  request: {
    params: findCheckingAccountByIdSchema,
  },
  responses: {
    200: {
      description: 'Checking account retrieved successfully',
      content: {
        'application/json': {
          schema: checkingAccountSchema,
        },
      },
    },
    404: {
      description: 'Checking account not found',
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

export const updateCheckingAccountRegistry: RouteConfig = {
  method: 'put',
  path: '/checking-account/{id}',
  tags: ['Checking Accounts'],
  summary: 'Update checking account',
  security: [{ bearerAuth: [] }],
  request: {
    params: updateCheckingAccountSchema.pick({ id: true }),
    body: {
      content: {
        'application/json': {
          schema: updateCheckingAccountSchema.omit({ id: true }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Checking account updated successfully',
    },
    404: {
      description: 'Checking account not found',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    401: {
      description: 'User not authenticated',
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

export const deleteCheckingAccountRegistry: RouteConfig = {
  method: 'delete',
  path: '/checking-account/{id}',
  tags: ['Checking Accounts'],
  summary: 'Delete checking account',
  security: [{ bearerAuth: [] }],
  request: {
    params: deleteCheckingAccountSchema,
  },
  responses: {
    200: {
      description: 'Checking account deleted successfully',
    },
    404: {
      description: 'Checking account not found',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
    401: {
      description: 'User not authenticated',
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
