export type PrescriptionType = {
  id: string
  note: string
  details: {
    medicineName: string
    usage: string
    quantity: number
    medicineType: string
    amount: string
  }[]
  startDate: string
  endDate: string
  prescriptionFilename: string
  examinationId: number
}

export type PrescriptionReqBody = Omit<PrescriptionType, 'id'>
