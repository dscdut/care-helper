import { useState } from 'react'
import { HiMiniArrowDownCircle, HiMiniPlus } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import Pagination from 'src/components/Pagination'
import { patientRecords } from 'src/data/patient/patientRecords'

export default function PatientListRecords() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [postsPerPage, setPostsPerPage] = useState<number>(5)

  const lastPostIndex: number = currentPage * postsPerPage
  const firstPostIndex: number = lastPostIndex - postsPerPage
  const currentPosts = patientRecords.slice(firstPostIndex, lastPostIndex)

  return (
    <>
      <section className='rounded-lg bg-white p-4 shadow-lg'>
        <div className='overflow-x-auto'>
          <div className='mt-2 contents flex-row justify-between px-4 xl:flex'>
            <div className='text-base'>
              <p className='font-bold'>Danh sách các lần khám</p>
              <p>Từ các hồ sơ bệnh án của tất cả bệnh viện</p>
            </div>
            <div className=''>
              <div className='btn mr-2'>
                <HiMiniPlus className='h-6 w-6' />
                <p> Thêm lần khám mới</p>
              </div>
              <div className='dropdown dropdown-end dropdown-bottom'>
                <div tabIndex={0} role='button' className='btn m-1'>
                  <HiMiniArrowDownCircle className='h-6 w-6' />
                  <p>Hiển thị theo tất cả bệnh viện</p>
                </div>
                <ul className='menu dropdown-content z-[1] w-max rounded-box bg-base-100 p-2 text-base font-medium shadow-[0_1px_4px_rgba(0,0,0,0.16)]'>
                  <li>
                    <p>Bệnh viện Nhi Đồng I</p>
                  </li>
                  <li>
                    <p>Bệnh viện Đa khoa Lâm Đồng</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <table className='table   '>
            {/* head */}
            <thead className='border-b-2 border-b-indigo-500 text-sm'>
              <tr>
                <th>Lần khám</th>
                <th>Ngày khám</th>
                <th>Bệnh viện</th>
                <th>Bác sỹ phụ trách</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.date}</td>
                  <td>{patient.hospital}</td>
                  <td>{patient.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='mt-2 flex items-center justify-center'>
            <Pagination
              totalPosts={patientRecords.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </section>
    </>
  )
}
