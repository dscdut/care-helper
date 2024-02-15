export interface ModalProps {
  children: React.ReactNode
  modalRef: React.MutableRefObject<HTMLDialogElement | null>
}

export default function Modal({ children, modalRef }: ModalProps) {
  return (
    <dialog ref={modalRef} className='modal' id='dialog1'>
      <div className='modal-box flex min-h-[90vh] max-w-[80%] flex-col gap-4 overflow-y-auto overflow-x-hidden p-8'>
        <form method='dialog'>
          <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>✕</button>
        </form>
        {children}
      </div>
      <form method='dialog' className='modal-backdrop'>
        <button>close</button>
      </form>
    </dialog>
  )
}
