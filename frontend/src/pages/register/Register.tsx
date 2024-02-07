import { yupResolver } from '@hookform/resolvers/yup'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import Input from 'src/components/input/Input'
import { path } from 'src/constants/path'
import { AuthErrorResponse, RegisterReqBody } from 'src/types/auth.type'
import { Schema, schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

export interface RegisterProps {}

type SchemaRegister = Schema
const schemaRegister = schema

export default function Register(props: RegisterProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<SchemaRegister>({
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: ''
    },
    resolver: yupResolver(schemaRegister)
  })
  const checkboxRef = useRef<HTMLInputElement | null>(null)
  const registerMutation = useMutation({
    mutationFn: (body: RegisterReqBody) => authApi.register(body),
    onSuccess: (data) => {
      toast.success(data.data.message, {
        progressClassName: 'bg-primary'
      })
      navigate(`${path.auth}/${path.login}`)
    },
    onError: (error) => {
      if (isAxiosUnprocessableEntityError<AuthErrorResponse>(error)) {
        const formError = error.response?.data.detail
        if (formError && formError.length > 0) {
          formError.forEach((error) => {
            setError(error.type as keyof SchemaRegister, {
              message: error.message,
              type: 'Server'
            })
          })
        }
      }
    }
  })
  const navigate = useNavigate()
  const onSubmit = (data: SchemaRegister) => {
    if (!checkboxRef.current?.checked) {
      return toast.error('Please, I agree with Terms and Privacy')
    }
    const body: RegisterReqBody = {
      email: data.email,
      password: data.password,
      phone: data.phone,
      fullName: data.firstName + ' ' + data.lastName,
      role: 'DOCTOR'
    }
    registerMutation.mutate(body)
  }
  return (
    <article className='mx-auto flex w-full max-w-[450px] flex-col items-center gap-8'>
      <h1 className='text-4xl font-bold'>
        Sign up to Care<span className='text-primary'>Helper</span>
      </h1>
      <div className='w-full'>
        <form className='flex flex-col gap-1' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center justify-between gap-4'>
            <Input<Pick<SchemaRegister, 'firstName'>>
              register={register}
              name='firstName'
              placeholder='First Name'
              errorMessage={errors.firstName?.message}
              containerClass='w-1/2'
            />
            <Input<Pick<SchemaRegister, 'lastName'>>
              register={register}
              name='lastName'
              placeholder='Last Name'
              errorMessage={errors.lastName?.message}
              containerClass='w-1/2'
            />
          </div>
          <Input<Pick<SchemaRegister, 'email'>>
            register={register}
            name='email'
            placeholder='Email'
            errorMessage={errors.email?.message}
          />
          <Input<Pick<SchemaRegister, 'phone'>>
            register={register}
            name='phone'
            placeholder='Phone'
            errorMessage={errors.phone?.message}
          />

          <Input<Pick<SchemaRegister, 'password'>>
            register={register}
            name='password'
            placeholder='Password'
            type='password'
            errorMessage={errors.password?.message}
          />
          <Input<Pick<SchemaRegister, 'confirmPassword'>>
            register={register}
            name='confirmPassword'
            placeholder='Confirm Password'
            type='password'
            errorMessage={errors.confirmPassword?.message}
          />
          <div className='flex items-center justify-center'>
            <label className='label cursor-pointer gap-2'>
              <input ref={checkboxRef} type='checkbox' className='checkbox-primary checkbox checkbox-sm border-black' />
              <span className='label-text'>
                I agree with <span className='font-semibold text-primary underline'>Terms</span> and{' '}
                <span className='font-semibold text-primary underline'>Privacy</span>
              </span>
            </label>
          </div>
          <button className='btn btn-primary mt-8 w-full text-white'>Sign Up</button>
        </form>
      </div>
      <div className='divider mt-4'>or</div>
      <p>
        Already have an account?{' '}
        <Link to={`${path.auth}/${path.login}`} className='font-semibold underline'>
          Sign in
        </Link>
      </p>
    </article>
  )
}
