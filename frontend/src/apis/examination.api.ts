import http from 'src/utils/http'
import queryString from 'query-string'
import { PagingFilter, PagingResponse } from 'src/types/utils.type'
import { ExaminationType } from 'src/types/examination.type'

const URL_EXAMINATION = 'examinations/my-examinations'
const URL_EXAMINATION_BY_ID = 'examinations'

const examinationApi = {
  getExaminations: (examinationFilter: PagingFilter) => {
    const examinationFilterParams = queryString.stringify(examinationFilter)
    return http.get<PagingResponse<ExaminationType[]>>(`${URL_EXAMINATION}?${examinationFilterParams}`)
  },
  getExaminationById: (idMedicalRecord: number) => {
    return http.get<ExaminationType>(`${URL_EXAMINATION_BY_ID}/${idMedicalRecord}`)
  }
}

export default examinationApi
