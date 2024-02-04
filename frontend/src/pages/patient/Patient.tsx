import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from 'src/components/pagination/Pagination'
import { POSTS_PER_PAGE } from 'src/constants/common'
import { path } from 'src/constants/path'
import { patients } from 'src/data/patient'

export default function Patient() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const navigate = useNavigate()

  const lastPostIndex: number = currentPage * POSTS_PER_PAGE
  const firstPostIndex: number = lastPostIndex - POSTS_PER_PAGE
  const currentPosts = patients.slice(firstPostIndex, lastPostIndex)

  const handleNavigateDetails = (id: number) => {
    navigate(`${path.patients}/${id}`)
  }

  const handleCheckBox = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    event.stopPropagation()
  }

  return (
    <article className='flex w-full flex-col gap-4 p-4 lg:p-8'>
      <section className='flex w-full items-start justify-between'>
        <h1 className='self-center text-2xl font-bold'>Danh sách bệnh nhân</h1>
      </section>
      <section className='rounded-lg bg-white p-4 shadow-lg'>
        <div className='overflow-x-auto'>
          <table className='table'>
            <thead>
              <tr className='border-primary text-sm'>
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
                <tr className='hover cursor-pointer' key={patient.id} onClick={() => handleNavigateDetails(patient.id)}>
                  <td className='flex items-center gap-4'>
                    <input type='checkbox' className='checkbox-primary checkbox' onClick={handleCheckBox} />
                    {patient.name}
                  </td>
                  <td>{patient.date}</td>
                  <td>{patient.doctor}</td>
                  <td>{patient.diagnose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='mt-2 flex items-center justify-end'>
          <Pagination totalPosts={patients.length} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
      </section>
    </article>
  )
}
