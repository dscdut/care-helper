import { useState } from 'react'
import { patients } from 'src/data/patient'

interface ChoosePatientProps {
  onNext: () => void
}

export default function ChoosePatient({ onNext }: ChoosePatientProps) {
  const [search, setSearch] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase())
  }

  const handlePatientClick = (patientName: string) => {
    setSearch(patientName.toLowerCase())
  }

  const handleNext = () => {
    onNext()
  }

  return (
    <div>
      <p className='font-semibold'>Nhập tên bệnh nhân</p>
      <div className='mt-4'>
        <input
          type='text'
          onChange={handleInputChange}
          className='input input-bordered !h-11 w-full !rounded-xl border-2 ps-10 hover:border-primary focus:border-primary focus:outline-none'
          placeholder='Tìm khảo sát theo bệnh nhân...'
          value={search}
        />
      </div>
      <div className='mt-4 max-h-80 overflow-y-scroll'>
        <ul className='menu mt-4 w-[inherit] rounded-box bg-base-200'>
          {patients
            .filter((patient) => {
              return search === '' || patient.name.toLowerCase().includes(search)
            })
            .map((patient) => (
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
