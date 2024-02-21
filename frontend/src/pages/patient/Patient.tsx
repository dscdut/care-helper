import { useRef, useState } from 'react'
import { HiMiniPlus } from 'react-icons/hi2'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import Button from 'src/components/button/Button'
import Loading from 'src/components/loading/Loading'
import Modal from 'src/components/modal/Modal'
import Pagination from 'src/components/pagination/Pagination'
import { path } from 'src/constants/path'
import { formatDate } from 'src/utils/utils'
import doctorApi from 'src/apis/doctor.api'
import { AddPatientForm } from 'src/pages/patient/components'
import { PaginationParams } from 'src/types/utils.type'
import NoDataDisplay from 'src/components/no-data-display/NoDataDisplay'
import { DEFAULT_PAGING_SIZE } from 'src/constants/common'

export default function Patient() {
  const navigate = useNavigate()
  const modalRef = useRef<HTMLDialogElement | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const paginationParams: PaginationParams = {
    page: currentPage,
    size: DEFAULT_PAGING_SIZE
  }
  const { data: myPatientsData, isLoading } = useQuery({
    queryKey: ['myPatients', paginationParams],
    queryFn: () => doctorApi.getMyPatients(paginationParams)
  })

  const handleNavigateDetails = (id: number) => {
    navigate(`${path.patients}/${id}`)
  }
  const handleNavigateSurvey = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    navigate(path.surveys)
  }

  const handleOpenModal = () => {
    modalRef.current?.showModal()
  }

  const handleCloseModal = () => {
    modalRef.current?.close()
  }

  const handleScrollTopModal = () => {
    modalRef.current?.firstElementChild?.scrollTo({
      behavior: 'smooth',
      top: 0
    })
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const renderBody = () => {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={4}>
            <Loading containerClass='h-96' />
          </td>
        </tr>
      )
    } else if (myPatientsData?.data && myPatientsData.data.data.length > 0) {
      return myPatientsData?.data.data.map((patient) => (
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
      ))
    } else {
      return (
        <tr>
          <td colSpan={4}>
            <NoDataDisplay
              title='Your list patient is empty'
              description='You can add new patient to display in this table.'
              actions={
                <Button
                  title='Add New Patient'
                  Icon={HiMiniPlus}
                  className='btn-primary font-bold text-white'
                  onClick={handleOpenModal}
                />
              }
            />
          </td>
        </tr>
      )
    }
  }

  return (
    <article className='flex w-full flex-col gap-4 p-4 lg:p-8'>
      <section className='flex w-full flex-col items-start justify-between gap-2 sm:flex-row'>
        <h1 className='text-2xl font-bold sm:self-center'>Patient List</h1>
        {myPatientsData?.data && myPatientsData.data.data.length > 0 && (
          <Button
            title='Add New Patient'
            Icon={HiMiniPlus}
            className='btn-primary font-bold text-white'
            onClick={handleOpenModal}
          />
        )}
        <Modal modalRef={modalRef}>
          <AddPatientForm handleScrollTopModal={handleScrollTopModal} handleCloseModal={handleCloseModal} />
        </Modal>
      </section>
      <section className='rounded-lg bg-white p-4 shadow-lg'>
        <div className='max-h-[calc(100vh_-_14.5rem)] overflow-auto lg:max-h-[calc(100vh_-_16.5rem)]'>
          <table className='table'>
            <thead>
              <tr className='border-primary text-sm'>
                <th className='w-2/5'>Patient name</th>
                <th className='w-1/5'>Phone number</th>
                <th className='w-1/5'>Birthday</th>
                <th className='w-1/5 text-center'>Survey status</th>
              </tr>
            </thead>
            <tbody>{renderBody()}</tbody>
          </table>
        </div>
        {myPatientsData?.data && myPatientsData.data.data.length > 0 && (
          <div className='mt-2 flex items-center justify-end'>
            <Pagination
              totalPages={myPatientsData.data.totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </section>
    </article>
  )
}
