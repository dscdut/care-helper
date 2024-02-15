import { MedicalHistory } from 'src/types/medicalHistorys.type'
import http from 'src/utils/http'

const MEDICAL_HISTORY = 'medical-histories'
const MEDICAL_HISTORY_PATIENTS = 'medical-histories/patients'

const medicalHistoryApi = {
  getMedicalHistoryOfPatient: (patientId: number) => {
    return http.get<MedicalHistory>(`${MEDICAL_HISTORY_PATIENTS}/${patientId}`)
  }
}

export default medicalHistoryApi
