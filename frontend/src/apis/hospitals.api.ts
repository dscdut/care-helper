import { HospitalListName } from 'src/types/hospitals.type'
import http from 'src/utils/http'

const URL_HOSPITALS_LIST_NAME = 'hospitals/list-name'

const hospitalsApi = {
  getHospitalsListName: () => http.get<HospitalListName[]>(URL_HOSPITALS_LIST_NAME)
}

export default hospitalsApi
