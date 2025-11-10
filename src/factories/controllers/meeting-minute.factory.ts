import { CreateMeetingMinuteController } from '../../controllers/meeting-minute/create-meeting-minute-controller.ts'
import { FindMeetingMinuteByMeetingIdController } from '../../controllers/meeting-minute/find-meeting-minute-by-meeting-id-controller.ts'
import { makeMeetingRepository } from '../repositories/meeting.factory.ts'
import { makeMeetingMinuteRepository } from '../repositories/meeting-minute.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateMeetingMinuteController() {
  return {
    createMeetingMinuteController: new CreateMeetingMinuteController(
      makeMeetingMinuteRepository(),
      makeMeetingRepository(),
      makeFirebaseStorageService()
    ),
  }
}

export function makeFindMeetingMinuteByMeetingIdController() {
  return {
    findMeetingMinuteByMeetingIdController:
      new FindMeetingMinuteByMeetingIdController(makeMeetingMinuteRepository()),
  }
}
