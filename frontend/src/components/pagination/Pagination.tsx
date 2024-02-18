import classNames from 'classnames'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import Button from 'src/components/button/Button'
export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handleChangePage = (page: number) => {
    onPageChange(page)
  }
  return (
    <div className='flex items-center gap-2'>
      <div className={classNames({ 'cursor-not-allowed': currentPage === 1 })}>
        <Button
          className='btn-sm'
          Icon={HiChevronLeft}
          iconClass='w-[unset] h-[unset]'
          disabled={currentPage === 1}
          onClick={() => handleChangePage(currentPage - 1)}
        />
      </div>

      {Array(totalPages)
        .fill(0)
        .map((_, index) => {
          const page = index + 1
          return (
            <Button
              key={page}
              className={classNames('btn-sm', {
                'btn-primary text-white': page === currentPage
              })}
              title={page.toString()}
              onClick={() => handleChangePage(page)}
            />
          )
        })}
      <div className={classNames({ 'cursor-not-allowed': currentPage === totalPages })}>
        <Button
          className='btn-sm'
          Icon={HiChevronRight}
          iconClass='w-[unset] h-[unset]'
          disabled={currentPage === totalPages}
          onClick={() => handleChangePage(currentPage + 1)}
        />
      </div>
    </div>
  )
}
