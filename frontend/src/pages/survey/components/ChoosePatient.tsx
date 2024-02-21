import { useState } from 'react'
import { useQuery } from 'react-query'
import patientApi from 'src/apis/patient.api'
import Loading from 'src/components/loading/Loading'

interface ChoosePatientProps {
  onNext: () => void
  onSelectPatient: (patientId: number) => void
}

export default function ChoosePatient({ onNext, onSelectPatient }: ChoosePatientProps) {
  const [search, setSearch] = useState('')
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null)

  const { data: myPatientsData, isLoading } = useQuery({
    queryKey: ['myPatientsName'],
    queryFn: () => patientApi.getMyPatients()
  })

  const handlePatientClick = (patientId: number, patientName: string) => {
    setSelectedPatientId(patientId)
    onSelectPatient(patientId)
    setSearch(patientName)
  }

  const handleNext = () => {
    onNext()
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <p className='font-semibold'>Search for a patient</p>
      <div className='mt-4'>
        <input
          type='text'
          className='input input-bordered !h-11 w-full !rounded-xl border-2 ps-10 hover:border-primary focus:border-primary focus:outline-none'
          placeholder='Enter patient name...'
          value={search}
          readOnly
        />
      </div>
      <div className='mt-4 max-h-80 overflow-y-scroll'>
        <ul className='menu mt-4 w-[inherit] rounded-box bg-base-200'>
          {myPatientsData?.data.map((patient) => (
            <li key={patient.id}>
              <button onClick={() => handlePatientClick(patient.id, patient.fullName)}>{patient.fullName}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex justify-end'>
        <button className='btn mt-4 bg-primary text-white' onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  )
}
