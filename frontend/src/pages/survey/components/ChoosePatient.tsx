import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import patientApi from 'src/apis/patient.api'
import { motion } from 'framer-motion'
import Loading from 'src/components/loading/Loading'
import { SearchSchema, searchSchema } from 'src/utils/rules'
import SearchForm from 'src/components/form/SearchForm'
import { PatientOfDoctor } from 'src/types/users.type'
import { useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'

interface ChoosePatientProps {
  onNext: () => void
  onSelectPatient: (patientId: number) => void
}

const defaultValues: SearchSchema = {
  keyword: ''
}

export default function ChoosePatient({ onNext, onSelectPatient }: ChoosePatientProps) {
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
  const [isSearching, setIsSearching] = useState<boolean>(false)
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

  const handleClickAction = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, patient: PatientOfDoctor) => {
    onSelectPatient(patient.id)
    event.stopPropagation()
    onNext()
  }

  const handleChoosePatient = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, patient: PatientOfDoctor) => {
    navigate(`${path.patients}/${patient.id}`)
  }

  const handleOnSubmit: SubmitHandler<SearchSchema> = (data) => {
    setIsSearching(true)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='flex flex-1 flex-col'>
      <motion.div
        className='flex flex-1 flex-col gap-8'
        initial={{ x: '-50%', opacity: 0 }}
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
    </div>
  )
}
