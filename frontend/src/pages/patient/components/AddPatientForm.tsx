import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import Button from 'src/components/button/Button'
import Input from 'src/components/input/Input'
import { SearchSchema, searchSchema } from 'src/utils/rules'
import { motion } from 'framer-motion'
import { AddExamination } from 'src/pages/patient/components/examinations/components'
import { useQuery, useQueryClient } from 'react-query'
import patientApi from 'src/apis/patient.api'
import Loading from 'src/components/loading/Loading'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import { searchNoData } from 'src/assets/images'

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
  const handleChoosePatient = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation()
    setPreviousStep(currentStep)
    setCurrentStep((step) => step + 1)
  }
  const handleSeenDetailsPatient = (patientId: number) => {
    navigate(`${path.patients}/${patientId}`)
  }
  const handleReset = () => {
    reset()
    queryClient.invalidateQueries(['myPatients'])
  }

  const renderBodySearch = () => {
    if (searchData?.data) {
      if (searchData.data.data.length > 0) {
        return searchData?.data.data.map((patient) => (
          <div
            key={patient.id}
            className='card card-side max-w-[30%] cursor-pointer bg-bg_primary shadow-xl'
            onClick={() => handleSeenDetailsPatient(patient.id)}
            aria-hidden={true}
          >
            <div className='card-body gap-4 p-6'>
              <h2 className='card-title font-bold'>Patient</h2>
              <article className='flex flex-col items-start gap-2'>
                <p>
                  Name: <span className='font-bold'>{patient.fullName}</span>
                </p>
                <p>
                  Phone Number: <span className='font-bold'>{patient.phone}</span>
                </p>
              </article>
              <div className='card-actions justify-end'>
                <Button
                  title='Add patient'
                  onClick={handleChoosePatient}
                  className='btn-primary font-bold text-white'
                />
              </div>
            </div>
          </div>
        ))
      } else {
        return (
          <img src={searchNoData} alt='Search no data' className='mx-auto mt-16 h-72 w-72 object-cover object-center' />
        )
      }
    } else {
      return null
    }
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
          <div className='flex flex-1 flex-col gap-8'>
            <section className='card bg-bg_primary shadow'>
              <div className='card-body gap-6 p-6'>
                <h2 className='card-title text-base font-bold'>Search patient</h2>
                <form className='flex gap-4' onSubmit={handleSubmit(handleOnSubmit)}>
                  <Input
                    register={register}
                    name='keyword'
                    placeholder='Search...'
                    containerClass='flex-1'
                    errorMessage={errors.keyword?.message}
                  />
                  <Button title='Search' className='btn-primary font-bold text-white' Icon={HiOutlineMagnifyingGlass} />
                </form>
              </div>
            </section>
            {isLoading && <Loading containerClass='h-[unset] flex-1' />}
            <section className='flex flex-wrap gap-6'>{renderBodySearch()}</section>
          </div>
        </motion.div>
      )}
      <AddExamination
        patientId={searchData?.data.data[0]?.id}
        handleCloseModal={handleCloseModal}
        handleScrollTopModal={handleScrollTopModal}
        handleReset={handleReset}
        patientName={searchData?.data.data[0]?.fullName || ''}
        steps={{ previousStep, handleSetPreviousStep, currentStep, handleSetCurrentStep }}
      />
    </div>
  )
}
