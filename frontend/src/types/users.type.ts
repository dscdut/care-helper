export type User = {
  id: number
  email: string
  fullName: string | null
  phone: string | null
  quotaCode: string | null
  expertise: string | null
  experience: string | null
  workUnit: string | null
  certificateName: string | null
  certificateNumber: string | null
  certificateProvider: string | null
  active: boolean
}

export type PatientType = {
  id: number
  name: string
  date: string
  phone: string
  doctor: string
  diagnose: string
}

export type PatientRecord = Pick<PatientType, 'date' | 'doctor' | 'id'>

export type TitleValuePair = {
  title: string
  value: string
}

export type PatientAdministrative = {
  information: {
    left: TitleValuePair[]
    right: TitleValuePair[]
  }
  reasonForHospitalization: string
  healthInsurance: {
    data: string[]
    object: string
  }
  healthOverview: TitleValuePair[]
}

export type PatientOfDoctor = {
  id: number
  fullName: string
  gender: string
  email: string
  phone: string
  birthday: string
  avatar: string
  address: string
  nationalIdCard: string
  insurance: string
  profesion: string
  active: boolean
  weight: number
  height: number
}
