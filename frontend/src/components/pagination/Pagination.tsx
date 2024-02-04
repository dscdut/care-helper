import classNames from 'classnames'
import React from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { POSTS_PER_PAGE } from 'src/constants/common'

interface PaginationProps {
  totalPosts: number
  setCurrentPage: (page: number) => void
  currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({ totalPosts, setCurrentPage, currentPage }) => {
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  return (
    <div className='flex items-center gap-2'>
      <button onClick={() => setCurrentPage(currentPage - 1)} className='btn btn-sm' disabled={currentPage === 1}>
        <HiChevronLeft />
      </button>
      {Array(totalPages)
        .fill(0)
        .map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={classNames('btn btn-sm', {
              'btn-primary': currentPage === index + 1
            })}
          >
            {index + 1}
          </button>
        ))}
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        className='btn btn-sm'
        disabled={currentPage === totalPages}
      >
        <HiChevronRight />
      </button>
    </div>
  )
}

export default Pagination
