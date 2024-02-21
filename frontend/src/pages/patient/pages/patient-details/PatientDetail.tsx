import { Fragment, useMemo, useState } from 'react'
import classNames from 'classnames'
import { PatientInformation } from 'src/pages/patient/components'
import { Link, Outlet, useParams } from 'react-router-dom'
import { useQueries } from 'react-query'
import patientApi from 'src/apis/patient.api'
import { PatientOfDoctor } from 'src/types/users.type'
import Loading from 'src/components/loading/Loading'
import { AxiosResponse } from 'axios'
import medicalHistoryApi from 'src/apis/medicalHistories.api'
import { MedicalHistory } from 'src/types/medicalHistorys.type'
import { HiOutlineArrowLeftCircle } from 'react-icons/hi2'
import { path } from 'src/constants/path'
import Button from 'src/components/button/Button'

export interface PatientDetailsProps {}

enum ETabType {
  ExaminationHistory = 'EXAMINATION',
  Administrative_MedicalHistory = 'ADMIN_HISTORY'
}

enum ETabName {
  ExaminationHistory = 'Examination History',
  Administrative_MedicalHistory = 'Administrative & Medical History'
}

export default function PatientDetails(props: PatientDetailsProps) {
  const { patientId, examinationId } = useParams() as { patientId: string; examinationId?: string }
  const data = useQueries([
    {
      queryKey: ['patientById', Number(patientId)],
      queryFn: () => patientApi.getPatientById(Number(patientId))
    },
    {
      queryKey: ['medicalHistoryPatientById', Number(patientId)],
      queryFn: () => medicalHistoryApi.getMedicalHistoryOfPatient(Number(patientId))
    }
  ])
  const [patientByIdData, medicalHistoryPatientByIdData] = data.map((childData) => childData.data)
  const allSuccess = data.every((childData) => childData.isSuccess === true)
  const [tabIndex, setTabIndex] = useState<ETabType>(ETabType.Administrative_MedicalHistory)
  const handleChangeTab = (tabIndex: ETabType) => {
    setTabIndex(tabIndex)
  }
  const tabs: { [p in ETabType]: { title: string; content: React.ReactNode } } = useMemo(() => {
    return {
      [ETabType.ExaminationHistory]: {
        title: ETabName.ExaminationHistory,
        content: <Outlet context={(patientByIdData as AxiosResponse<PatientOfDoctor>)?.data.fullName} />
      },
      [ETabType.Administrative_MedicalHistory]: {
        title: ETabName.Administrative_MedicalHistory,
        content: (
          <PatientInformation
            patientOfDoctor={(patientByIdData as AxiosResponse<PatientOfDoctor>)?.data}
            medicalHistory={(medicalHistoryPatientByIdData as AxiosResponse<MedicalHistory>)?.data}
          />
        )
      }
    }
  }, [patientByIdData, medicalHistoryPatientByIdData])
  if (!allSuccess) {
    return <Loading />
  }
  return (
    <article className='flex w-full flex-col gap-8 p-4 lg:p-8'>
      <article className='flex items-center gap-2'>
        <Link to={examinationId ? `${path.patients}/${patientId}` : path.patients}>
          <Button Icon={HiOutlineArrowLeftCircle} iconClass='w-9 h-9' className='btn-circle mt-1' />
        </Link>
        <h1 className='text-2xl'>
          Patient{' '}
          <span className='font-bold'>{(patientByIdData as AxiosResponse<PatientOfDoctor>)?.data.fullName}</span>
        </h1>
      </article>
      <div role='tablist' className='tabs tabs-bordered grid-cols-2 2xl:grid-cols-4'>
        <Fragment>
          <input
            type='radio'
            name='my_tabs_1'
            role='tab'
            className={classNames(
              'tab mr-8 h-full !rounded-md !border-none text-sm font-semibold lg:text-nowrap lg:text-base',
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
              'tab mr-8 h-full !rounded-md !border-none text-sm font-semibold lg:text-nowrap lg:text-base',
              {
                'bg-primary text-white': tabIndex === ETabType.Administrative_MedicalHistory
              }
            )}
            aria-label={tabs.ADMIN_HISTORY.title}
            checked={tabIndex === ETabType.Administrative_MedicalHistory}
            onChange={() => handleChangeTab(ETabType.Administrative_MedicalHistory)}
          />
          <div role='tabpanel' className='tab-content mt-10'>
            {tabs.ADMIN_HISTORY.content}
          </div>
        </Fragment>
      </div>
    </article>
  )
}
