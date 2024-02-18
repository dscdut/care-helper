export type Meeting = {
  id: number
  startTime: string
  endTime: string
  place: string
  note: string
  createdAt: string
  title: string
  doctor: {
    id: number
    fullname: string
    phone: string
  }
  patient: {
    id: number
    fullname: string
    phone: string
  }
}

export type MeetingReqBody = Pick<Meeting, 'startTime' | 'endTime' | 'place' | 'note' | 'title'> & {
  patientId: number
}
export type MeetingReqBodyUpdate = Omit<MeetingReqBody, 'patientId'> & {
  id: number
}
