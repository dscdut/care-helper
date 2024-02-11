import { HiMiniChevronDoubleDown } from 'react-icons/hi2'
import { answersSurvey } from 'src/data/survey'

export default function SurveyDetail() {
  return (
    <article className='flex w-full flex-col gap-8 p-4 lg:p-8'>
      <article>
        <h1 className='text-2xl'>
          Bệnh nhân <span className='font-bold'>Nguyễn Văn A</span>
        </h1>
        <h2>
          Khảo sát ngày <span className='font-bold'>03/09/2010</span>
        </h2>
      </article>
      <div>
        {answersSurvey.map((answer) => (
          <details key={answer.id} className='collapse mt-4 bg-base-200'>
            <summary className='collapse-title !flex items-center bg-slate-600 font-medium text-white'>
              <div className='w-1/10 border-r-4 pr-2 font-bold'>
                <p>Câu {answer.id + 1}</p>
              </div>
              <div className='w-9/10 ml-2 flex-1 '>
                <p>{answer.question}</p>
              </div>
              <div>
                <HiMiniChevronDoubleDown />
              </div>
            </summary>
            <div className='collapse-content bg-gray-900 p-4 text-white'>
              <p>{answer.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </article>
  )
}
