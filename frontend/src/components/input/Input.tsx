import { UseFormRegister, FieldValues, FieldPath } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export interface InputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
  register: UseFormRegister<T> | ((name: FieldPath<T>, options?: { shouldUnregister?: boolean }) => void)
  name: FieldPath<T>
  errorMessage?: string
}

export default function Input<T extends FieldValues>({
  register,
  name,
  errorMessage,
  classNameError,
  classNameInput,
  className
}: InputProps<T>) {
  return (
    <div className={className}>
      <input
        type='text'
        placeholder='Type here'
        className={twMerge('input input-bordered w-full max-w-xs focus:outline-none', classNameInput)}
        {...register(name)}
      />
      <div className={twMerge('mt-1 min-h-[1.25rem] text-sm text-red-600', classNameError)}>{errorMessage}</div>
    </div>
  )
}
