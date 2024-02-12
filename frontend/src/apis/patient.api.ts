import { PatientOfDoctor } from 'src/types/users.type'
import http from 'src/utils/http'

const URL_PATIENTS = 'patients'
const URL_MY_PATIENTS = 'patients/my-patients'

const patientApi = {
  getMyPatients: () => {
    return http.get<PatientOfDoctor[]>(URL_MY_PATIENTS)
  },
  getPatientById: (id: number) => {
    return http.get<PatientOfDoctor>(`${URL_PATIENTS}/${id}`)
  }
}
export default patientApi
