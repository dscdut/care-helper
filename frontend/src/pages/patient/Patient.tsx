import { HiMiniPlus } from 'react-icons/hi2'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import patientApi from 'src/apis/patient.api'
import Button from 'src/components/button/Button'
import Loading from 'src/components/loading/Loading'
import Pagination from 'src/components/pagination/Pagination'
import { path } from 'src/constants/path'
import { formatDate } from 'src/utils/utils'

export default function Patient() {
  const navigate = useNavigate()

  const { data: myPatientsData, isLoading } = useQuery({
    queryKey: ['myPatients'],
    queryFn: () => patientApi.getMyPatients()
  })

  const handleNavigateDetails = (id: number) => {
    navigate(`${path.patients}/${id}`)
  }
  const handleNavigateSurvey = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    navigate(path.surveys)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <article className='flex w-full flex-col gap-4 p-4 lg:p-8'>
      <section className='flex w-full flex-col items-start justify-between gap-2 sm:flex-row'>
        <h1 className='text-2xl font-bold sm:self-center'>Patient List</h1>
        <Button title='Add New Patient' Icon={HiMiniPlus} className='btn-primary font-bold text-white' />
      </section>
      <section className='rounded-lg bg-white p-4 shadow-lg'>
        <div className='max-h-[calc(100vh_-_14.5rem)] overflow-auto lg:max-h-[calc(100vh_-_16.5rem)]'>
          <table className='table'>
            <thead>
              <tr className='border-primary text-sm'>
                <th>Patient name</th>
                <th>Phone number</th>
                <th>Birthday</th>
                <th className='text-center'>Survey status</th>
              </tr>
            </thead>
            <tbody>
              {myPatientsData?.data.map((patient) => (
                <tr className='hover cursor-pointer' key={patient.id} onClick={() => handleNavigateDetails(patient.id)}>
                  <td>{patient.fullName}</td>
                  <td>{patient.phone}</td>
                  <td>{formatDate(patient.birthday, 'DD/MM/YYYY')}</td>
                  <td>
                    <Button
                      onClick={handleNavigateSurvey}
                      title='View Survey'
                      className='btn-primary w-full font-bold text-white'
                    />
                  </td>
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
