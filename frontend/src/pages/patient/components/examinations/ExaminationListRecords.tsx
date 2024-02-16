import dayjs from 'dayjs'
import { useRef, useState } from 'react'
import { HiMiniPlus } from 'react-icons/hi2'
import { useQuery, useQueryClient } from 'react-query'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import Button from 'src/components/button/Button'
import Pagination from 'src/components/pagination/Pagination'
import { AddExamination } from 'src/pages/patient/components/examinations/components'
import patientApi from 'src/apis/patient.api'
import Modal from 'src/components/modal/Modal'
import { PagingFilter } from 'src/types/utils.type'
import Loading from 'src/components/loading/Loading'
import NoDataDisplay from 'src/components/no-data-display/NoDataDisplay'
import { PAGE_SIZE_DEFAULT } from 'src/constants/common'

export default function ExaminationListRecords() {
  const { patientId } = useParams() as { patientId: string }
  const navigate = useNavigate()
  const modalRef = useRef<HTMLDialogElement | null>(null)
  const patientName = useOutletContext<string>()
  const queryClient = useQueryClient()
  const [previousStep, setPreviousStep] = useState<number>(0)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pagingFilter: PagingFilter = {
    page: currentPage,
    size: PAGE_SIZE_DEFAULT
  }
  const { data: examinationsData, isLoading } = useQuery({
    queryKey: ['examinationsOfPatient', Number(patientId), pagingFilter],
    queryFn: () => patientApi.getExaminationsOfPatient(pagingFilter, Number(patientId))
  })

  const handleReset = () => {
    queryClient.invalidateQueries(['examinationsOfPatient', Number(patientId)])
  }

  const handleSetPreviousStep = (step: number) => {
    setPreviousStep(step)
  }
  const handleSetCurrentStep = (step: number) => {
    setCurrentStep(step)
  }

  const handleNavigate = (idMedicalRecord: string) => {
    navigate(`medical-records/${idMedicalRecord}`)
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
    } else if (examinationsData?.data && examinationsData.data.data.length > 0) {
      return examinationsData?.data.data.map((examination) => (
        <tr
          onClick={() => handleNavigate(examination.id.toString())}
          className='hover cursor-pointer'
          key={examination.id}
        >
          <td>{dayjs(examination.createdAt).format('DD/MM/YYYY')}</td>
          <td>{examination.hospital.name}</td>
          <td>{examination.diagnose}</td>
        </tr>
      ))
    } else {
      return (
        <tr>
          <td colSpan={3}>
            <NoDataDisplay
              title='Your list patient is empty'
              description='You can add new patient to display in this table.'
              actions={
                <Button
                  title='Add New Examination'
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
    <section className='rounded-lg bg-white p-4 shadow-lg'>
      <div className='mt-2 flex flex-wrap items-center justify-between gap-2 px-4'>
        <p className='text-lg font-bold'>List Of Examinations</p>
        {examinationsData?.data && examinationsData.data.data.length > 0 && (
          <Button
            title='Add New Examination'
            Icon={HiMiniPlus}
            className='btn-primary font-bold text-white'
            onClick={handleOpenModal}
          />
        )}
        <Modal modalRef={modalRef}>
          <AddExamination
            handleReset={handleReset}
            handleCloseModal={handleCloseModal}
            handleScrollTopModal={handleScrollTopModal}
            patientName={patientName}
            steps={{ previousStep, handleSetPreviousStep, currentStep, handleSetCurrentStep }}
          />
        </Modal>
      </div>
      <div className='mt-4 overflow-x-auto'>
        <table className='table'>
          <thead>
            <tr className='border-primary text-sm'>
              <th className='w-1/5'>Examination day</th>
              <th className='w-1/5'>Hospital</th>
              <th className='w-2/5'>Diagnose</th>
            </tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </div>
      {examinationsData?.data && examinationsData.data.data.length > 0 && (
        <div className='mt-2 flex items-center justify-end'>
          <Pagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalPages={examinationsData.data.totalPages}
          />
        </div>
      )}
    </section>
  )
}
