import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'
import { HiMiniXMark, HiCheck } from 'react-icons/hi2'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { listMedicalType } from 'src/data/medical'
import { PRESCRIPTION_MESSAGE } from 'src/constants/messages'
import { useMutation, useQueryClient } from 'react-query'
import { PrescriptionReqBody } from 'src/types/prescriptions.type'
import prescriptionsApi from 'src/apis/prescriptions.api'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { PrescriptionSchema, prescriptionSchema } from 'src/utils/rules'
import { PRESCRIPTION_ROW_NAME } from 'src/constants/common'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from 'src/components/button/Button'
import Modal from 'src/components/modal/Modal'
import { AddPrescriptionForm } from 'src/pages/patient/components/examinations/components/form'

export interface ModalAddPrescriptionProps {
  modalRef: React.MutableRefObject<HTMLDialogElement | null>
  handleResetLatestPrescriptionDate: () => void
  patientName: string
}

export const prescriptionDefaultValues: PrescriptionSchema = {
  [PRESCRIPTION_ROW_NAME]: [
    {
      medicineName: '',
      medicineType: listMedicalType[0].value as string,
      quantity: 1,
      amount: '',
      usage: ''
    }
  ],
  date: {},
  note: ''
}

export default function ModalAddPrescription({
  modalRef,
  handleResetLatestPrescriptionDate,
  patientName
}: ModalAddPrescriptionProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setError,
    clearErrors,
    trigger
  } = useForm<PrescriptionSchema>({
    resolver: yupResolver(prescriptionSchema),
    defaultValues: prescriptionDefaultValues,
    mode: 'onChange'
  })

  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null
  })
  const queryClient = useQueryClient()
  const { examinationId } = useParams() as { examinationId: string }
  const createPrescriptionMutation = useMutation({
    mutationFn: (prescription: PrescriptionReqBody) => prescriptionsApi.createPrescription(prescription),
    onSuccess: (data) => {
      toast.success(data.data.message, {
        progressClassName: 'bg-primary'
      })
      reset()
      setDateValue({
        startDate: null,
        endDate: null
      })
      handleCloseModal()
      queryClient.invalidateQueries({
        queryKey: ['prescriptionExaminationId', Number(examinationId)]
      })
      handleResetLatestPrescriptionDate()
    }
  })

  const handleChangeDate = (date: DateValueType) => {
    setDateValue(date)
  }

  const handleCloseModal = () => {
    modalRef.current?.close()
  }

  const onSubmit: SubmitHandler<PrescriptionSchema> = (data) => {
    const prescription = {
      note: data.note || ' ',
      details: data[PRESCRIPTION_ROW_NAME].map((item) => ({
        ...item,
        quantity: Number(item.quantity)
      })),
      startDate: data.date.startDate as string,
      endDate: data.date.endDate as string,
      prescriptionFilename: ' ',
      examinationId: Number(examinationId)
    }
    createPrescriptionMutation.mutate(prescription)
  }
  const handleSubmitForm = async () => {
    if (!dateValue?.startDate || !dateValue?.endDate) {
      setError('date', { message: PRESCRIPTION_MESSAGE.DATE.required })
      return
    } else {
      clearErrors('date')
    }
    const output = await trigger()
    if (!output) {
      return
    }
    await handleSubmit(onSubmit)()
  }

  return (
    <Modal modalRef={modalRef}>
      <article>
        <h2 className='text-2xl font-bold'>New Prescription</h2>
        <h3 className='text-lg'>
          Patient <span className='font-bold'>{patientName}</span>
        </h3>
      </article>
      <section className='mt-8 flex flex-col gap-4'>
        <h4 className='font-bold'>Time</h4>
        <div className='card bg-bg_primary shadow'>
          <div className='card-body gap-6 p-6'>
            <h2 className='card-title text-base font-bold'>Start Date - End Date</h2>
            <Controller
              control={control}
              name={'date'}
              render={({ field }) => (
                <div>
                  <Datepicker
                    value={dateValue}
                    onChange={(event) => {
                      field.onChange(event)
                      handleChangeDate(event)
                    }}
                    displayFormat={'DD/MM/YYYY'}
                    separator={'-'}
                    inputClassName='w-full placeholder:text-black pr-14 pl-4 py-3 rounded-lg outline-none border hover:border-primary focus:border-primary'
                  />
                  {errors.date?.message && (
                    <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errors.date?.message as string}</div>
                  )}
                </div>
              )}
            />
          </div>
        </div>
      </section>
      <form>
        <AddPrescriptionForm
          control={control}
          register={register}
          errors={errors}
          name={PRESCRIPTION_ROW_NAME}
          nameNote='note'
        />
        <div className='mt-8 flex justify-end gap-4'>
          <Button type='button' Icon={HiMiniXMark} className='btn-outline' onClick={handleCloseModal} title='Cancel' />
          <Button
            type='button'
            Icon={HiCheck}
            title='Save Prescription'
            className='btn-primary font-bold text-white'
            loading={createPrescriptionMutation.isLoading}
            onClick={handleSubmitForm}
          />
        </div>
      </form>
    </Modal>
  )
}
