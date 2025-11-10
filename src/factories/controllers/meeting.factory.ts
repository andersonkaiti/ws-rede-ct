import { CreateMeetingController } from '../../controllers/meeting/create-meeting-controller.ts'
import { DeleteMeetingController } from '../../controllers/meeting/delete-meeting-controller.ts'
import { FindMeetingByIdController } from '../../controllers/meeting/find-meeting-by-id-controller.ts'
import { FindMeetingByStatusController } from '../../controllers/meeting/find-meeting-by-status-controller.ts'
import { FindMeetingsController } from '../../controllers/meeting/find-meetings-controller.ts'
import { UpdateMeetingController } from '../../controllers/meeting/update-meeting-controller.ts'
import { makeMeetingRepository } from '../repositories/meeting.factory.ts'

export function makeCreateMeetingController() {
  return {
    createMeetingController: new CreateMeetingController(
      makeMeetingRepository()
    ),
  }
}

export function makeFindMeetingsController() {
  return {
    findMeetingsController: new FindMeetingsController(makeMeetingRepository()),
  }
}

export function makeFindMeetingByIdController() {
  return {
    findMeetingByIdController: new FindMeetingByIdController(
      makeMeetingRepository()
    ),
  }
}

export function makeFindMeetingByStatusController() {
  return {
    findMeetingByStatusController: new FindMeetingByStatusController(
      makeMeetingRepository()
    ),
  }
}

export function makeUpdateMeetingController() {
  return {
    updateMeetingController: new UpdateMeetingController(
      makeMeetingRepository()
    ),
  }
}

export function makeDeleteMeetingController() {
  return {
    deleteMeetingController: new DeleteMeetingController(
      makeMeetingRepository()
    ),
  }
}
