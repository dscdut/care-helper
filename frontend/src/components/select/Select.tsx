import { FieldPath, FieldValues, UseFormRegister } from 'react-hook-form'
import { SelectOption } from 'src/types/utils.type'
import { twMerge } from 'tailwind-merge'

export interface SelectProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLSelectElement> {
  selectClass?: string
  errorMessageClass?: string
  containerClass?: string
  register: UseFormRegister<T> | ((name: FieldPath<T>, options?: { shouldUnregister?: boolean }) => void)
  name: FieldPath<T>
  errorMessage?: string
  options: SelectOption[]
}

export default function Select<T extends FieldValues>({
  register,
  name,
  errorMessage,
  errorMessageClass,
  selectClass,
  containerClass,
  options,
  ...rest
}: SelectProps<T>) {
  return (
    <div className={containerClass}>
      <select
        className={twMerge(
          'select select-bordered w-full text-base hover:border-primary focus:border-primary focus:outline-none',
          selectClass
        )}
        {...register(name)}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <div className={twMerge('mt-1 min-h-[1.25rem] text-sm text-red-600', errorMessageClass)}>{errorMessage}</div>
      )}
    </div>
  )
}
