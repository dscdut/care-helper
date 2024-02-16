export enum TestType {
  MAIN = 'main',
  UROGENITAL = 'urogenital',
  BLOOD = 'blood',
  BLOOD_FAT = 'blood fat'
}

export type testRowType = {
  name: string
  type: TestType
  unit: string
  value: number
}

export type MedialTestType = {
  id: number
  testRows: testRowType[]
  examinationId: number
  createdAt: string
}
