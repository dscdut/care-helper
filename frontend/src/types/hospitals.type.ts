export type Hospital = {
  id: number
  name: string
  address: string
}

export type HospitalListName = Omit<Hospital, 'address'>
