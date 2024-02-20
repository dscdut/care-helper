import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SearchSchema, searchSchema } from 'src/utils/rules'
import { motion } from 'framer-motion'
import { AddExamination } from 'src/pages/patient/components/examinations/components'
import { useQuery, useQueryClient } from 'react-query'
import patientApi from 'src/apis/patient.api'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import { PatientOfDoctor } from 'src/types/users.type'
import SearchForm from 'src/components/form/SearchForm'

export interface AddPatientFormProps {
  handleCloseModal: () => void
  handleScrollTopModal: () => void
}

const defaultValues: SearchSchema = {
  keyword: ''
}

export default function AddPatientForm({ handleCloseModal, handleScrollTopModal }: AddPatientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm<SearchSchema>({
    resolver: yupResolver(searchSchema),
    defaultValues
  })
  const [previousStep, setPreviousStep] = useState<number>(-1)
  const [currentStep, setCurrentStep] = useState<number>(-1)
  const delta = currentStep - previousStep
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [currentPatient, setCurrentPatient] = useState<PatientOfDoctor | null>(null)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {
    data: searchData,
    isSuccess,
    isLoading
  } = useQuery({
    queryKey: ['patients', getValues('keyword')],
    queryFn: () => patientApi.getPatients({ keyword: getValues('keyword') }),
    enabled: isSearching
  })

  useEffect(() => {
    if (isSuccess) {
      setIsSearching(false)
    }
  }, [isSuccess])

  const handleSetPreviousStep = (step: number) => {
    setPreviousStep(step)
  }
  const handleSetCurrentStep = (step: number) => {
    setCurrentStep(step)
  }

  const handleOnSubmit: SubmitHandler<SearchSchema> = (data) => {
    setIsSearching(true)
  }
  const handleChoosePatient = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, patient: PatientOfDoctor) => {
    navigate(`${path.patients}/${patient.id}`)
  }
  const handleReset = () => {
    reset()
    setPreviousStep(-1)
    setCurrentStep(-1)
    queryClient.invalidateQueries(['myPatients'])
  }

  const handleClickAction = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, patient: PatientOfDoctor) => {
    event.stopPropagation()
    setCurrentPatient(patient)
    setPreviousStep(currentStep)
    setCurrentStep((step) => step + 1)
  }

  return (
    <div className='flex flex-1 flex-col'>
      {currentStep === -1 && (
        <motion.div
          className='flex flex-1 flex-col gap-8'
          initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <article className='flex flex-col gap-2'>
            <h2 className='text-xl font-bold'>Add New Patient</h2>
          </article>
          <form className='flex flex-1 flex-col gap-4' onSubmit={handleSubmit(handleOnSubmit)}>
            <SearchForm
              isLoading={isLoading}
              actions={[
                {
                  title: 'Add patient',
                  handleClick: handleClickAction,
                  props: { className: 'btn-primary text-white font-bold' }
                }
              ]}
              handleChoosePatient={handleChoosePatient}
              form={{
                register,
                name: 'keyword',
                errorMessage: errors.keyword?.message
              }}
              searchData={searchData?.data.data}
            />
          </form>
        </motion.div>
      )}
      <AddExamination
        patientId={currentPatient?.id}
        handleCloseModal={handleCloseModal}
        handleScrollTopModal={handleScrollTopModal}
        handleReset={handleReset}
        patientName={currentPatient?.fullName || ''}
        steps={{ previousStep, handleSetPreviousStep, currentStep, handleSetCurrentStep }}
      />
    </div>
  )
}
