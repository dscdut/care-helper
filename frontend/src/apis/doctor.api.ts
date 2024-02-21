import queryString from 'query-string'
import { PatientOfDoctor } from 'src/types/users.type'
import { PaginationParams, PagingResponse, SearchParams } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_DOCTORS_MY_PATIENT = 'doctors/my-patients'

const doctorApi = {
  getMyPatients: (examinationFilter: PaginationParams & SearchParams) => {
    const patientsFilterParams = queryString.stringify(examinationFilter)
    return http.get<PagingResponse<PatientOfDoctor[]>>(`${URL_DOCTORS_MY_PATIENT}?${patientsFilterParams}`)
  }
}

export default doctorApi
