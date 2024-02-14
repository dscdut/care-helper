export type Survey = {
  id: number
  status: SurveyStatus
  date: string
  diagnose: string
}

export enum SurveyStatus {
  WAITING = 'Waiting',
  FINISHED = 'Finished'
}

export type AnswersSurvey = {
  id: number
  question: string
  answer: string
}
