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
  createBookVolumeRegistry,
  deleteBookVolumeRegistry,
  findBookVolumeByIdRegistry,
  findBookVolumesRegistry,
  updateBookVolumeRegistry,
} from './book-volumes.ts'
import {
  deleteCertificationRegistry,
  findCertificationByIdRegistry,
  findCertificationsRegistry,
  registerCertificationRegistry,
  updateCertificationRegistry,
} from './certifications.ts'
import {
  createCourseRegistry,
  deleteCourseRegistry,
  findCourseByIdRegistry,
  findCoursesRegistry,
  updateCourseRegistry,
} from './courses.ts'
import {
  createETPRegistry,
  deleteETPRegistry,
  findETPByIdRegistry,
  findETPsRegistry,
  updateETPRegistry,
} from './etps.ts'
import {
  createEventRegistry,
  deleteEventRegistry,
  findEventByIdRegistry,
  findEventsRegistry,
  updateEventRegistry,
} from './events.ts'
import {
  createInMemoriamRegistry,
  deleteInMemoriamRegistry,
  findInMemoriamByIdRegistry,
  findInMemoriamsRegistry,
  updateInMemoriamRegistry,
} from './in-memoriam.ts'
import {
  createCongressGalleryRegistry,
  deleteCongressGalleryRegistry,
  findCongressGalleriesByCongressIdRegistry,
  updateCongressGalleryRegistry,
} from './international-scientific-congresses/congress-galleries.ts'
import {
  createCongressPartnerRegistry,
  deleteCongressPartnerRegistry,
  findCongressPartnersByCongressIdRegistry,
  updateCongressPartnerRegistry,
} from './international-scientific-congresses/congress-partners.ts'
import {
  createInternationalScientificCongressRegistry,
  deleteInternationalScientificCongressRegistry,
  findInternationalScientificCongressByEditionRegistry,
  findInternationalScientificCongressByIdRegistry,
  findInternationalScientificCongressesRegistry,
  updateInternationalScientificCongressRegistry,
} from './international-scientific-congresses/international-scientific-congresses.ts'
import {
  createLawRegistry,
  deleteLawRegistry,
  findLawByIdRegistry,
  findLawsRegistry,
  updateLawRegistry,
} from './laws.ts'
import {
  createLegitimatorCommitteeMemberRegistry,
  deleteLegitimatorCommitteeMemberRegistry,
  findLegitimatorCommitteeMemberByIdRegistry,
  findLegitimatorCommitteeMembersRegistry,
  updateLegitimatorCommitteeMemberRegistry,
} from './legitimator-committee-members.ts'
import {
  createManagementTeamRegistry,
  deleteManagementTeamRegistry,
  findManagementTeamByIdRegistry,
  findManagementTeamsRegistry,
  updateManagementTeamRegistry,
} from './management-teams.ts'
import {
  createMeetingMinuteRegistry,
  deleteMeetingMinuteRegistry,
  findMeetingMinuteByMeetingIdRegistry,
  updateMeetingMinuteRegistry,
} from './meeting-minutes.ts'
import {
  createMeetingRegistry,
  deleteMeetingRegistry,
  findMeetingByIdRegistry,
  findMeetingByStatusRegistry,
  findMeetingsRegistry,
  updateMeetingRegistry,
} from './meetings.ts'
import {
  createMuseumRegistry,
  deleteMuseumRegistry,
  findMuseumByIdRegistry,
  findMuseumsRegistry,
  updateMuseumRegistry,
} from './museums.ts'
import {
  createNewsRegistry,
  findAllNewsRegistry,
  findNewsByAuthorIdRegistry,
  findNewsByIdRegistry,
} from './news.ts'
import {
  createPartnerRegistry,
  deletePartnerRegistry,
  findPartnerByIdRegistry,
  findPartnersRegistry,
  updatePartnerRegistry,
} from './partners.ts'
import {
  createPendencyRegistry,
  deletePendencyRegistry,
  findPendenciesRegistry,
  findPendencyByIdRegistry,
  updatePendencyRegistry,
} from './pendencies.ts'
import {
  createPostGraduateProgramRegistry,
  deletePostGraduateProgramRegistry,
  findPostGraduateProgramByIdRegistry,
  findPostGraduateProgramsRegistry,
  updatePostGraduateProgramRegistry,
} from './post-graduate-programs.ts'
import {
  createRedeCTHighlightRegistry,
  deleteRedeCTHighlightRegistry,
  findRedeCTHighlightByIdRegistry,
  findRedeCTHighlightsRegistry,
  updateRedeCTHighlightRegistry,
} from './redect-highlights.ts'
import {
  createReferenceCenterTeamMemberRegistry,
  deleteReferenceCenterTeamMemberRegistry,
  findReferenceCenterTeamMemberByIdRegistry,
  findReferenceCenterTeamMembersRegistry,
  updateReferenceCenterTeamMemberRegistry,
} from './reference-center-team-members.ts'
import {
  createRegimentRegistry,
  deleteRegimentRegistry,
  findRegimentByIdRegistry,
  findRegimentByStatusRegistry,
  findRegimentsRegistry,
  updateRegimentRegistry,
} from './regiments.ts'
import {
  createCongressGalleryRegistry as createRegionalCongressGalleryRegistry,
  deleteCongressGalleryRegistry as deleteRegionalCongressGalleryRegistry,
  findCongressGalleriesByCongressIdRegistry as findRegionalCongressGalleriesByCongressIdRegistry,
  updateCongressGalleryRegistry as updateRegionalCongressGalleryRegistry,
} from './regional-congresses/congress-galleries.ts'
import {
  createCongressPartnerRegistry as createRegionalCongressPartnerRegistry,
  deleteCongressPartnerRegistry as deleteRegionalCongressPartnerRegistry,
  findCongressPartnersByCongressIdRegistry as findRegionalCongressPartnersByCongressIdRegistry,
  updateCongressPartnerRegistry as updateRegionalCongressPartnerRegistry,
} from './regional-congresses/congress-partners.ts'
import {
  createRegionalCongressRegistry,
  deleteRegionalCongressRegistry,
  findRegionalCongressByEditionRegistry,
  findRegionalCongressByIdRegistry,
  findRegionalCongressesRegistry,
  updateRegionalCongressRegistry,
} from './regional-congresses/regional-congresses.ts'
import {
  createResearchGroupRegistry,
  deleteResearchGroupRegistry,
  findResearchGroupByIdRegistry,
  findResearchGroupsRegistry,
  updateResearchGroupRegistry,
} from './research-groups.ts'
import {
  createResearcherRegistry,
  deleteResearcherRegistry,
  findResearcherByIdRegistry,
  findResearcherByUserIdRegistry,
  findResearchersRegistry,
  updateResearcherRegistry,
} from './researchers.ts'
import {
  createScientificArticleRegistry,
  deleteScientificArticleRegistry,
  findScientificArticleByIdRegistry,
  findScientificArticlesRegistry,
  updateScientificArticleRegistry,
} from './scientific-articles.ts'
import {
  createScientificJournalRegistry,
  deleteScientificJournalRegistry,
  findScientificJournalByIdRegistry,
  findScientificJournalsRegistry,
  updateScientificJournalRegistry,
} from './scientific-journals.ts'
import {
  createSDHCTeamMemberRegistry,
  deleteSDHCTeamMemberRegistry,
  findSDHCTeamMemberByIdRegistry,
  findSDHCTeamMembersRegistry,
  updateSDHCTeamMemberRegistry,
} from './sdhc-team-members.ts'
import {
  deleteUserRegistry,
  findUserRegistry,
  findUsersRegistry,
  updateUserRegistry,
} from './users.ts'
import {
  createWebinarRegistry,
  deleteWebinarRegistry,
  findWebinarByIdRegistry,
  findWebinarsRegistry,
  updateWebinarRegistry,
} from './webinars.ts'
import {
  createWorkGroupTeamMemberRegistry,
  deleteWorkGroupTeamMemberRegistry,
  findWorkGroupTeamMemberByIdRegistry,
  findWorkGroupTeamMembersRegistry,
  updateWorkGroupTeamMemberRegistry,
} from './work-group-team-members.ts'

const registry = new OpenAPIRegistry()

registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
})

registry.registerPath(signUpRegistry)
registry.registerPath(signInRegistry)
registry.registerPath(authUserRegistry)
registry.registerPath(authUserNewsRegistry)
registry.registerPath(authUserCertificationsRegistry)
registry.registerPath(authUserPendenciesRegistry)
registry.registerPath(adminPingRegistry)

registry.registerPath(findUserRegistry)
registry.registerPath(updateUserRegistry)
registry.registerPath(deleteUserRegistry)
registry.registerPath(findUsersRegistry)

registry.registerPath(createNewsRegistry)
registry.registerPath(findAllNewsRegistry)
registry.registerPath(findNewsByIdRegistry)
registry.registerPath(findNewsByAuthorIdRegistry)

registry.registerPath(registerCertificationRegistry)
registry.registerPath(findCertificationsRegistry)
registry.registerPath(findCertificationByIdRegistry)
registry.registerPath(updateCertificationRegistry)
registry.registerPath(deleteCertificationRegistry)

registry.registerPath(createPendencyRegistry)
registry.registerPath(findPendenciesRegistry)
registry.registerPath(findPendencyByIdRegistry)
registry.registerPath(updatePendencyRegistry)
registry.registerPath(deletePendencyRegistry)

registry.registerPath(createInMemoriamRegistry)
registry.registerPath(findInMemoriamsRegistry)
registry.registerPath(findInMemoriamByIdRegistry)
registry.registerPath(updateInMemoriamRegistry)
registry.registerPath(deleteInMemoriamRegistry)

registry.registerPath(createResearcherRegistry)
registry.registerPath(findResearchersRegistry)
registry.registerPath(findResearcherByIdRegistry)
registry.registerPath(findResearcherByUserIdRegistry)
registry.registerPath(updateResearcherRegistry)
registry.registerPath(deleteResearcherRegistry)

registry.registerPath(createETPRegistry)
registry.registerPath(findETPsRegistry)
registry.registerPath(findETPByIdRegistry)
registry.registerPath(updateETPRegistry)
registry.registerPath(deleteETPRegistry)

registry.registerPath(createPartnerRegistry)
registry.registerPath(findPartnersRegistry)
registry.registerPath(findPartnerByIdRegistry)
registry.registerPath(updatePartnerRegistry)
registry.registerPath(deletePartnerRegistry)

registry.registerPath(createMuseumRegistry)
registry.registerPath(findMuseumsRegistry)
registry.registerPath(findMuseumByIdRegistry)
registry.registerPath(updateMuseumRegistry)
registry.registerPath(deleteMuseumRegistry)

registry.registerPath(createRedeCTHighlightRegistry)
registry.registerPath(findRedeCTHighlightsRegistry)
registry.registerPath(findRedeCTHighlightByIdRegistry)
registry.registerPath(updateRedeCTHighlightRegistry)
registry.registerPath(deleteRedeCTHighlightRegistry)

registry.registerPath(createManagementTeamRegistry)
registry.registerPath(findManagementTeamsRegistry)
registry.registerPath(findManagementTeamByIdRegistry)
registry.registerPath(updateManagementTeamRegistry)
registry.registerPath(deleteManagementTeamRegistry)

registry.registerPath(createSDHCTeamMemberRegistry)
registry.registerPath(findSDHCTeamMembersRegistry)
registry.registerPath(findSDHCTeamMemberByIdRegistry)
registry.registerPath(updateSDHCTeamMemberRegistry)
registry.registerPath(deleteSDHCTeamMemberRegistry)

registry.registerPath(createLegitimatorCommitteeMemberRegistry)
registry.registerPath(findLegitimatorCommitteeMembersRegistry)
registry.registerPath(findLegitimatorCommitteeMemberByIdRegistry)
registry.registerPath(updateLegitimatorCommitteeMemberRegistry)
registry.registerPath(deleteLegitimatorCommitteeMemberRegistry)

registry.registerPath(createRegimentRegistry)
registry.registerPath(findRegimentsRegistry)
registry.registerPath(findRegimentByIdRegistry)
registry.registerPath(findRegimentByStatusRegistry)
registry.registerPath(updateRegimentRegistry)
registry.registerPath(deleteRegimentRegistry)

registry.registerPath(createMeetingRegistry)
registry.registerPath(findMeetingsRegistry)
registry.registerPath(findMeetingByIdRegistry)
registry.registerPath(findMeetingByStatusRegistry)
registry.registerPath(updateMeetingRegistry)
registry.registerPath(deleteMeetingRegistry)

registry.registerPath(createMeetingMinuteRegistry)
registry.registerPath(findMeetingMinuteByMeetingIdRegistry)
registry.registerPath(updateMeetingMinuteRegistry)
registry.registerPath(deleteMeetingMinuteRegistry)

registry.registerPath(createInternationalScientificCongressRegistry)
registry.registerPath(findInternationalScientificCongressesRegistry)
registry.registerPath(findInternationalScientificCongressByIdRegistry)
registry.registerPath(findInternationalScientificCongressByEditionRegistry)
registry.registerPath(updateInternationalScientificCongressRegistry)
registry.registerPath(deleteInternationalScientificCongressRegistry)

registry.registerPath(createCongressPartnerRegistry)
registry.registerPath(findCongressPartnersByCongressIdRegistry)
registry.registerPath(updateCongressPartnerRegistry)
registry.registerPath(deleteCongressPartnerRegistry)

registry.registerPath(createCongressGalleryRegistry)
registry.registerPath(findCongressGalleriesByCongressIdRegistry)
registry.registerPath(updateCongressGalleryRegistry)
registry.registerPath(deleteCongressGalleryRegistry)

registry.registerPath(createRegionalCongressRegistry)
registry.registerPath(findRegionalCongressesRegistry)
registry.registerPath(findRegionalCongressByIdRegistry)
registry.registerPath(findRegionalCongressByEditionRegistry)
registry.registerPath(updateRegionalCongressRegistry)
registry.registerPath(deleteRegionalCongressRegistry)

registry.registerPath(createRegionalCongressPartnerRegistry)
registry.registerPath(findRegionalCongressPartnersByCongressIdRegistry)
registry.registerPath(updateRegionalCongressPartnerRegistry)
registry.registerPath(deleteRegionalCongressPartnerRegistry)

registry.registerPath(createRegionalCongressGalleryRegistry)
registry.registerPath(findRegionalCongressGalleriesByCongressIdRegistry)
registry.registerPath(updateRegionalCongressGalleryRegistry)
registry.registerPath(deleteRegionalCongressGalleryRegistry)

registry.registerPath(createWebinarRegistry)
registry.registerPath(findWebinarsRegistry)
registry.registerPath(findWebinarByIdRegistry)
registry.registerPath(updateWebinarRegistry)
registry.registerPath(deleteWebinarRegistry)

registry.registerPath(createCourseRegistry)
registry.registerPath(findCoursesRegistry)
registry.registerPath(findCourseByIdRegistry)
registry.registerPath(updateCourseRegistry)
registry.registerPath(deleteCourseRegistry)

registry.registerPath(createPostGraduateProgramRegistry)
registry.registerPath(findPostGraduateProgramsRegistry)
registry.registerPath(findPostGraduateProgramByIdRegistry)
registry.registerPath(updatePostGraduateProgramRegistry)
registry.registerPath(deletePostGraduateProgramRegistry)

registry.registerPath(createEventRegistry)
registry.registerPath(findEventsRegistry)
registry.registerPath(findEventByIdRegistry)
registry.registerPath(updateEventRegistry)
registry.registerPath(deleteEventRegistry)

registry.registerPath(createScientificJournalRegistry)
registry.registerPath(findScientificJournalsRegistry)
registry.registerPath(findScientificJournalByIdRegistry)
registry.registerPath(updateScientificJournalRegistry)
registry.registerPath(deleteScientificJournalRegistry)

registry.registerPath(createScientificArticleRegistry)
registry.registerPath(findScientificArticlesRegistry)
registry.registerPath(findScientificArticleByIdRegistry)
registry.registerPath(updateScientificArticleRegistry)
registry.registerPath(deleteScientificArticleRegistry)

registry.registerPath(createBookVolumeRegistry)
registry.registerPath(findBookVolumesRegistry)
registry.registerPath(findBookVolumeByIdRegistry)
registry.registerPath(updateBookVolumeRegistry)
registry.registerPath(deleteBookVolumeRegistry)

registry.registerPath(createLawRegistry)
registry.registerPath(findLawsRegistry)
registry.registerPath(findLawByIdRegistry)
registry.registerPath(updateLawRegistry)
registry.registerPath(deleteLawRegistry)

registry.registerPath(createWorkGroupTeamMemberRegistry)
registry.registerPath(findWorkGroupTeamMembersRegistry)
registry.registerPath(findWorkGroupTeamMemberByIdRegistry)
registry.registerPath(updateWorkGroupTeamMemberRegistry)
registry.registerPath(deleteWorkGroupTeamMemberRegistry)

registry.registerPath(createReferenceCenterTeamMemberRegistry)
registry.registerPath(findReferenceCenterTeamMembersRegistry)
registry.registerPath(findReferenceCenterTeamMemberByIdRegistry)
registry.registerPath(updateReferenceCenterTeamMemberRegistry)
registry.registerPath(deleteReferenceCenterTeamMemberRegistry)

registry.registerPath(createResearchGroupRegistry)
registry.registerPath(findResearchGroupsRegistry)
registry.registerPath(findResearchGroupByIdRegistry)
registry.registerPath(updateResearchGroupRegistry)
registry.registerPath(deleteResearchGroupRegistry)

const generator = new OpenApiGeneratorV3(registry.definitions)

export const swaggerDocument = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'API da Rede CT',
    version: '1.0.0',
    description: 'API com validação Zod',
  },
})
