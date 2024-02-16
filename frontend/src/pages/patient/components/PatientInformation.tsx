import { INSURANCE_AREA_NUMBER } from 'src/constants/common'
import { PatientOfDoctor } from 'src/types/users.type'
import { formatDate } from 'src/utils/utils'
export interface PatientInformationProps {
  patientByIdData: PatientOfDoctor
}
export default function PatientInformation({ patientByIdData }: PatientInformationProps) {
  return (
    <div className='flex flex-col'>
      <div className='flex gap-8 rounded-lg bg-white p-4 shadow-lg'>
        <div className='flex flex-1 flex-col gap-2 lg:flex-row lg:items-center'>
          <ul className='flex h-full flex-col justify-between gap-2 lg:w-1/2'>
            <li className='flex gap-2'>
              <h3 className='lg:w-1/2'>Full Name</h3>
              <h3 className='font-bold lg:w-1/2'>{patientByIdData?.fullName}</h3>
            </li>
            <li className='flex gap-2'>
              <h3 className='lg:w-1/2'>Birthday</h3>
              <h3 className='font-bold lg:w-1/2'>{formatDate(patientByIdData?.birthday as string, 'DD/MM/YYYY')}</h3>
            </li>
            <li className='flex gap-2'>
              <h3 className='lg:w-1/2'>Gender</h3>
              <h3 className='font-bold lg:w-1/2'>{patientByIdData?.gender}</h3>
            </li>
            <li className='flex gap-2'>
              <h3 className='lg:w-1/2'>National Id Card</h3>
              <h3 className='font-bold lg:w-1/2'>{patientByIdData?.nationalIdCard}</h3>
            </li>
          </ul>
          <ul className='flex h-full flex-col gap-2 lg:w-1/2'>
            <li className='flex gap-2'>
              <h3 className='lg:w-1/3'>Address</h3>
              <h3 className='font-bold lg:w-2/3'>{patientByIdData?.address}</h3>
            </li>
            <li className='flex gap-2'>
              <h3 className='lg:w-1/3'>Job</h3>
              <h3 className='font-bold lg:w-2/3'>{patientByIdData?.profesion}</h3>
            </li>
          </ul>
        </div>
      </div>
      <div className='mt-4 flex flex-col justify-between gap-5 lg:flex-row'>
        <div className='card w-full min-w-max rounded-lg bg-slate-300 text-black shadow-lg'>
          <div className='card-body py-5'>
            <h2 className='card-title'>Health Insurance</h2>
            <div className='stats stats-vertical text-center shadow lg:stats-horizontal'>
              {Array(INSURANCE_AREA_NUMBER)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className='stat p-3'>
                    <div className='stat-title text-black'>
                      {index === INSURANCE_AREA_NUMBER - 1
                        ? patientByIdData?.insurance.substring(index * 2)
                        : patientByIdData?.insurance.substring(index * 2, index * 2 + 2)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className='card w-full min-w-max rounded-lg bg-slate-300 text-black shadow-lg'>
          <div className='card-body py-5'>
            <h2 className='card-title'>Health Overview</h2>
            <p>
              Height: <span className='font-bold'>{patientByIdData.height}</span>
            </p>
            <p>
              Weight: <span className='font-bold'>{patientByIdData.weight}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
