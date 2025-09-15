import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi'
import {
  adminPingRegistry,
  authUserCertificationsRegistry,
  authUserNewsRegistry,
  authUserPendenciesRegistry,
  authUserRegistry,
  signInRegistry,
  signUpRegistry,
} from './auth.ts'
import {
  deleteCertificationRegistry,
  findCertificationByIdRegistry,
  findCertificationsRegistry,
  registerCertificationRegistry,
  updateCertificationRegistry,
} from './certifications.ts'
import {
  createNewsRegistry,
  findAllNewsRegistry,
  findNewsByAuthorIdRegistry,
  findNewsByIdRegistry,
} from './news.ts'
import {
  createPendencyRegistry,
  deletePendencyRegistry,
  findPendenciesRegistry,
  findPendencyByIdRegistry,
  updatePendencyRegistry,
} from './pendencies.ts'
import {
  createTeamRegistry,
  deleteTeamRegistry,
  findTeamByIdRegistry,
  findTeamByTypeRegistry,
  findTeamsRegistry,
  updateTeamRegistry,
} from './team.ts'
import {
  deleteUserRegistry,
  findUserRegistry,
  findUsersRegistry,
  updateUserRegistry,
} from './users.ts'

const registry = new OpenAPIRegistry()

registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
})

// Auth
registry.registerPath(signUpRegistry)
registry.registerPath(signInRegistry)
registry.registerPath(authUserRegistry)
registry.registerPath(authUserNewsRegistry)
registry.registerPath(authUserCertificationsRegistry)
registry.registerPath(authUserPendenciesRegistry)
registry.registerPath(adminPingRegistry)

// Users
registry.registerPath(findUserRegistry)
registry.registerPath(updateUserRegistry)
registry.registerPath(deleteUserRegistry)
registry.registerPath(findUsersRegistry)

// Team
registry.registerPath(createTeamRegistry)
registry.registerPath(updateTeamRegistry)
registry.registerPath(deleteTeamRegistry)
registry.registerPath(findTeamByIdRegistry)
registry.registerPath(findTeamByTypeRegistry)
registry.registerPath(findTeamsRegistry)

// News
registry.registerPath(createNewsRegistry)
registry.registerPath(findAllNewsRegistry)
registry.registerPath(findNewsByIdRegistry)
registry.registerPath(findNewsByAuthorIdRegistry)

// Certifications
registry.registerPath(registerCertificationRegistry)
registry.registerPath(findCertificationsRegistry)
registry.registerPath(findCertificationByIdRegistry)
registry.registerPath(updateCertificationRegistry)
registry.registerPath(deleteCertificationRegistry)

// Pendencies
registry.registerPath(createPendencyRegistry)
registry.registerPath(findPendenciesRegistry)
registry.registerPath(findPendencyByIdRegistry)
registry.registerPath(updatePendencyRegistry)
registry.registerPath(deletePendencyRegistry)

const generator = new OpenApiGeneratorV3(registry.definitions)

export const swaggerDocument = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'API da Rede CT',
    version: '1.0.0',
    description: 'API com validação Zod',
  },
})
