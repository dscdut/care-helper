import { useState } from 'react'
import { HiTrash } from 'react-icons/hi2'
import { questions } from 'src/data/survey'

interface Question {
  id: number
  content: string
}

interface AddQuestionsProps {
  onClose: () => void
  onBack: () => void
}

export default function AddQuestions({ onClose, onBack }: AddQuestionsProps) {
  const [question, setQuestion] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [listQuestions, setListQuestions] = useState<Question[]>(questions)

  const handleSubmit = () => {
    const newQuestion: Question = { id: listQuestions.length + 1, content: question }
    setListQuestions((prevQuestions) => [...prevQuestions, newQuestion])
    setIsOpen(false)
    setQuestion('')
  }

  const handleNext = () => {
    setIsOpen(true)
  }

  const handleConfirm = () => {
    onClose()
  }

  const handleTrash = (id: number) => {
    setListQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id))
    setIsOpen(false)
  }

  const handleBack = () => {
    onBack()
  }

  const renderFooter = () => (
    <div className={`flex justify-${isOpen ? 'between items-center' : 'end'}`}>
      {isOpen ? (
        <p className='text-sm'>
          <span className='font-semibold'>Note:</span> Please ensure thorough examination before proceeding. The survey
          will be promptly sent to the patient immediately upon confirmation.
        </p>
      ) : null}
      {!isOpen && (
        <button className='btn mr-4 bg-primary text-white' onClick={handleBack}>
          Back
        </button>
      )}
      <button className='btn bg-primary text-white' onClick={isOpen ? handleConfirm : handleNext}>
        {isOpen ? 'Confirm' : 'Next'}
      </button>
    </div>
  )

  return (
    <div>
      <p className='font-semibold'>Bệnh nhân Nguyễn Văn A</p>
      <div className='flex items-center'>
        <input
          className='input input-bordered !h-11 w-full !rounded-xl border-2 ps-10 hover:border-primary focus:border-primary focus:outline-none'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button className='btn ml-4 bg-primary text-white' onClick={handleSubmit}>
          Add
        </button>
      </div>
      <div className='my-4 max-h-80 overflow-y-scroll'>
        <ul className='menu mt-4 w-[inherit] rounded-box bg-base-200'>
          {listQuestions.map((q) => (
            <details key={q.id} className='collapse mt-4 bg-base-200'>
              <summary className='collapse-title !flex items-center bg-slate-600 font-medium text-white'>
                <div className='w-1/10 border-r-4 pr-2 font-bold'>
                  <p>Câu {q.id}</p>
                </div>
                <div className='w-9/10 ml-2 flex-1 '>
                  <p>{q.content}</p>
                </div>
                <div>
                  <HiTrash onClick={() => handleTrash(q.id)} />
                </div>
              </summary>
            </details>
          ))}
        </ul>
      </div>
      {renderFooter()}
    </div>
  )
}
