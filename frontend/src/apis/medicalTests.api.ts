import http from 'src/utils/http'
import { MedialTestType } from 'src/types/medicalTests.type'

const URL_MEDICALTEST_EXAMINATION = 'medical-tests/examination'

const medicalTestsApi = {
  getMedicalTestExaminationById: (medicalTestId: number) => {
    return http.get<MedialTestType[]>(`${URL_MEDICALTEST_EXAMINATION}/${medicalTestId}`)
  }
}

export default medicalTestsApi
