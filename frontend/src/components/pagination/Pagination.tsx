import classNames from 'classnames'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'

export default function Pagination() {
  return (
    <div className='flex items-center gap-2'>
      <button className='btn btn-sm' disabled>
        <HiChevronLeft />
      </button>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <button
            key={index}
            className={classNames('btn btn-sm', {
              'btn-primary': index === 0
            })}
          >
            {index + 1}
          </button>
        ))}
      <button className='btn btn-sm'>
        <HiChevronRight />
      </button>
    </div>
  )
}
