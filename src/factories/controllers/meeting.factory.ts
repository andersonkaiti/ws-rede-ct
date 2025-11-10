import { CreateMeetingController } from '../../controllers/meeting/create-meeting-controller.ts'
import { FindMeetingsController } from '../../controllers/meeting/find-meetings-controller.ts'
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
