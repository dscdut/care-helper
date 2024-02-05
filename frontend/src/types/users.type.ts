export type User = {
  id: number
  fullName: string
  gender: string | null
  email: string
  password: string
  phone: string
  birthday: string | null
  avatar: string | null
  address: string | null
  role: string
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
