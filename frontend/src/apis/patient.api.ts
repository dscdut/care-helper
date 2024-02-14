import queryString from 'query-string'
import { ExaminationType } from 'src/types/examination.type'
import { PatientOfDoctor } from 'src/types/users.type'
import { PagingFilter, PagingResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_PATIENTS = 'patients'
const URL_MY_PATIENTS = 'patients/my-patients'

const patientApi = {
  getMyPatients: () => {
    return http.get<PatientOfDoctor[]>(URL_MY_PATIENTS)
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
