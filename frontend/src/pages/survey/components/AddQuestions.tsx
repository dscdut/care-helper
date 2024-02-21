import { useState } from 'react'
import { HiTrash } from 'react-icons/hi2'
import { questionsSurvey } from 'src/data/survey'
import { QuestionsSurvey } from 'src/types/survey.type'

interface AddQuestionsProps {
  onClose: () => void
  onBack: () => void
  onConfirm: (listQuestions: QuestionsSurvey[]) => void
}

export default function AddQuestions({ onClose, onBack, onConfirm }: AddQuestionsProps) {
  const [question, setQuestion] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [listQuestions, setListQuestions] = useState<QuestionsSurvey[]>(questionsSurvey)

  const handleSubmit = () => {
    const newQuestion: QuestionsSurvey = { id: listQuestions.length + 1, question: question }
    setListQuestions((prevQuestions) => [...prevQuestions, newQuestion])
    setIsOpen(false)
    setQuestion('')
  }

  const handleNext = () => {
    setIsOpen(true)
  }

  const handleConfirm = () => {
    onConfirm(listQuestions)
    onClose()
  }

  const handleTrash = (id: number) => {
    setListQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id))
    setIsOpen(false)
  }

  const handleBack = () => {
    onBack()
  }

  const renderFooter = () => {
    if (isOpen) {
      return (
        <div className={`flex items-center justify-between`}>
          <p className='text-sm'>
            <span className='font-semibold'>Note:</span> Please ensure thorough examination before proceeding. The
            survey will be promptly sent to the patient immediately upon confirmation.
          </p>
          <button className='btn bg-primary text-white' onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      )
    }
    return (
      <div className={`flex justify-end`}>
        <button className='btn mr-4 bg-primary text-white' onClick={handleBack}>
          Back
        </button>
        <button className='btn bg-primary text-white' onClick={handleNext}>
          Next
        </button>
      </div>
    )
  }

  return (
    <div>
      <p className='font-semibold'>Questions</p>
      <div className='flex items-center'>
        <input
          className='input input-bordered !h-11 w-full !rounded-xl border-2 ps-10 hover:border-primary focus:border-primary focus:outline-none'
          value={question}
          placeholder='Add Question...'
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button className='btn ml-4 bg-primary text-white' onClick={handleSubmit}>
          Add
        </button>
      </div>
      <div className='my-4 max-h-80 overflow-y-scroll'>
        <ul className='menu mt-4 w-[inherit] rounded-box bg-base-200'>
          {listQuestions.map((q, index) => (
            <details key={q.id} className='collapse mt-4 bg-base-200'>
              <summary className='collapse-title !flex items-center bg-slate-600 font-medium text-white'>
                <div className='w-1/10 border-r-4 pr-2 font-bold'>
                  <p>Question {index + 1}</p>
                </div>
                <div className='w-9/10 ml-2 flex-1 '>
                  <p>{q.question}</p>
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
