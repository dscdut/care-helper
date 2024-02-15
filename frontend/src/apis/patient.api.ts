import queryString from 'query-string'
import { ExaminationType } from 'src/types/examination.type'
import { PatientOfDoctor } from 'src/types/users.type'
import { PagingFilter, PagingResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_PATIENTS = 'patients'

const patientApi = {
  getPatients: (patientFilter: { keyword: string }) => {
    const patientsFilterParams = queryString.stringify(patientFilter)
    return http.get<PagingResponse<PatientOfDoctor[]>>(`${URL_PATIENTS}?${patientsFilterParams}`)
  },
  getPatientById: (id: number) => {
    return http.get<PatientOfDoctor>(`${URL_PATIENTS}/${id}`)
  },
  getExaminationsOfPatient: (examinationFilter: PagingFilter, patientId: number) => {
    const examinationFilterParams = queryString.stringify(examinationFilter)
    return http.get<PagingResponse<ExaminationType[]>>(
      `${URL_PATIENTS}/${patientId}/examinations?${examinationFilterParams}`
    )
  }
}
export default patientApi
