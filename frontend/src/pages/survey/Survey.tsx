import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiMagnifyingGlass, HiMiniPlus, HiXMark } from 'react-icons/hi2'
import classNames from 'classnames'
import { path } from 'src/constants/path'
import { ChoosePatient, AddQuestions } from 'src/pages/survey/components'
import Pagination from 'src/components/pagination/Pagination'
import { useQuery } from 'react-query'
import surveyApi from 'src/apis/survey.api'
import Loading from 'src/components/loading/Loading'
import { formatDate } from 'src/utils/utils'
import { AnswersSurvey, QuestionsSurvey, SurveyPost } from 'src/types/survey.type'
import { toast } from 'react-toastify'
import { SURVEY_ACTION_MESSAGE } from 'src/constants/messages'

export default function Survey() {
  const [showChoosePatient, setShowChoosePatient] = useState(true)
  const [showAddQuestions, setShowAddQuestions] = useState(false)
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [show, setShow] = useState(false)
  const navigate = useNavigate()

  const { data: doctorSurveysData, isLoading } = useQuery({
    queryKey: ['doctorSurveys'],
    queryFn: () => surveyApi.getDoctorSurveys()
  })

  const handleNavigateSurvey = (id: number) => {
    navigate(`${path.surveys}/${id}`)
  }

  const handleNext = () => {
    setShowChoosePatient(false)
    setShowAddQuestions(true)
  }

  const handleBack = () => {
    setShowChoosePatient(true)
    setShowAddQuestions(false)
  }

  const handleCloseAllModals = () => {
    setShowChoosePatient(false)
    setShowAddQuestions(false)
    setShow(false)
  }

  const handleAdd = () => {
    setShow(true)
    setShowChoosePatient(true)
    setShowAddQuestions(false)
  }

  const handleSelectPatient = (patientId: number) => {
    setSelectedPatientId(patientId)
  }

  const handleConfirmQuestions = (questions: QuestionsSurvey[]) => {
    const data: AnswersSurvey[] = questions.map((question) => ({
      id: question.id,
      question: question.question,
      answer: ''
    }))

    if (selectedPatientId && questions.length > 0) {
      const postSurveyData: SurveyPost = {
        form: JSON.stringify(data),
        patientId: selectedPatientId
      }
      surveyApi
        .postSurvey(postSurveyData)
        .then((response) => {
          handleCloseAllModals()
          window.location.reload()
          toast.success(SURVEY_ACTION_MESSAGE.ADD_SUCCESS)
        })
        .catch((error) => {
          toast.error(error.message)
        })
    }
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <article className='flex w-full flex-col gap-4 p-4 lg:p-8'>
      <section className='flex w-full items-start justify-between'>
        <h1 className='self-center text-2xl font-bold'>Recent survey list</h1>
      </section>
      <section className='rounded-lg bg-white p-4 shadow-lg'>
        <div className='navbar-center flex flex-[30%]'>
          <form className='flex w-full'>
            <div className='relative mr-8 w-[inherit]'>
              <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
                <HiMagnifyingGlass className='h-5 w-5' />
              </div>
              <input
                type='text'
                className='input input-bordered !h-11 w-full !rounded-xl border-2 ps-10 hover:border-primary focus:border-primary focus:outline-none'
                placeholder='Search patient...'
              />
            </div>
          </form>
          <div>
            <button className='btn btn-primary w-max text-white' onClick={handleAdd}>
              <HiMiniPlus className='h-6 w-6' />
              <p>Add New Survey</p>
            </button>
            {show && (
              <dialog id='add_survey' className=' modal bg-[#000000ba]' open>
                <div className='modal-box col-span-2 h-5/6 max-w-[80%]'>
                  <div className=' flex items-center justify-between'>
                    <div>
                      <h3 className='text-lg font-bold'>New Survey</h3>
                    </div>
                    <button className='btn btn-circle ' onClick={() => setShow(false)}>
                      <HiXMark className='text-lg' />
                    </button>
                  </div>
                  {showChoosePatient && <ChoosePatient onNext={handleNext} onSelectPatient={handleSelectPatient} />}
                  {showAddQuestions && (
                    <AddQuestions
                      onClose={handleCloseAllModals}
                      onBack={handleBack}
                      onConfirm={handleConfirmQuestions}
                    />
                  )}
                </div>
              </dialog>
            )}
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className='table'>
            <thead>
              <tr className='border-primary text-sm'>
                <th>Name</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {doctorSurveysData?.data.data.map((survey) => (
                <tr className='hover cursor-pointer' key={survey.id} onClick={() => handleNavigateSurvey(survey.id)}>
                  <td>{survey.patient.fullName}</td>
                  <td>
                    <div
                      className={classNames('btn-active w-fit rounded-xl px-20 py-2', {
                        'btn-primary  text-white ': survey.status === 'Waiting'
                      })}
                    >
                      {survey.status}
                    </div>
                  </td>
                  <td>{formatDate(survey.createdAt as string, 'DD/MM/YYYY')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {doctorSurveysData?.data && doctorSurveysData.data.data.length > 0 && (
          <div className='mt-2 flex items-center justify-end'>
            <Pagination
              totalPages={doctorSurveysData.data.totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </section>
    </article>
  )
}
