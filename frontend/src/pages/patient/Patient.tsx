import { useNavigate } from 'react-router-dom'
import Pagination from 'src/components/pagination/Pagination'
import { path } from 'src/constants/path'
import { patients } from 'src/data/patient'

export default function Patient() {
  const navigate = useNavigate()

  const handleNavigateDetails = (id: number) => {
    navigate(`${path.patients}/${id}`)
  }
  const handleNavigateSurvey = (id: number) => {
    navigate({
      pathname: `${path.surveys}`,
      search: `${path.patients}/${id}`
    })
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
        <div className='flex overflow-x-auto'>
          <table className='flex-3 table border-r-4'>
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
              {patients.map((patient) => (
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
          <table className='table flex-1'>
            <thead>
              <tr className='border-primary text-sm'>
                <th className=' py-3.5'>Tình trạng khảo sát</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr className='hover cursor-pointer' key={patient.id} onClick={() => handleNavigateSurvey(patient.id)}>
                  <td className='btn btn-link'>Show</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='mt-2 flex items-center justify-end'>
          <Pagination />
        </div>
      </section>
    </article>
  )
}
