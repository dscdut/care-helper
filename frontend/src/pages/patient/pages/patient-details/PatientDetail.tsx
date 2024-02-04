import { Fragment, useState } from 'react'
import classNames from 'classnames'
import { PatientListRecords, PatientInformation } from 'src/pages/patient/components'

export interface PatientDetailsProps {}

const tabs: { id: number; title: string; content?: React.ReactNode }[] = [
  {
    id: 1,
    title: 'Hồ Sơ Bệnh Án',
    content: <PatientListRecords />
  },
  {
    id: 2,
    title: 'Hành Chính',
    content: <PatientInformation />
  },
  {
    id: 3,
    title: 'Bệnh Sử',
    content: <div>Bệnh Sử</div>
  }
]

export default function PatientDetails(props: PatientDetailsProps) {
  const [tab, setTab] = useState<number>(2)
  const handleChange = (tab: number) => {
    setTab(tab)
  }
  return (
    <article className='flex w-full flex-col gap-8 p-4 lg:p-8'>
      <article>
        <h1 className='text-2xl'>
          Bệnh nhân <span className='font-bold'>Nguyễn Văn A</span>
        </h1>
      </article>
      <div role='tablist' className='tabs tabs-bordered grid-cols-3 lg:grid-cols-4'>
        {tabs.map((tabElement) => (
          <Fragment key={tabElement.id}>
            <input
              type='radio'
              name='my_tabs_1'
              role='tab'
              className={classNames(
                'tab mr-8 !rounded-md !border-none text-sm font-semibold after:text-nowrap xl:text-base',
                {
                  'bg-primary text-white': tabElement.id === tab
                }
              )}
              aria-label={tabElement.title}
              checked={tabElement.id === tab}
              onChange={() => handleChange(tabElement.id)}
            />
            <div role='tabpanel' className='tab-content mt-10'>
              {tabElement.content}
            </div>
          </Fragment>
        ))}
      </div>
    </article>
  )
}
