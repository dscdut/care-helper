import http from 'src/utils/http'
import { MedialTestType, MedicalTestReqBody } from 'src/types/medicalTests.type'

const URL_MEDICAL_TEST = 'medical-tests'
const URL_MEDICALTEST_EXAMINATION = 'medical-tests/examination'

const medicalTestsApi = {
  getMedicalTestExaminationById: (medicalTestId: number) => {
    return http.get<MedialTestType[]>(`${URL_MEDICALTEST_EXAMINATION}/${medicalTestId}`)
  },
  createMedicalTest: (medicalTestBody: MedicalTestReqBody) => {
    return http.post<MedialTestType>(`${URL_MEDICAL_TEST}`, medicalTestBody)
  }
}

export default medicalTestsApi
