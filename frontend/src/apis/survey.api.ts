import { SurveyAPI, SurveyPost } from 'src/types/survey.type'
import http from 'src/utils/http'

const URL_SURVEY = 'surveys'
const URL_DOCTOR_SURVEYS = 'doctors/my-surveys'

const surveyApi = {
  getDoctorSurveys: () => {
    return http.get<SurveyAPI>(URL_DOCTOR_SURVEYS)
  },
  getSurveyDetail: (id: number) => {
    return http.get<SurveyAPI>(`${URL_SURVEY}/${id}`)
  },
  postSurvey: (surveyData: SurveyPost) => {
    return http.post<SurveyAPI>(URL_SURVEY, surveyData)
  }
}

export default surveyApi
