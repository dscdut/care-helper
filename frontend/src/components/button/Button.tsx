import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
  loading?: boolean
  loadingClass?: string
  Icon?: IconType
  iconClass?: string
}

export default function Button({
  loading = false,
  loadingClass,
  title,
  className,
  Icon,
  iconClass,
  ...rest
}: ButtonProps & ({ title: string } | { Icon: IconType })) {
  if (loading)
    return (
      <button className={twMerge('btn', className)} {...rest}>
        {<span className={twMerge('loading loading-spinner', loadingClass)}></span>}
        {title}
      </button>
    )
  return (
    <button className={twMerge('btn', className)} {...rest}>
      {Icon && <Icon className={twMerge('h-6 w-6', iconClass)} />}
      {title}
    </button>
  )
}
