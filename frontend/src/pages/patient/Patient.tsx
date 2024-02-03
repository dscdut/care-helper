import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Pagination from 'src/components/Pagination'
import { patients } from 'src/data/patient/patient'

export default function Patient() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [postsPerPage, setPostsPerPage] = useState<number>(5)

  const lastPostIndex: number = currentPage * postsPerPage
  const firstPostIndex: number = lastPostIndex - postsPerPage
  const currentPosts = patients.slice(firstPostIndex, lastPostIndex)

  return (
    <article className='flex w-full flex-col gap-4 p-4 lg:p-8'>
      <section className='flex w-full items-start justify-between'>
        <h1 className='self-center text-2xl font-bold'>Danh sách bệnh nhân</h1>
      </section>
      <section className='rounded-lg bg-white p-4 shadow-lg'>
        <div className='overflow-x-auto'>
          <table className='table'>
            <thead>
              <tr className='size-min text-base text-slate-400'>
                <th className='flex items-center gap-4'>
                  <input type='checkbox' className='checkbox-primary checkbox' /> Tên bệnh nhân
                </th>
                <th>Ngày khám</th>
                <th>Bác sỹ phụ trách</th>
                <th>Chẩn đoán</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((patient) => (
                <tr key={patient.id}>
                  <td className='flex items-center gap-4'>
                    <input type='checkbox' className='checkbox-primary checkbox' />{' '}
                    <Link to={patient.id}>{patient.name}</Link>
                  </td>
                  <td>{patient.date}</td>
                  <td>{patient.doctor}</td>
                  <td>{patient.diagnose}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='mt-2 flex items-center justify-center'>
            <Pagination
              totalPosts={patients.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </section>
    </article>
  )
}
