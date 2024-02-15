interface Person {
  id: number
  fullName: string
}

export type Survey = {
  id: number
  form: string
  status: SurveyStatus
  patient: Person
  doctor: Person
  createdAt: string
  updatedAt: string
}

export enum SurveyStatus {
  WAITING = 'Waiting',
  FINISHED = 'Finished'
}

export type AnswersSurvey = {
  question: string
  answer: string
}
