import { twMerge } from 'tailwind-merge'
export interface ModalProps {
  children: React.ReactNode
  modalRef: React.MutableRefObject<HTMLDialogElement | null>
  containerClass?: string
  closeBtnClass?: string
}

export default function Modal({ children, modalRef, containerClass, closeBtnClass }: ModalProps) {
  return (
    <dialog ref={modalRef} className={twMerge('modal', containerClass)}>
      <div
        className='modal-box flex min-h-[90vh] max-w-[80%] flex-col gap-4 overflow-y-auto overflow-x-hidden p-8'
        id='modal-box'
      >
        <form method='dialog'>
          <button className={twMerge('btn btn-circle btn-ghost btn-sm absolute right-2 top-2', closeBtnClass)}>
            ✕
          </button>
        </form>
        {children}
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  )
}
