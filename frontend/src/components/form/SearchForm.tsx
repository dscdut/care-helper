import { Fragment } from 'react'
import { UseFormRegister } from 'react-hook-form'
import Button from 'src/components/button/Button'
import { searchNoData } from 'src/assets/images'
import Input from 'src/components/input/Input'
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2'
import Loading from 'src/components/loading/Loading'
import { PatientOfDoctor } from 'src/types/users.type'

export interface SearchFormProps {
  searchData: PatientOfDoctor[] | undefined
  form: {
    register: UseFormRegister<any>
    name: string
    errorMessage?: string
  }
  isLoading: boolean
  handleChoosePatient: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, patient: PatientOfDoctor) => void
  actions?: [
    {
      title: string
      handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, patient: PatientOfDoctor) => void
      props?: React.ButtonHTMLAttributes<HTMLButtonElement>
    }
  ]
}

export default function SearchForm({
  searchData,
  form: { register, name, errorMessage },
  isLoading,
  handleChoosePatient,
  actions
}: SearchFormProps) {
  const renderBodySearch = () => {
    if (!searchData) {
      return null
    }
    if (searchData.length > 0) {
      return searchData.map((patient) => (
        <div
          key={patient.id}
          className='card card-side max-w-[30%] cursor-pointer bg-bg_primary shadow-xl'
          onClick={(event) => handleChoosePatient(event, patient)}
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
            {actions && actions.length > 0 && (
              <div className='card-actions justify-end'>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    title={action.title}
                    onClick={(event) => action.handleClick(event, patient)}
                    {...action.props}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ))
    }
    return (
      <img src={searchNoData} alt='Search no data' className='mx-auto mt-16 h-72 w-72 object-cover object-center' />
    )
  }

  return (
    <Fragment>
      <div className='flex flex-1 flex-col gap-8'>
        <section className='card bg-bg_primary shadow'>
          <div className='card-body gap-6 p-6'>
            <h2 className='card-title text-base font-bold'>Search patient</h2>
            <div className='flex gap-4'>
              <Input
                register={register}
                name={name}
                placeholder='Search...'
                containerClass='flex-1'
                errorMessage={errorMessage}
              />
              <Button
                title='Search'
                type='submit'
                className='btn-primary font-bold text-white'
                Icon={HiOutlineMagnifyingGlass}
              />
            </div>
          </div>
        </section>
        {isLoading && <Loading containerClass='h-[unset] flex-1' />}
        <section className='flex flex-wrap gap-6'>{renderBodySearch()}</section>
      </div>
    </Fragment>
  )
}
