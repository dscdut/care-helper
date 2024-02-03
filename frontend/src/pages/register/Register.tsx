import { yupResolver } from '@hookform/resolvers/yup'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import Input from 'src/components/input/Input'
import { AUTH_MESSAGES } from 'src/constants/message'
import { path } from 'src/constants/path'
import { AuthErrorResponse, RegisterReqBody } from 'src/types/auth.type'
import { AuthSchema, authSchema } from 'src/utils/rules'
import { isAxiosError, isAxiosUnprocessableEntityError } from 'src/utils/utils'

export interface RegisterProps {}

type SchemaRegister = AuthSchema
const schemaRegister = authSchema

export default function Register(props: RegisterProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SchemaRegister>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
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
      navigate(path.login)
    },
    onError: (error) => {
      if (isAxiosError<AuthErrorResponse>(error)) {
        toast.error(error.response?.data.message)
      }
    }
  })
  const navigate = useNavigate()
  const onSubmit = (data: SchemaRegister) => {
    if (!checkboxRef.current?.checked) {
      return toast.error(AUTH_MESSAGES.AGREE_PRIVACY)
    }
    const body: RegisterReqBody = {
      email: data.email,
      password: data.password
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
          <Input<Pick<SchemaRegister, 'email'>>
            register={register}
            name='email'
            placeholder='Email'
            errorMessage={errors.email?.message}
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
        <Link to={path.login} className='font-semibold underline'>
          Sign in
        </Link>
      </p>
    </article>
  )
}
