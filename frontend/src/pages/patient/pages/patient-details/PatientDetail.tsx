import { Fragment, useMemo, useState } from 'react'
import classNames from 'classnames'
import { PatientInformation } from 'src/pages/patient/components'
import { Outlet, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import patientApi from 'src/apis/patient.api'
import { PatientOfDoctor } from 'src/types/users.type'
import Loading from 'src/components/loading/Loading'

export interface PatientDetailsProps {}

enum ETabType {
  ExaminationHistory = 'EXAMINATION',
  Administrative = 'ADMIN',
  MedicalHistory = 'HISTORY'
}

enum ETabName {
  ExaminationHistory = 'Examination History',
  Administrative = 'Administrative',
  MedicalHistory = 'Medical History'
}

export default function PatientDetails(props: PatientDetailsProps) {
  const { patientId } = useParams() as { patientId: string }
  const { data, isLoading } = useQuery({
    queryKey: ['patientById', patientId],
    queryFn: () => patientApi.getPatientById(Number(patientId))
  })
  const patientByIdData = data?.data
  const [tabIndex, setTabIndex] = useState<ETabType>(ETabType.Administrative)
  const handleChangeTab = (tabIndex: ETabType) => {
    setTabIndex(tabIndex)
  }
  const tabs: { [p in ETabType]: { title: string; content: React.ReactNode } } = useMemo(() => {
    return {
      [ETabType.ExaminationHistory]: {
        title: ETabName.ExaminationHistory,
        content: <Outlet context={patientByIdData?.fullName} />
      },
      [ETabType.Administrative]: {
        title: ETabName.Administrative,
        content: <PatientInformation patientByIdData={patientByIdData as PatientOfDoctor} />
      },
      [ETabType.MedicalHistory]: { title: ETabName.MedicalHistory, content: <div>{ETabName.MedicalHistory}</div> }
    }
  }, [patientByIdData])
  if (isLoading) {
    return <Loading />
  }
  return (
    <article className='flex w-full flex-col gap-8 p-4 lg:p-8'>
      <article>
        <h1 className='text-2xl'>
          Patient <span className='font-bold'>{patientByIdData?.fullName}</span>
        </h1>
      </article>
      <div role='tablist' className='tabs tabs-bordered grid-cols-3 lg:grid-cols-4'>
        <Fragment>
          <input
            type='radio'
            name='my_tabs_1'
            role='tab'
            className={classNames(
              'tab mr-8 !rounded-md !border-none text-sm font-semibold after:text-nowrap xl:text-base',
              {
                'bg-primary text-white': tabIndex === ETabType.ExaminationHistory
              }
            )}
            aria-label={tabs.EXAMINATION.title}
            checked={tabIndex === ETabType.ExaminationHistory}
            onChange={() => handleChangeTab(ETabType.ExaminationHistory)}
          />
          <div role='tabpanel' className='tab-content mt-10'>
            {tabs.EXAMINATION.content}
          </div>
        </Fragment>
        <Fragment>
          <input
            type='radio'
            name='my_tabs_1'
            role='tab'
            className={classNames(
              'tab mr-8 !rounded-md !border-none text-sm font-semibold after:text-nowrap xl:text-base',
              {
                'bg-primary text-white': tabIndex === ETabType.Administrative
              }
            )}
            aria-label={tabs.ADMIN.title}
            checked={tabIndex === ETabType.Administrative}
            onChange={() => handleChangeTab(ETabType.Administrative)}
          />
          <div role='tabpanel' className='tab-content mt-10'>
            {tabs.ADMIN.content}
          </div>
        </Fragment>
        <Fragment>
          <input
            type='radio'
            name='my_tabs_1'
            role='tab'
            className={classNames(
              'tab mr-8 !rounded-md !border-none text-sm font-semibold after:text-nowrap xl:text-base',
              {
                'bg-primary text-white': tabIndex === ETabType.MedicalHistory
              }
            )}
            aria-label={tabs.HISTORY.title}
            checked={tabIndex === ETabType.MedicalHistory}
            onChange={() => handleChangeTab(ETabType.MedicalHistory)}
          />
          <div role='tabpanel' className='tab-content mt-10'>
            {tabs.HISTORY.content}
          </div>
        </Fragment>
      </div>
    </article>
  )
}
