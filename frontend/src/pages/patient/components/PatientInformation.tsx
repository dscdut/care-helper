import NoDataDisplay from 'src/components/no-data-display/NoDataDisplay'
import { INSURANCE_AREA_NUMBER } from 'src/constants/common'
import { COMMON_MESSAGE } from 'src/constants/messages'
import { MedicalHistory } from 'src/types/medicalHistorys.type'
import { PatientOfDoctor } from 'src/types/users.type'
import { formatDate } from 'src/utils/utils'
import { twMerge } from 'tailwind-merge'
export interface PatientInformationProps {
  patientOfDoctor?: PatientOfDoctor
  medicalHistory: MedicalHistory
}
export default function PatientInformation({ patientOfDoctor, medicalHistory }: PatientInformationProps) {
  if (!patientOfDoctor) {
    return <NoDataDisplay title='No Data' description='Please update Administrative and Medical History' />
  }
  return (
    <div className='flex flex-col'>
      <div className='flex gap-8 rounded-lg bg-white p-4 shadow-lg'>
        <div className='flex flex-1 flex-col gap-2 lg:flex-row lg:items-center'>
          <ul className='flex h-full flex-col justify-between gap-2 lg:w-1/2'>
            <InformationField title='Full Name' value={patientOfDoctor?.fullName} />
            <InformationField title='Birthday' value={formatDate(patientOfDoctor?.birthday as string, 'DD/MM/YYYY')} />
            <InformationField title='Gender' value={patientOfDoctor?.gender} />
            <InformationField title='National Id Card' value={patientOfDoctor?.nationalIdCard} />
          </ul>
          <ul className='flex h-full flex-col gap-2 lg:w-1/2'>
            <InformationField
              title='Address'
              value={patientOfDoctor?.address}
              titleClass='lg:w-1/3'
              valueClass='lg:w-2/3'
            />
            <InformationField
              title='Job'
              value={patientOfDoctor?.profesion}
              titleClass='lg:w-1/3'
              valueClass='lg:w-2/3'
            />
          </ul>
        </div>
      </div>
      <div className='mt-4 flex w-full flex-col gap-5 lg:flex-row'>
        <div className='card flex-1 bg-white shadow-lg'>
          <div className='card-body gap-6'>
            <h2 className='card-title font-bold'>Medical History</h2>
            <p className='whitespace-pre-line pl-2 leading-8'>
              {medicalHistory?.history || COMMON_MESSAGE.NOT_UPDATE_YET}
            </p>
          </div>
        </div>
        <div className='flex flex-col gap-5'>
          <div className='card w-full min-w-max rounded-lg bg-slate-300 text-black shadow-lg lg:w-96'>
            <div className='card-body py-5'>
              <h2 className='card-title'>Health Insurance</h2>
              {INSURANCE_AREA_NUMBER ? (
                <div className='stats stats-horizontal text-center shadow'>
                  {Array(INSURANCE_AREA_NUMBER)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className='stat p-3'>
                        <div className='stat-title text-black'>
                          {index === INSURANCE_AREA_NUMBER - 1
                            ? patientOfDoctor?.insurance.substring(index * 2)
                            : patientOfDoctor?.insurance.substring(index * 2, index * 2 + 2)}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p>{COMMON_MESSAGE.NOT_UPDATE_YET}</p>
              )}
            </div>
          </div>
          <div className='card w-full min-w-max rounded-lg bg-slate-300 text-black shadow-lg lg:w-96'>
            <div className='card-body py-5'>
              <h2 className='card-title'>Health Overview</h2>
              <p>
                Height: <span className='font-bold'>{patientOfDoctor.height || COMMON_MESSAGE.NOT_UPDATE_YET}</span>
              </p>
              <p>
                Weight: <span className='font-bold'>{patientOfDoctor.weight || COMMON_MESSAGE.NOT_UPDATE_YET}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface InformationFieldProps {
  title: string
  value: string
  titleClass?: string
  valueClass?: string
}

function InformationField({ title, value, titleClass, valueClass }: InformationFieldProps) {
  return (
    <li className='flex gap-2'>
      <h3 className={twMerge('lg:w-1/2', titleClass)}>{title}</h3>
      <h3 className={twMerge('font-bold lg:w-1/2', valueClass)}>{value || COMMON_MESSAGE.NOT_UPDATE_YET}</h3>
    </li>
  )
}
