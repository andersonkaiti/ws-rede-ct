export interface ICreateInternationalScientificCongressDTO {
  title: string
  edition: number
  startDate: Date
  endDate: Date
  description?: string
  location?: string
  congressLink?: string
  noticeUrl?: string
  scheduleUrl?: string
  programUrl?: string
  adminReportUrl?: string
  proceedingsUrl?: string
}
