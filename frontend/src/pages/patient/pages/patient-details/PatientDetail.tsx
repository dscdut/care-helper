import { Fragment, useState } from 'react'
import classNames from 'classnames'
import { PatientListRecords, PatientInformation } from 'src/pages/patient/components'

export interface PatientDetailsProps {}

enum ETabType {
  ExaminationHistory = 'EXAMINATION',
  Administrative = 'ADMIN',
  MedicalHistory = 'HISTORY'
}

const tabs: { [p in ETabType]: { title: string; content: React.ReactNode } } = {
  [ETabType.ExaminationHistory]: { title: 'Lịch sử lần khám', content: <PatientListRecords /> },
  [ETabType.Administrative]: { title: 'Hành chính', content: <PatientInformation /> },
  [ETabType.MedicalHistory]: { title: 'Bệnh sử', content: <div>Bệnh Sử</div> }
}

export default function PatientDetails(props: PatientDetailsProps) {
  const [tabIndex, setTabIndex] = useState<ETabType>(ETabType.Administrative)
  const handleChangeTab = (tabIndex: ETabType) => {
    setTabIndex(tabIndex)
  }
  return (
    <article className='flex w-full flex-col gap-8 p-4 lg:p-8'>
      <article>
        <h1 className='text-2xl'>
          Bệnh nhân <span className='font-bold'>Nguyễn Văn A</span>
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
