import { QuestionsSurvey } from 'src/types/survey.type'
import { PatientName } from 'src/types/users.type'

export const questionsSurvey: QuestionsSurvey[] = [
  {
    id: 1,
    question: 'Huyết áp của bạn hôm nay là bao nhiêu?'
  },
  {
    id: 2,
    question: 'Bạn đang sử dụng những loại thuốc nào?'
  },
  {
    id: 3,
    question: 'Tình trạng chung của sức khoẻ bạn như thế nào?'
  },
  {
    id: 4,
    question: 'Cảm giác và tâm trạng của bạn như thế nào?'
  },
  {
    id: 5,
    question: 'Bạn có thể mô tả cụ thể hơn hay không?'
  }
]

export const patientsName: PatientName[] = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Alice' },
  { id: 3, name: 'Bob' }
]
