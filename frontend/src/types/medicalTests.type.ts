export enum TestType {
  MAIN = 'main',
  UROGENITAL = 'urogenital',
  BLOOD = 'blood',
  BLOOD_FAT = 'blood fat'
}

export type TestRowType = {
  name: string
  type: TestType
  unit: string
  value: string
}

export type MedialTestType = {
  id: number
  testRows: TestRowType[]
  examinationId: number
  createdAt: string
}

export type MedicalTestReqBody = { testRows: string; examinationId: number }
