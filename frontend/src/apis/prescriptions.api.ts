import http from 'src/utils/http'
import { PrescriptionReqBody, PrescriptionType } from 'src/types/prescriptions.type'

const URL_PRESCRIPTION = 'prescriptions'
const URL_PRESCRIPTION_EXAMINATION = 'prescriptions/examination'

const prescriptionsApi = {
  getPrescriptionExaminationId: (prescriptionId: number) => {
    return http.get<PrescriptionType[]>(`${URL_PRESCRIPTION_EXAMINATION}/${prescriptionId}`)
  },
  createPrescription: (prescription: PrescriptionReqBody) => {
    return http.post<{ message: string }>(URL_PRESCRIPTION, prescription)
  }
}

export default prescriptionsApi
