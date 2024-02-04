export type PatientType = {
  id: number
  name: string
  date: string
  phone: string
  doctor: string
  diagnose: string
}

export type PatientRecord = Omit<PatientType, 'name'> & {
  hospital: string
}

export const patients: PatientType[] = Array(20)
  .fill(0)
  .map((_, index) => ({
    id: index,
    name: 'Bitcoin ' + index,
    date: '17/01/2010',
    phone: '75675643',
    doctor: 'Bitcoin Doctor',
    diagnose: 'Huyet ap'
  }))

export const patientRecords: PatientRecord[] = Array(20)
  .fill(0)
  .map((_, index) => ({
    id: index,
    hospital: 'Bitcoin ' + index,
    date: '17/01/2010',
    phone: '75675643',
    doctor: 'Bitcoin Doctor',
    diagnose: 'Huyet ap'
  }))
