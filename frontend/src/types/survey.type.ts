interface Person {
  id: number
  fullName: string
}

export type SurveyAPI = {
  data: SurveyData[]
  totalPages: number
  totalElements: number
}

export type SurveyData = {
  id: number
  form: string
  status: SurveyStatus
  patient: Person
  doctor: Person
  createdAt: string
  updatedAt: string
}

export type SurveyPost = {
  form: string
  patientId: number
}

export enum SurveyStatus {
  WAITING = 'Waiting',
  FINISHED = 'Finished'
}

export type AnswersSurvey = {
  id: number
  question: string
  answer: string | null
}

export type QuestionsSurvey = {
  id: number
  question: string
}
