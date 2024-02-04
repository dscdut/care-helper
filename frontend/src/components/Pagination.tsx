import classNames from 'classnames'
import React from 'react'
import { HiMiniChevronDoubleLeft, HiMiniChevronDoubleRight } from 'react-icons/hi2'

interface PaginationProps {
  totalPosts: number
  postsPerPage: number
  setCurrentPage: (page: number) => void
  currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const pages: number[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  const getClosestPages = (currentPage: number, totalPages: number): number[] => {
    const pageRange = totalPages > 2 ? 3 : totalPages
    const middlePage = Math.min(Math.max(currentPage, 2), totalPages - 1)

    const startPage = Math.max(1, middlePage - Math.floor(pageRange / 2))
    const endPage = Math.min(totalPages, startPage + pageRange - 1)

    const pagesInRange = []
    for (let i = startPage; i <= endPage; i++) {
      pagesInRange.push(i)
    }

    return pagesInRange
  }

  return (
    <div className=''>
      <button
        onClick={() => setCurrentPage(1)}
        className={classNames('btn', {
          'btn-primary': currentPage === 1,
          'hover:bg-gray-200': currentPage !== 1
        })}
        disabled={currentPage === 1}
      >
        <HiMiniChevronDoubleLeft />
      </button>
      {getClosestPages(currentPage, totalPages).map((page, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={classNames('btn mx-2', {
            'btn-primary': currentPage === page,
            'hover:bg-gray-200': currentPage !== page
          })}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(totalPages)}
        className={classNames('btn', {
          'btn-primary': currentPage === totalPages,
          'hover:bg-gray-200': currentPage !== totalPages
        })}
        disabled={currentPage === totalPages}
      >
        <HiMiniChevronDoubleRight />
      </button>
    </div>
  )
}

export default Pagination
