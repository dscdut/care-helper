import http from 'src/utils/http'
import { MedialTestType } from 'src/types/medicalTests.type'

const URL_MEDICALTEST_EXAMINATION_ID = 'medical-tests/examination'

const medicalTestsApi = {
  getMedicalTestExaminationById: (medicalTestId: number) => {
    return http.get<MedialTestType[]>(`${URL_MEDICALTEST_EXAMINATION_ID}/${medicalTestId}`)
  }
}

export default medicalTestsApi
