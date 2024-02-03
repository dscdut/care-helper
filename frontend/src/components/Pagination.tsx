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
    if (currentPage === 1) {
      return [1, 2, 3]
    } else if (currentPage === totalPages) {
      return [totalPages - 2, totalPages - 1, totalPages]
    } else {
      return [currentPage - 1, currentPage, currentPage + 1]
    }
  }

  return (
    <div className=''>
      <button
        onClick={() => setCurrentPage(1)}
        className={`btn ${currentPage === 1 ? 'btn-primary' : 'hover:bg-gray-200'}`}
        disabled={currentPage === 1}
      >
        <HiMiniChevronDoubleLeft />
      </button>
      {getClosestPages(currentPage, totalPages).map((page, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={`btn mx-2 ${page === currentPage ? 'btn-primary' : 'hover:bg-gray-200'}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage(totalPages)}
        className={`btn ${currentPage === totalPages ? 'btn-primary' : 'hover:bg-gray-200'}`}
        disabled={currentPage === totalPages}
      >
        <HiMiniChevronDoubleRight />
      </button>
    </div>
  )
}

export default Pagination
