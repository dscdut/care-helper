import queryString from 'query-string'
import { PatientOfDoctor } from 'src/types/users.type'
import { PagingFilter, PagingResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_DOCTORS = 'doctors'
const URL_DOCTORS_MY_PATIENT = 'doctors//my-patients'

const doctorApi = {
  getMyPatients: (examinationFilter: PagingFilter) => {
    const patientsFilterParams = queryString.stringify(examinationFilter)
    return http.get<PagingResponse<PatientOfDoctor[]>>(`${URL_DOCTORS_MY_PATIENT}?${patientsFilterParams}`)
  }
}

export default doctorApi
