import { twMerge } from 'tailwind-merge'

export interface LoadingProps {
  containerClass?: string
  loadingClass?: string
}

export default function Loading({ containerClass, loadingClass }: LoadingProps) {
  return (
    <div className={twMerge('flex h-[calc(100vh_-_16.6rem)] w-full items-center justify-center', containerClass)}>
      <span className={twMerge('loading loading-spinner loading-lg text-primary', loadingClass)}></span>
    </div>
  )
}
