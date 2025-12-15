import { CreateMeetingMinuteController } from '../../controllers/meeting-minute/create-meeting-minute-controller.ts'
import { DeleteMeetingMinuteByMeetingIdController } from '../../controllers/meeting-minute/delete-meeting-minute-by-meeting-id-controller.ts'
import { FindMeetingMinuteByMeetingIdController } from '../../controllers/meeting-minute/find-meeting-minute-by-meeting-id-controller.ts'
import { UpdateMeetingMinuteByMeetingIdController } from '../../controllers/meeting-minute/update-meeting-minute-by-meeting-id-controller.ts'
import { makeMeetingRepository } from '../repositories/meeting.factory.ts'
import { makeMeetingMinuteRepository } from '../repositories/meeting-minute.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateMeetingMinuteController() {
  return {
    createMeetingMinuteController: new CreateMeetingMinuteController(
      makeMeetingMinuteRepository(),
      makeMeetingRepository(),
      makeFirebaseStorageService(),
    ),
  }
}

export function makeFindMeetingMinuteByMeetingIdController() {
  return {
    findMeetingMinuteByMeetingIdController:
      new FindMeetingMinuteByMeetingIdController(makeMeetingMinuteRepository()),
  }
}

export function makeUpdateMeetingMinuteByMeetingIdController() {
  return {
    updateMeetingMinuteByMeetingIdController:
      new UpdateMeetingMinuteByMeetingIdController(
        makeMeetingMinuteRepository(),
        makeFirebaseStorageService(),
      ),
  }
}

export function makeDeleteMeetingMinuteByMeetingIdController() {
  return {
    deleteMeetingMinuteByMeetingIdController:
      new DeleteMeetingMinuteByMeetingIdController(
        makeMeetingMinuteRepository(),
        makeFirebaseStorageService(),
      ),
  }
}
