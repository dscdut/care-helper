import queryString from 'query-string'
import { Meeting, MeetingReqBody, MeetingReqBodyUpdate } from 'src/types/meetings.type'
import { PaginationParams, PagingResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_MEETINGS = 'meetings'

const meetingsApi = {
  getMeetings: (meetingFilter?: PaginationParams) => {
    const meetingFilterParams = queryString.stringify(meetingFilter || {})
    return http.get<PagingResponse<Meeting[]>>(`${URL_MEETINGS}?${meetingFilterParams}`)
  },
  createMeeting: (meetingBody: MeetingReqBody) => {
    return http.post<Omit<Meeting, 'doctor' | 'patient'> & { doctor: number; patient: number }>(
      URL_MEETINGS,
      meetingBody
    )
  },
  updateMeeting: (meetingBody: MeetingReqBodyUpdate) => {
    return http.put<{ message: string }>(URL_MEETINGS, meetingBody)
  },
  deleteMeeting: (meetingId: number) => {
    return http.delete<{ message: string }>(`${URL_MEETINGS}/${meetingId}`)
  }
}

export default meetingsApi
