import { CreateMeetingController } from '../../controllers/meeting/create-meeting-controller.ts'
import { makeMeetingRepository } from '../repositories/meeting.factory.ts'

export function makeCreateMeetingController() {
  return {
    createMeetingController: new CreateMeetingController(
      makeMeetingRepository()
    ),
  }
}
