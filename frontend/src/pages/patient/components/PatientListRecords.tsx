import dayjs from 'dayjs'
import { HiMiniPlus } from 'react-icons/hi2'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import examinationApi from 'src/apis/examination.api'
import Button from 'src/components/button/Button'
import Pagination from 'src/components/pagination/Pagination'
import { PAGE_SIZE_DEFAULT } from 'src/constants/common'
import { PagingFilter } from 'src/types/utils.type'

export default function PatientListRecords() {
  const { patientId } = useParams() as { patientId: string }
  const navigate = useNavigate()
  const examinationFilter: PagingFilter = {
    page: 1,
    size: PAGE_SIZE_DEFAULT
  }
  const { data: examinationsData } = useQuery({
    queryKey: ['examinations', patientId],
    queryFn: () => examinationApi.getExaminations(examinationFilter)
  })

  const handleNavigate = (idMedicalRecord: string) => {
    navigate(`medical-records/${idMedicalRecord}`)
  }

  return (
    <section className='rounded-lg bg-white p-4 shadow-lg'>
      <div className='mt-2 flex flex-wrap items-center justify-between gap-2 px-4'>
        <p className='text-lg font-bold'>List Of Examinations</p>
        <Button title='Add New Examination' Icon={HiMiniPlus} className='btn-primary font-bold text-white' />
      </div>
      <div className='mt-4 overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr className='border-primary text-sm'>
              <th>Examination day</th>
              <th>Diagnose</th>
            </tr>
          </thead>
          <tbody>
            {examinationsData?.data.data.map((examination) => (
              <tr
                onClick={() => handleNavigate(examination.id.toString())}
                className='hover cursor-pointer'
                key={examination.id}
              >
                <td>{dayjs(examination.createdAt).format('DD/MM/YYYY')}</td>
                <td>{examination.diagnose}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-2 flex items-center justify-end'>
        <Pagination />
      </div>
    </section>
  )
}
