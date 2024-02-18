export type ExaminationType = {
  id: number
  diagnose: string
  detailDiagnose: string
  advice: string
  createdAt: string
  doctor: {
    id: number
    fullname: string
    phone: string
  }
  patient: {
    id: number
    fullname: string
    phone: string
  }
  hospital: {
    id: number
    name: string
    address: string
  }
}

export type ExaminationReqBody = { patientId: number; hospitalId: number }

export type ExaminationUpdateReqBody = Pick<ExaminationType, 'id' | 'advice' | 'diagnose' | 'detailDiagnose'> & {
  hospitalId: number
}
