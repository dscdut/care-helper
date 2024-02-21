import { HiOutlineInformationCircle } from 'react-icons/hi2'
import { twMerge } from 'tailwind-merge'

export interface NoDataDisplayProps {
  title: string
  description: string
  actions?: React.ReactNode
  containerClass?: string
}

export default function NoDataDisplay({ title, description, containerClass, actions }: NoDataDisplayProps) {
  return (
    <div className={twMerge('px-10 py-4', containerClass)}>
      <div className='flex flex-col items-center justify-center py-12'>
        <HiOutlineInformationCircle className='h-20 w-20' />
        <p className='mb-2 text-xl font-semibold text-gray-600'>{title}</p>
        <p className='mb-6 text-center text-gray-500'>{description}</p>
        {actions}
      </div>
    </div>
  )
}
