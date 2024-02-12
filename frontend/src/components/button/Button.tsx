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
}: ButtonProps) {
  return (
    <button className={twMerge('btn', className)} {...rest}>
      {Icon && !loading && <Icon className={twMerge('h-6 w-6', iconClass)} />}
      {loading && <span className={twMerge('loading loading-spinner', loadingClass)}></span>} {title}
    </button>
  )
}
