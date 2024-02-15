import Input from 'src/components/input/Input'
import Button from 'src/components/button/Button'
import Select from 'src/components/select/Select'
import prescriptionsApi from 'src/apis/prescriptions.api'
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'
import { useRef, useState } from 'react'
import { HiMiniXMark, HiCheck, HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi2'
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { listMedicalType } from 'src/data/medical'
import { PRESCRIPTION_MESSAGE } from 'src/constants/messages'
import { useMutation, useQueryClient } from 'react-query'
import { PrescriptionReqBody } from 'src/types/prescriptions.type'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { PrescriptionSchema, prescriptionSchema } from 'src/utils/rules'
import { PRESCRIPTION_ROW_NAME } from 'src/constants/common'
import { yupResolver } from '@hookform/resolvers/yup'

export interface ModalAddPrescriptionProps {
  modalRef: React.MutableRefObject<HTMLDialogElement | null>
  handleResetLatestPrescriptionDate: () => void
  patientName: string
}

const defaultValues: PrescriptionSchema = {
  [PRESCRIPTION_ROW_NAME]: [
    {
      medicineName: '',
      medicineType: listMedicalType[0].value as string,
      quantity: '',
      amount: '',
      usage: ''
    }
  ],
  date: {}
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
    defaultValues,
    mode: 'onChange'
  })

  const { append, remove, fields } = useFieldArray({
    control,
    name: PRESCRIPTION_ROW_NAME
  })
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null
  })
  const queryClient = useQueryClient()
  const { examinationId } = useParams() as { examinationId: string }
  const noteRef = useRef<HTMLTextAreaElement | null>(null)
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
      modalRef.current?.close()
      queryClient.invalidateQueries({
        queryKey: ['prescriptionExaminationId', examinationId]
      })
      handleResetLatestPrescriptionDate()
    }
  })

  const handleChangeDate = (date: DateValueType) => {
    setDateValue(date)
  }

  const handleCancel = () => {
    modalRef.current?.close()
    setDateValue({
      startDate: null,
      endDate: null
    })
    reset()
  }

  const onSubmit: SubmitHandler<PrescriptionSchema> = (data) => {
    const prescription = {
      note: noteRef.current?.value || ' ',
      details: data[PRESCRIPTION_ROW_NAME].map((prescription) => ({
        ...prescription,
        quantity: Number(prescription.quantity)
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

  const handleAddRow = () => {
    append(defaultValues[PRESCRIPTION_ROW_NAME])
  }

  const handleRemoveRow = (index: number) => {
    remove(index)
  }

  return (
    <dialog ref={modalRef} id='my_modal_2' className='modal'>
      <div className='modal-box h-screen max-w-[80%] p-8'>
        <form method='dialog'>
          <Button className='btn-circle btn-ghost btn-sm absolute right-2 top-2' title='✕' />
        </form>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className='mt-8 flex flex-col gap-4'>
            <article className='flex justify-between gap-2'>
              <h4 className='font-bold'>Prescription</h4>
              <Button
                type='button'
                className='btn-circle'
                onClick={handleAddRow}
                Icon={HiOutlinePlusCircle}
                iconClass='h-8 w-8'
              />
            </article>
            <div className='card bg-bg_primary shadow'>
              <div className='card-body'>
                <div className='overflow-x-auto'>
                  <table className='table'>
                    <thead>
                      <tr className='border-black/70'>
                        <th>Medicine name</th>
                        <th>Medicine type</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Usage</th>
                        <th className='text-center'>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fields.map((row, index) => (
                        <tr key={row.id} className='hover relative border-black/20'>
                          <td>
                            <Input
                              register={register}
                              name={`${PRESCRIPTION_ROW_NAME}.${index}.medicineName`}
                              placeholder='Medicine name'
                              errorMessage={errors[PRESCRIPTION_ROW_NAME]?.[index]?.medicineName?.message}
                            />
                          </td>
                          <td>
                            <Select
                              register={register}
                              name={`${PRESCRIPTION_ROW_NAME}.${index}.medicineType`}
                              options={listMedicalType}
                              errorMessage={errors[PRESCRIPTION_ROW_NAME]?.[index]?.medicineType?.message}
                            />
                          </td>
                          <td>
                            <Input
                              register={register}
                              name={`${PRESCRIPTION_ROW_NAME}.${index}.quantity`}
                              placeholder='Quantity'
                              type='number'
                              errorMessage={errors[PRESCRIPTION_ROW_NAME]?.[index]?.quantity?.message}
                            />
                          </td>
                          <td>
                            <Input
                              register={register}
                              name={`${PRESCRIPTION_ROW_NAME}.${index}.amount`}
                              placeholder='Amount'
                              errorMessage={errors[PRESCRIPTION_ROW_NAME]?.[index]?.amount?.message}
                            />
                          </td>
                          <td>
                            <Input
                              register={register}
                              name={`${PRESCRIPTION_ROW_NAME}.${index}.usage`}
                              placeholder='Usage'
                              errorMessage={errors[PRESCRIPTION_ROW_NAME]?.[index]?.usage?.message}
                            />
                          </td>
                          <td>
                            {fields.length > 1 && (
                              <Button
                                type='button'
                                className='btn-sm rounded-full'
                                onClick={() => handleRemoveRow(index)}
                                Icon={HiOutlineMinusCircle}
                                iconClass='h-8 w-8'
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
          <section className='mt-8 flex flex-col gap-4'>
            <h4 className='font-bold'>Note</h4>
            <div className='card bg-bg_primary shadow'>
              <div className='card-body gap-6 p-6'>
                <textarea
                  ref={noteRef}
                  rows={6}
                  className='textarea hover:border-primary focus:border-primary focus:outline-none'
                  placeholder='Note'
                ></textarea>
              </div>
            </div>
          </section>
          <div className='mt-8 flex justify-end gap-4'>
            <Button type='button' Icon={HiMiniXMark} className='btn-outline' onClick={handleCancel} title='Cancel' />
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
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  )
}
