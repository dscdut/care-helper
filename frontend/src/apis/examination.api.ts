import http from 'src/utils/http'
import queryString from 'query-string'
import { PagingFilter, PagingResponse } from 'src/types/utils.type'
import { ExaminationType } from 'src/types/examination.type'

const URL_MY_EXAMINATION = 'examinations/my-examinations'
const URL_EXAMINATIONS = 'examinations'

const examinationApi = {
  getExaminations: (examinationFilter: PagingFilter) => {
    const examinationFilterParams = queryString.stringify(examinationFilter)
    return http.get<PagingResponse<ExaminationType[]>>(`${URL_MY_EXAMINATION}?${examinationFilterParams}`)
  },
  getExaminationById: (idMedicalRecord: number) => {
    return http.get<ExaminationType>(`${URL_EXAMINATIONS}/${idMedicalRecord}`)
  }
}

export default examinationApi
