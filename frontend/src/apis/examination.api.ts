import http from 'src/utils/http'
import queryString from 'query-string'
import { PaginationParams, PagingResponse } from 'src/types/utils.type'
import { ExaminationReqBody, ExaminationType, ExaminationUpdateReqBody } from 'src/types/examination.type'

const URL_MY_EXAMINATION = 'examinations/my-examinations'
const URL_EXAMINATIONS = 'examinations'

const examinationApi = {
  getExaminations: (examinationFilter: PaginationParams) => {
    const examinationFilterParams = queryString.stringify(examinationFilter)
    return http.get<PagingResponse<ExaminationType[]>>(`${URL_MY_EXAMINATION}?${examinationFilterParams}`)
  },
  getExaminationById: (idMedicalRecord: number) => {
    return http.get<ExaminationType>(`${URL_EXAMINATIONS}/${idMedicalRecord}`)
  },
  postExamination: (examinationBody: ExaminationReqBody) => {
    return http.post<ExaminationType>(`${URL_EXAMINATIONS}`, examinationBody)
  },
  putExamination: (examinationUpdateBody: ExaminationUpdateReqBody) => {
    return http.put<{ message: string }>(`${URL_EXAMINATIONS}`, examinationUpdateBody)
  }
}

export default examinationApi
