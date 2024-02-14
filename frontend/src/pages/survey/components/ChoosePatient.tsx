import { useState } from 'react'
import { patients } from 'src/data/patient'

interface ChoosePatientProps {
  onNext: () => void
}

export default function ChoosePatient({ onNext }: ChoosePatientProps) {
  const [search, setSearch] = useState('')

  const handlePatientClick = (patientName: string) => {
    setSearch(patientName)
  }

  const handleNext = () => {
    onNext()
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
        />
      </div>
      <div className='mt-4 max-h-80 overflow-y-scroll'>
        <ul className='menu mt-4 w-[inherit] rounded-box bg-base-200'>
          {patients.map((patient) => (
            <li key={patient.id}>
              <button onClick={() => handlePatientClick(patient.name)}>{patient.name}</button>
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
