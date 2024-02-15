import dayjs from 'dayjs'
import { useRef, useState } from 'react'
import { HiMiniPlus } from 'react-icons/hi2'
import { useQuery, useQueryClient } from 'react-query'
import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import Button from 'src/components/button/Button'
import Pagination from 'src/components/pagination/Pagination'
import { DEFAULT_PAGING_FILTER } from 'src/constants/common'
import AddExamination from './components/AddExamination'
import patientApi from 'src/apis/patient.api'
import Modal from 'src/components/modal/Modal'

export default function ExaminationListRecords() {
  const { patientId } = useParams() as { patientId: string }
  const navigate = useNavigate()
  const modalRef = useRef<HTMLDialogElement | null>(null)
  const patientName = useOutletContext<string>()
  const queryClient = useQueryClient()
  const [previousStep, setPreviousStep] = useState<number>(0)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const { data: examinationsData } = useQuery({
    queryKey: ['examinationsOfPatient', Number(patientId)],
    queryFn: () => patientApi.getExaminationsOfPatient(DEFAULT_PAGING_FILTER, Number(patientId))
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

  return (
    <section className='rounded-lg bg-white p-4 shadow-lg'>
      <div className='mt-2 flex flex-wrap items-center justify-between gap-2 px-4'>
        <p className='text-lg font-bold'>List Of Examinations</p>
        <Button
          title='Add New Examination'
          Icon={HiMiniPlus}
          className='btn-primary font-bold text-white'
          onClick={handleOpenModal}
        />
        <Modal modalRef={modalRef}>
          <AddExamination
            handleReset={handleReset}
            modalRef={modalRef}
            patientName={patientName}
            steps={{ previousStep, handleSetPreviousStep, currentStep, handleSetCurrentStep }}
          />
        </Modal>
      </div>
      <div className='mt-4 overflow-x-auto'>
        <table className='table'>
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
