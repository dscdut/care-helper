import { useState } from 'react'
import { HiTrash } from 'react-icons/hi2'
import { questions } from 'src/data/survey'

interface Question {
  id: number
  content: string
}

interface AddQuestionsProps {
  onClose: () => void
}

export default function AddQuestions({ onClose }: AddQuestionsProps) {
  const [question, setQuestion] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [listQuestions, setListQuestions] = useState<Question[]>(questions)

  const handleSubmit = () => {
    const newQuestion: Question = { id: listQuestions.length + 1, content: question }
    setListQuestions((prevQuestions) => [...prevQuestions, newQuestion])
    setQuestion('')
  }

  const handleNext = () => {
    setIsOpen(true)
  }

  const handleConfirm = () => {
    console.log('close modal')
    onClose()
  }

  const handleTrash = (id: number) => {
    setListQuestions((prevQuestions) => prevQuestions.filter((q) => q.id !== id))
  }

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
      <div className='mt-4 max-h-80 overflow-y-scroll'>
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
      <div className='mt-4 flex justify-end '>
        {isOpen && (
          <div className='flex self-center rounded-lg bg-slate-300 p-4 text-black'>
            <p>
              <span className='font-bold'>Chú ý:</span> Yêu cầu kiểm tra kĩ khảo sát. Kháo sát sẽ được gửi ngay lặp tức
              cho bệnh nhân ngay sau khi bấm xác nhận
            </p>
            <button className='btn ml-4 bg-primary text-white' onClick={handleConfirm}>
              Xác nhận
            </button>
          </div>
        )}

        {!isOpen && (
          <button className='btn ml-4 bg-primary text-white' onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  )
}
