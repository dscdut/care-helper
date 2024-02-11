import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HiMagnifyingGlass, HiMiniPlus, HiXMark } from 'react-icons/hi2'
import classNames from 'classnames'
import { path } from 'src/constants/path'
import { patients } from 'src/data/patient'
import ChoosePatient from './components/ChoosePatient'
import AddQuestions from './components/AddQuestions'
import Pagination from 'src/components/pagination/Pagination'

export default function Survey() {
  const [showChoosePatient, setShowChoosePatient] = useState(true)
  const [showAddQuestions, setShowAddQuestions] = useState(false)
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const idPatient = location.search.split('?')[1]
    if (idPatient !== null) {
      const patientSearch = patients.find((patient) => patient.id === parseInt(idPatient))
      setSearch(patientSearch?.name.toLowerCase() || '')
    }
  }, [location.search])

  const handleNavigateSurvey = ([idPatient, idSurvey]: number[]) => {
    navigate(`${path.surveys}/${idSurvey}${path.patients}/${idPatient}`)
  }

  const handleNext = () => {
    setShowChoosePatient(false)
    setShowAddQuestions(true)
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

  return (
    <article className='flex w-full flex-col gap-4 p-4 lg:p-8'>
      <section className='flex w-full items-start justify-between'>
        <h1 className='self-center text-2xl font-bold'>Khảo sát gần nhất</h1>
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
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className='input input-bordered !h-11 w-full !rounded-xl border-2 ps-10 hover:border-primary focus:border-primary focus:outline-none'
                placeholder='Tìm khảo sát theo bệnh nhân...'
              />
            </div>
          </form>
          <div>
            <button className='btn btn-primary w-max text-white' onClick={handleAdd}>
              <HiMiniPlus className='h-6 w-6' />
              <p> Thêm khảo sát mới</p>
            </button>
            {show && (
              <dialog id='add_survey' className=' modal bg-[#000000ba]' open>
                <div className='modal-box col-span-2 h-5/6 max-w-screen-lg'>
                  <div className=' flex items-center justify-between'>
                    <div>
                      <h3 className='text-lg font-bold'>Khảo sát mới</h3>
                    </div>
                    <button className='btn btn-circle ' onClick={() => setShow(false)}>
                      <HiXMark className='text-lg' />
                    </button>
                  </div>
                  {showChoosePatient && <ChoosePatient onNext={handleNext} />}
                  {showAddQuestions && <AddQuestions onClose={handleCloseAllModals} />}
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
                <th>Diagnose</th>
              </tr>
            </thead>
            <tbody>
              {patients
                .filter((item) => {
                  return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
                })
                .map((patient) => (
                  <tr
                    className='hover cursor-pointer'
                    key={patient.id}
                    onClick={() => handleNavigateSurvey([patient.id, patient.survey.id])}
                  >
                    <td>{patient.name}</td>
                    <td>
                      <div
                        className={classNames('btn-active w-fit rounded-xl px-20 py-2', {
                          'btn-primary  text-white ': patient.survey.status === 'Waiting'
                        })}
                      >
                        {patient.survey.status}
                      </div>
                    </td>
                    <td>{patient.survey.date}</td>
                    <td>{patient.survey.diagnose}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className='mt-2 flex items-center justify-end'>
          <Pagination />
        </div>
      </section>
    </article>
  )
}
