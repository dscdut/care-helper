import { SurveyData, SurveyPost } from 'src/types/survey.type'
import { PagingResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_SURVEY = 'surveys'
const URL_DOCTOR_SURVEYS = 'doctors/my-surveys'

const surveyApi = {
  getDoctorSurveys: () => {
    return http.get<PagingResponse<SurveyData[]>>(URL_DOCTOR_SURVEYS)
  },
  getSurveyDetail: (id: number) => {
    return http.get<PagingResponse<SurveyData[]>>(`${URL_SURVEY}/${id}`)
  },
  postSurvey: (surveyData: SurveyPost) => {
    return http.post<PagingResponse<SurveyData[]>>(URL_SURVEY, surveyData)
  }
}

export default surveyApi
