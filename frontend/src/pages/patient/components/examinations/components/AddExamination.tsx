import { Fragment, useState } from 'react'
import { HiCheck, HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2'
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'
import Button from 'src/components/button/Button'
import { motion } from 'framer-motion'
import { formatDate } from 'src/utils/utils'
import { ExaminationSchema, examinationSchema } from 'src/utils/rules'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PRESCRIPTION_MESSAGE } from 'src/constants/messages'
import {
  AddPrescriptionForm,
  Confirm,
  DiagnoseForm,
  SelectHospitalForm,
  ExaminationStepForm
} from 'src/pages/patient/components/examinations/components/form'
import { PRESCRIPTION_ROW_NAME } from 'src/constants/common'
import { useMutation, useQuery } from 'react-query'
import examinationApi from 'src/apis/examination.api'
import { useParams } from 'react-router-dom'
import medicalTestsApi from 'src/apis/medicalTests.api'
import { PrescriptionReqBody } from 'src/types/prescriptions.type'
import prescriptionsApi from 'src/apis/prescriptions.api'
import { ExaminationReqBody, ExaminationUpdateReqBody } from 'src/types/examination.type'
import { MedicalTestReqBody, TestType } from 'src/types/medicalTests.type'
import hospitalsApi from 'src/apis/hospitals.api'
import { toast } from 'react-toastify'
import { prescriptionDefaultValues } from 'src/pages/patient/components/examinations/components/ModalAddPrescription'

export interface AddExaminationProps {
  patientName: string
  handleReset: () => void
  handleCloseModal: () => void
  handleScrollTopModal: () => void
  steps: {
    previousStep: number
    handleSetPreviousStep: (step: number) => void
    currentStep: number
    handleSetCurrentStep: (step: number) => void
  }
  patientId?: number
}

const stepsForm: { id: string; name: string }[] = [
  {
    id: 'Step 1',
    name: 'hospital'
  },
  {
    id: 'Step 2',
    name: 'birthMark'
  },
  {
    id: 'Step 3',
    name: 'bloodTest'
  },
  {
    id: 'Step 4',
    name: 'bloodFatTest'
  },
  {
    id: 'Step 5',
    name: 'diagnose'
  },
  {
    id: 'Step 6',
    name: 'prescription'
  },
  {
    id: 'Step 7',
    name: ''
  }
]

const defaultValues: ExaminationSchema = {
  birthMark: [
    {
      parameter: 'Heartbeat',
      index: '',
      unit: 'BPM'
    },
    {
      parameter: 'Blood sugar',
      index: '',
      unit: 'mg/dL'
    },
    {
      parameter: 'Blood pressure',
      index: '',
      unit: 'mgHg'
    }
  ],
  bloodTest: [
    {
      parameter: 'Blood urea',
      index: '',
      unit: 'mmol/l'
    },
    {
      parameter: 'Blood uric acid',
      index: '',
      unit: 'mg/dL'
    },
    {
      parameter: 'Blood creatinine',
      index: '',
      unit: 'mg/dL'
    }
  ],
  bloodFatTest: [
    {
      parameter: 'Total cholesterol index',
      index: '',
      unit: 'mg/dL'
    },
    {
      parameter: 'Idc index - cholesterol',
      index: '',
      unit: 'mg/dL'
    },
    {
      parameter: 'Triglyceride index',
      index: '',
      unit: 'mg/dL'
    },
    {
      parameter: 'HDL - cholesterol index',
      index: '',
      unit: 'mg/dL'
    }
  ],
  hospital: 1,
  prescription: prescriptionDefaultValues,
  diagnose: {
    details: '',
    advice: '',
    conclude: ''
  }
}

export default function AddExamination({
  patientName,
  steps: { previousStep, handleSetPreviousStep, currentStep, handleSetCurrentStep },
  handleCloseModal,
  handleReset,
  handleScrollTopModal,
  patientId
}: AddExaminationProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    trigger,
    getValues,
    setError,
    clearErrors
  } = useForm<ExaminationSchema>({
    resolver: yupResolver(examinationSchema),
    defaultValues,
    mode: 'onChange'
  })

  const [currentExaminationId, setCurrentExaminationId] = useState<number | null>(null)
  const delta = currentStep - previousStep
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null
  })
  const { patientId: patientIdParams } = useParams() as { patientId: string }
  const { data: hospitalsListNameData } = useQuery({
    queryKey: ['hospitalsListName'],
    queryFn: () => hospitalsApi.getHospitalsListName()
  })

  const postExaminationMutation = useMutation({
    mutationFn: (examinationBody: ExaminationReqBody) => examinationApi.postExamination(examinationBody),
    onSuccess: (data) => {
      setCurrentExaminationId(data.data.id)
    }
  })
  const putExaminationMutation = useMutation({
    mutationFn: (examinationUpdateBody: ExaminationUpdateReqBody) =>
      examinationApi.putExamination(examinationUpdateBody)
  })
  const createMedicalTestMutation = useMutation({
    mutationFn: (medicalTestBody: MedicalTestReqBody) => medicalTestsApi.createMedicalTest(medicalTestBody)
  })
  const createPrescriptionMutation = useMutation({
    mutationFn: (prescription: PrescriptionReqBody) => prescriptionsApi.createPrescription(prescription)
  })
  const handleChangeDate = (date: DateValueType) => {
    setDateValue(date)
  }
  const handleOnSubmit: SubmitHandler<ExaminationSchema> = async (data) => {
    const examinationUpdateBody: ExaminationUpdateReqBody = {
      id: currentExaminationId as number,
      advice: data.diagnose.advice || '',
      diagnose: data.diagnose.conclude,
      detailDiagnose: data.diagnose.details,
      hospitalId: Number(getValues('hospital'))
    }
    const medicalTestBody: MedicalTestReqBody = {
      examinationId: currentExaminationId as number,
      testRows: JSON.stringify([
        ...data.birthMark.map((birthMark) => ({
          name: birthMark.parameter,
          unit: birthMark.unit,
          value: birthMark.index,
          type: TestType.UROGENITAL
        })),
        ...data.bloodTest.map((bloodTest) => ({
          name: bloodTest.parameter,
          unit: bloodTest.unit,
          value: bloodTest.index,
          type: TestType.BLOOD
        })),
        ...data.bloodFatTest.map((bloodFatTest) => ({
          name: bloodFatTest.parameter,
          unit: bloodFatTest.unit,
          value: bloodFatTest.index,
          type: TestType.BLOOD_FAT
        }))
      ])
    }
    const prescription: PrescriptionReqBody = {
      note: data.prescription.note || ' ',
      details: data.prescription[PRESCRIPTION_ROW_NAME].map((item) => ({
        ...item,
        quantity: Number(item.quantity)
      })),
      startDate: data.prescription.date.startDate as string,
      endDate: data.prescription.date.endDate as string,
      prescriptionFilename: ' ',
      examinationId: currentExaminationId as number
    }
    const putExaminationMutate = putExaminationMutation.mutateAsync
    const createMedicalTestMutate = createMedicalTestMutation.mutateAsync
    const createPrescriptionMutate = createPrescriptionMutation.mutateAsync
    try {
      await Promise.all([
        putExaminationMutate(examinationUpdateBody),
        createMedicalTestMutate(medicalTestBody),
        createPrescriptionMutate(prescription)
      ])
      handleCloseModal()
      toast.success('Create new examination successfully.', {
        progressClassName: 'bg-primary'
      })
      handleReset()
      reset()
    } catch (error) {
      toast.error('Error')
    }
  }

  const handleOnNext = async () => {
    if (currentStep === stepsForm.length - 2) {
      if (!dateValue?.startDate || !dateValue?.endDate) {
        setError('prescription.date', { message: PRESCRIPTION_MESSAGE.DATE.required })
        return
      } else {
        clearErrors('prescription.date')
      }
    }
    const fieldName = stepsForm[currentStep].name
    const output = await trigger(fieldName as any, { shouldFocus: true })

    if (!output) {
      return
    }

    if (currentStep === 0) {
      const examinationBody: ExaminationReqBody = {
        hospitalId: Number(getValues('hospital')),
        patientId: Number(patientIdParams) || Number(patientId)
      }
      postExaminationMutation.mutateAsync(examinationBody)
    }

    if (currentStep < stepsForm.length) {
      if (currentStep === stepsForm.length - 1) {
        await handleSubmit(handleOnSubmit)()
      } else {
        handleSetPreviousStep(currentStep)
        handleSetCurrentStep(currentStep + 1)
      }
    }
    handleScrollTopModal()
  }

  const handleOnBack = () => {
    handleSetPreviousStep(currentStep)
    handleSetCurrentStep(currentStep - 1)
    handleScrollTopModal()
  }

  return (
    <Fragment>
      {currentStep !== -1 && (
        <Fragment>
          <section className='flex items-end justify-between gap-2'>
            <article>
              <h2 className='text-2xl font-bold'>New Examination</h2>
              <h3 className='text-lg'>
                Patient <span className='font-bold'>{patientName}</span>
              </h3>
            </article>
            {currentStep > 0 && (
              <article>
                <h4 className='font-bold'>
                  {hospitalsListNameData?.data.find((hospital) => hospital.id === Number(getValues('hospital')))?.name}
                </h4>
                <h4>
                  Examination date:{' '}
                  <span className='font-bold'>{formatDate(new Date().toISOString(), 'DD/MM/YYYY')}</span>
                </h4>
              </article>
            )}
          </section>

          <section className='mt-8 flex flex-1 flex-col'>
            <form className='flex flex-1 flex-col gap-8' onSubmit={handleSubmit(handleOnSubmit)}>
              {currentStep === stepsForm.length - 1 && (
                <section className='flex flex-col gap-2'>
                  <div className='card bg-bg_primary shadow'>
                    <div className='card-body flex-row flex-wrap gap-4'>
                      <p>
                        Note: Doctors must take full responsibility for the information they enter. Please check
                        carefully before confirming.
                      </p>
                      <article className='flex gap-4'>
                        <Button
                          type='button'
                          title='Back'
                          className='btn-outline font-bold '
                          Icon={HiOutlineChevronLeft}
                          iconClass='w-5 h-5'
                          onClick={handleOnBack}
                        />

                        <Button
                          type='button'
                          title='Confirm'
                          className='btn-primary font-bold text-white'
                          Icon={HiCheck}
                          iconClass='w-5 h-5'
                          onClick={handleOnNext}
                          loading={
                            putExaminationMutation.isLoading ||
                            createMedicalTestMutation.isLoading ||
                            createPrescriptionMutation.isLoading
                          }
                        />
                      </article>
                    </div>
                  </div>
                </section>
              )}
              {currentStep === 0 && (
                <SelectHospitalForm
                  delta={delta}
                  register={register}
                  errorMessage={errors.hospital?.message || ''}
                  hospitalsListNameData={hospitalsListNameData?.data || []}
                />
              )}
              {currentStep === 1 && (
                <ExaminationStepForm
                  title='Birth mark'
                  delta={delta}
                  control={control}
                  name='birthMark'
                  register={register}
                  errors={errors}
                />
              )}
              {currentStep === 2 && (
                <ExaminationStepForm
                  title='Blood test'
                  delta={delta}
                  control={control}
                  name='bloodTest'
                  register={register}
                  errors={errors}
                />
              )}
              {currentStep === 3 && (
                <ExaminationStepForm
                  title='Blood fat test'
                  delta={delta}
                  control={control}
                  name='bloodFatTest'
                  register={register}
                  errors={errors}
                />
              )}
              {currentStep === 4 && <DiagnoseForm delta={delta} register={register} errors={errors} />}
              {currentStep === 5 && (
                <motion.div
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className='flex flex-1 flex-col gap-4'
                >
                  <section className='flex flex-col gap-4'>
                    <h4 className='font-bold'>Time</h4>
                    <div className='card bg-bg_primary shadow'>
                      <div className='card-body gap-6 p-6'>
                        <h2 className='card-title text-base font-bold'>Start Date - End Date</h2>
                        <Controller
                          control={control}
                          name={'prescription.date'}
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
                              {errors.prescription?.date?.message && (
                                <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>
                                  {errors.prescription?.date?.message as string}
                                </div>
                              )}
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </section>
                  <AddPrescriptionForm
                    control={control}
                    register={register}
                    errors={errors}
                    name='prescription.prescriptionRow'
                    nameNote='prescription.note'
                  />
                </motion.div>
              )}
              {currentStep === 6 && (
                <Confirm
                  data={getValues()}
                  delta={delta}
                  examinationId={currentExaminationId || 0}
                  patientName={patientName}
                />
              )}

              {currentStep !== stepsForm.length - 1 && (
                <article className='flex w-full justify-end gap-4'>
                  {currentStep > 0 && (
                    <Button
                      type='button'
                      title='Back'
                      className='btn-outline font-bold '
                      Icon={HiOutlineChevronLeft}
                      iconClass='w-5 h-5'
                      onClick={handleOnBack}
                    />
                  )}
                  {previousStep === -1 && (
                    <Button
                      type='button'
                      title='Back'
                      className='btn-outline font-bold '
                      Icon={HiOutlineChevronLeft}
                      iconClass='w-5 h-5'
                      onClick={handleOnBack}
                    />
                  )}
                  <Button
                    type='button'
                    title='Next'
                    className='btn-primary font-bold text-white'
                    Icon={HiOutlineChevronRight}
                    iconClass='w-5 h-5'
                    onClick={handleOnNext}
                  />
                </article>
              )}
            </form>
          </section>
        </Fragment>
      )}
    </Fragment>
  )
}
