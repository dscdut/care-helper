import { useState } from 'react'
import PatientInformation from './PatientInformation'
import PatientListRecords from './PatientListRecords'
import classNames from 'classnames'

export interface PatientDetailsProps {}

const tabs: { id: number; title: string; content?: React.ReactNode }[] = [
  {
    id: 1,
    title: 'Danh Sách Hồ Sơ Bệnh Án',
    content: <PatientListRecords />
  },
  {
    id: 2,
    title: 'Thông Tin Hành Chính',
    content: <PatientInformation />
  },
  {
    id: 3,
    title: 'Bệnh Sử',
    content: <div>Bệnh Sử</div>
  }
]

export default function PatientDetails(props: PatientDetailsProps) {
  const [tab, setTab] = useState<number>(1)
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
      <div role='tablist' className='tabs tabs-bordered'>
        {tabs.map((tabElement) => (
          <>
            <input
              type='radio'
              name='my_tabs_1'
              role='tab'
              className={classNames('tab mr-8 h-max !w-max !rounded-md !border-none py-2 text-base font-semibold', {
                'bg-primary text-white': tabElement.id === tab,
                'bg-gray-300 text-black': tabElement.id !== tab
              })}
              aria-label={tabElement.title}
              checked={tabElement.id === tab}
              onChange={() => handleChange(tabElement.id)}
            />
            <div role='tabpanel' className='tab-content mt-10'>
              {tabElement.content}
            </div>
          </>
        ))}
      </div>
    </article>
  )
}
