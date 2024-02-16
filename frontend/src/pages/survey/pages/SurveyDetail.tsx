import { useEffect, useState } from 'react'
import { HiMiniChevronDoubleDown } from 'react-icons/hi2'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import surveyApi from 'src/apis/survey.api'
import Loading from 'src/components/loading/Loading'
import { AnswersSurvey, SurveyData } from 'src/types/survey.type'
import { formatDate } from 'src/utils/utils'

export default function SurveyDetail() {
  const { id } = useParams()
  const [surveyDetail, setSurveyDetail] = useState<SurveyData | any>(undefined)

  useEffect(() => {
    if (id !== undefined) {
      const surveyId = parseInt(id, 10)

      surveyApi
        .getSurveyDetail(surveyId)
        .then((response) => {
          setSurveyDetail(response?.data)
        })
        .catch((error) => {
          toast.error('Error fetching survey detail:', error)
        })
    }
  }, [id])

  if (!surveyDetail) {
    return <Loading />
  }

  const surveyAnswers: AnswersSurvey[] = JSON.parse(surveyDetail.form)

  return (
    <article className='flex w-full flex-col gap-8 p-4 lg:p-8'>
      <article>
        <h1 className='text-2xl'>
          Bệnh nhân <span className='font-bold'>{surveyDetail.patient.fullName}</span>
        </h1>
        <h2>
          Khảo sát ngày <span className='font-bold'>{formatDate(surveyDetail.createdAt as string, 'DD/MM/YYYY')}</span>
        </h2>
      </article>
      <div>
        {surveyAnswers?.map((detail, index) => (
          <details key={index} className='collapse mt-4 bg-base-200'>
            <summary className='collapse-title !flex items-center bg-slate-600 font-medium text-white'>
              <div className='w-1/10 border-r-4 pr-2 font-bold'>
                <p>Câu {index + 1}</p>
              </div>
              <div className='w-9/10 ml-2 flex-1 '>
                <p>{detail.question}</p>
              </div>
              <div>
                <HiMiniChevronDoubleDown />
              </div>
            </summary>
            <div className='collapse-content bg-gray-900 p-4 text-white'>{detail.answer && <p>{detail.answer}</p>}</div>
          </details>
        ))}
      </div>
    </article>
  )
}
