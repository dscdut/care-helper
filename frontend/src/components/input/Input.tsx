import { UseFormRegister, FieldValues, FieldPath } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

export interface InputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClass?: string
  errorMessageClass?: string
  containerClass?: string
  register: UseFormRegister<T> | ((name: FieldPath<T>, options?: { shouldUnregister?: boolean }) => void)
  name: FieldPath<T>
  errorMessage?: string
}

export default function Input<T extends FieldValues>({
  register,
  name,
  errorMessage,
  errorMessageClass,
  inputClass,
  containerClass,
  ...rest
}: InputProps<T>) {
  return (
    <div className={containerClass}>
      <input
        type='text'
        placeholder='Type here'
        className={twMerge(
          'input input-bordered w-full disabled:!input-bordered hover:border-primary focus:border-primary focus:outline-none',
          inputClass
        )}
        {...register(name)}
        {...rest}
      />
      {errorMessage && (
        <div className={twMerge('mt-1 min-h-[1.25rem] text-sm text-red-600', errorMessageClass)}>{errorMessage}</div>
      )}
    </div>
  )
}
