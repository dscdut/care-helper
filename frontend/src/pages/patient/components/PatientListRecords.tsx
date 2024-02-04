import { useState } from 'react'
import { HiMiniPlus } from 'react-icons/hi2'
import Pagination from 'src/components/pagination/Pagination'
import { POSTS_PER_PAGE } from 'src/constants/common'
import { patientRecords } from 'src/data/patient'

export default function PatientListRecords() {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const lastPostIndex: number = currentPage * POSTS_PER_PAGE
  const firstPostIndex: number = lastPostIndex - POSTS_PER_PAGE
  const currentPosts = patientRecords.slice(firstPostIndex, lastPostIndex)

  return (
    <section className='rounded-lg bg-white p-4 shadow-lg'>
      <div className='mt-2 flex flex-wrap justify-between gap-2 px-4'>
        <div className='text-base'>
          <p className='font-bold'>Danh sách các lần khám</p>
          <p>Từ các hồ sơ bệnh án của tất cả bệnh viện</p>
        </div>
        <div className='flex flex-wrap gap-2 sm:gap-4'>
          <div className='btn btn-primary text-white'>
            <HiMiniPlus className='h-6 w-6' />
            <p> Thêm lần khám mới</p>
          </div>
          <select
            defaultValue=''
            className='select select-bordered w-full w-max border-primary text-base focus:border-primary focus:outline-none'
          >
            <option value=''>Hiển thị theo tất cả bệnh viện</option>
            <option value='Game of Thrones'>Game of Thrones</option>
            <option value='Lost'>Lost</option>
          </select>
        </div>
      </div>
      <div className='mt-4 overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr className='border-primary text-sm'>
              <th>Lần khám</th>
              <th>Ngày khám</th>
              <th>Bệnh viện</th>
              <th>Bác sỹ phụ trách</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((patient) => (
              <tr className='hover cursor-pointer' key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.date}</td>
                <td>{patient.hospital}</td>
                <td>{patient.doctor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-2 flex items-center justify-end'>
        <Pagination totalPosts={patientRecords.length} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div>
    </section>
  )
}
