import { HiMiniPlus } from 'react-icons/hi2'
import { useRef, useState } from 'react'
import { ModalAddPrescription } from 'src/pages/patient/components/examinations/components'
import { PrescriptionType } from 'src/types/prescriptions.type'
import { formatDate } from 'src/utils/utils'
import Button from 'src/components/button/Button'
import Select from 'src/components/select/Select'
import { twMerge } from 'tailwind-merge'

export interface PrescriptionProps {
  prescriptionData: PrescriptionType[]
  patientName: string
  containerClass?: string
  cardClass?: string
  canAdd?: boolean
}

export default function Prescription({
  prescriptionData,
  patientName,
  containerClass,
  cardClass,
  canAdd = true
}: PrescriptionProps) {
  const listDatePrescriptions = prescriptionData.map((prescription) => ({
    id: prescription.id,
    date: `${formatDate(prescription.startDate, 'DD/MM/YYYY')} - ${formatDate(prescription.endDate, 'DD/MM/YYYY')}`
  }))
  const [latestPrescriptionDate, setLatestPrescriptionDate] = useState<number>(0)
  const modalRef = useRef<HTMLDialogElement | null>(null)
  const handleOpenModal = () => {
    modalRef.current?.showModal()
  }

  const handleChangeDatePrescription = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLatestPrescriptionDate(Number(event.currentTarget.value))
  }

  const handleResetLatestPrescriptionDate = () => {
    setLatestPrescriptionDate(0)
  }

  return (
    <section className={twMerge('card bg-white shadow-lg', containerClass)}>
      <div className='card-body gap-6'>
        <h2 className='card-title font-bold'>Prescription</h2>
        <div className={twMerge('card bg-bg_primary shadow', cardClass)}>
          <div className='card-body'>
            <article className='flex flex-wrap items-center justify-end gap-4'>
              <article className='flex flex-col-reverse items-start justify-end gap-4 sm:items-end md:flex-row'>
                <Select
                  value={latestPrescriptionDate}
                  onChange={handleChangeDatePrescription}
                  options={listDatePrescriptions.map((prescriptionDate, index) => ({
                    label: prescriptionDate.date,
                    value: index
                  }))}
                  register={() => null}
                  name='prescriptionDate'
                />

                {canAdd && (
                  <Button
                    type='button'
                    onClick={handleOpenModal}
                    Icon={HiMiniPlus}
                    title='Add Prescription'
                    className='btn-primary font-bold text-white'
                  />
                )}

                <ModalAddPrescription
                  modalRef={modalRef}
                  handleResetLatestPrescriptionDate={handleResetLatestPrescriptionDate}
                  patientName={patientName}
                />
              </article>
            </article>
            <div className='overflow-x-auto'>
              <table className='table'>
                <thead>
                  <tr className='border-black/70'>
                    <th>Medicine Name</th>
                    <th>Medicine Type</th>
                    <th>Quantity</th>
                    <th>Amount</th>
                    <th>Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptionData[latestPrescriptionDate].details.map((prescription, index) => (
                    <tr key={index} className='hover border-black/20'>
                      <td>{prescription.medicineName}</td>
                      <td>{prescription.medicineType}</td>
                      <td>{prescription.quantity}</td>
                      <td>{prescription.amount}</td>
                      <td>{prescription.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className={twMerge('card bg-bg_primary shadow', cardClass)}>
          <div className='card-body gap-6'>
            <h2 className='card-title font-bold'>Note</h2>
            <p className='whitespace-pre-line pl-2 leading-8'>{prescriptionData[latestPrescriptionDate].note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
