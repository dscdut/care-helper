import { useForm } from 'react-hook-form'
import { AuthSchema, authSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/input/Input'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { path } from 'src/constants/path'
import { useMutation } from 'react-query'
import { AuthErrorResponse, LoginReqBody } from 'src/types/auth.type'
import authApi from 'src/apis/auth.api'
import { useContext } from 'react'
import { AppContext, AppContextType } from 'src/contexts/app.context'
import { AUTH_FIELD_NAME } from 'src/constants/common'
import { AUTH_MESSAGES } from 'src/constants/message'
import { isAxiosError } from 'src/utils/utils'

export interface LoginProps {}

type SchemaLogin = Omit<AuthSchema, typeof AUTH_FIELD_NAME.confirmPassword>
const schemaLogin = authSchema.omit([AUTH_FIELD_NAME.confirmPassword])

export default function Login(props: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SchemaLogin>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: yupResolver(schemaLogin)
  })
  const { setIsAuthenticated } = useContext<AppContextType>(AppContext)
  const loginMutation = useMutation({
    mutationFn: (body: LoginReqBody) => authApi.login(body),
    onSuccess: (data) => {
      toast.success(AUTH_MESSAGES.LOGIN_SUCCESS, {
        progressClassName: 'bg-primary'
      })
      setIsAuthenticated(true)
      navigate(path.home)
    },
    onError: (error) => {
      if (isAxiosError<AuthErrorResponse>(error)) {
        toast.error(error.response?.data.message)
      }
    }
  })
  const navigate = useNavigate()
  const onSubmit = (data: SchemaLogin) => {
    loginMutation.mutate(data)
  }
  return (
    <article className='mx-auto flex w-full max-w-[450px] flex-col items-center gap-8'>
      <h1 className='text-4xl font-bold'>
        Sign in to Care<span className='text-primary'>Helper</span>
      </h1>
      <div className='w-full'>
        <form className='flex flex-col gap-1' onSubmit={handleSubmit(onSubmit)}>
          <Input<Pick<AuthSchema, 'email'>>
            register={register}
            name='email'
            placeholder='Email'
            errorMessage={errors.email?.message}
          />
          <Input<Pick<AuthSchema, 'password'>>
            register={register}
            name='password'
            placeholder='Password'
            type='password'
            errorMessage={errors.password?.message}
          />
          <div className='text-right'>
            <Link to={path.home} className='font-semibold text-primary underline'>
              Forgot password?
            </Link>
          </div>
          <button className='btn btn-primary mt-8 w-full text-white'>Sign In</button>
        </form>
      </div>
      <div className='divider mt-4'>or</div>
      <p>
        Don&apos;t have an account?{' '}
        <Link to={path.register} className='font-semibold underline'>
          Sign up
        </Link>
      </p>
    </article>
  )
}
