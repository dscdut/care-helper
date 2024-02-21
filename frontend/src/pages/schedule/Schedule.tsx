import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { CalendarOptions, EventContentArg, EventInput } from '@fullcalendar/core'
import { useEffect, useRef, useState } from 'react'
import Modal from 'src/components/modal/Modal'
import { motion } from 'framer-motion'
import Button from 'src/components/button/Button'
import { HiOutlineCheck, HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineXMark } from 'react-icons/hi2'
import Input from 'src/components/input/Input'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { AppointmentScheduleSchema, appointmentScheduleSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { PatientOfDoctor } from 'src/types/users.type'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import SearchForm from 'src/components/form/SearchForm'
import meetingsApi from 'src/apis/meetings.api'
import Loading from 'src/components/loading/Loading'
import { MeetingReqBody, MeetingReqBodyUpdate } from 'src/types/meetings.type'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import doctorApi from 'src/apis/doctor.api'

dayjs.extend(utc)

const defaultCalendarOptions: CalendarOptions = {
  timeZone: 'UTC',
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  weekends: true,
  eventClassNames: 'border-none bg-transparent',
  eventContent: renderEventContent,
  headerToolbar: {
    center: 'dayGridDay dayGridWeek dayGridMonth',
    end: 'create today prev,next'
  },
  buttonText: {
    today: 'Today',
    dayGridDay: 'Day',
    dayGridWeek: 'Week',
    dayGridMonth: 'Month'
  },
  eventTimeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    meridiem: true
  }
}

const stepsForm: { id: string; name: string | string[] }[] = [
  {
    id: 'Step 1',
    name: 'search.keyword'
  },
  {
    id: 'Step 2',
    name: ['name', 'date', 'startTime', 'endTime', 'location']
  }
]

const defaultValues: AppointmentScheduleSchema = {
  name: '',
  date: '',
  location: '',
  search: {
    keyword: ''
  },
  endTime: '',
  startTime: '',
  note: ''
}

enum CalendarViewType {
  DAY_GRID_DAY = 'dayGridDay',
  DAY_GRID_WEEK = 'dayGridWeek',
  DAY_GRID_MONTH = 'dayGridMonth'
}

export interface AppointmentScheduleProps {}

export default function AppointmentSchedule(props: AppointmentScheduleProps) {
  const [currentPatient, setCurrentPatient] = useState<PatientOfDoctor | null>(null)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [previousStep, setPreviousStep] = useState<number>(0)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [events, setEvents] = useState<EventInput[]>([])
  const calendarRef = useRef<any>(null)
  const modalRef = useRef<HTMLDialogElement>(null)
  const confirmModalRef = useRef<HTMLDialogElement | null>(null)
  const queryClient = useQueryClient()
  const delta = currentStep - previousStep
  const isMonthView = calendarRef.current?.calendar.view.type === CalendarViewType.DAY_GRID_MONTH

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
    control,
    reset,
    setValue
  } = useForm<AppointmentScheduleSchema>({
    resolver: yupResolver(appointmentScheduleSchema),
    defaultValues,
    mode: 'onChange'
  })

  const { isLoading: meetingsLoading } = useQuery({
    queryKey: ['meetings'],
    queryFn: () => meetingsApi.getMeetings(),
    onSuccess: (data) => {
      setEvents(
        data.data.data.map((item) => ({
          title: item.title,
          start: item.startTime,
          end: item.endTime,
          meetingId: item.id,
          location: item.place,
          note: item.note,
          patientName: item.patient.fullname
        }))
      )
    }
  })

  const {
    data: searchData,
    isSuccess,
    isLoading
  } = useQuery({
    queryKey: ['myPatients', getValues('search.keyword')],
    queryFn: () => doctorApi.getMyPatients({ keyword: getValues('search.keyword'), page: 1, size: 1000000 }),
    enabled: isSearching
  })

  useEffect(() => {
    if (isSuccess) {
      setIsSearching(false)
    }
  }, [isSuccess])

  const handleResetForm = () => {
    handleCloseModal()
    handleResetStep()
    reset()
    queryClient.invalidateQueries(['meetings'])
  }

  const createMeetingMutation = useMutation({
    mutationFn: (meetingBody: MeetingReqBody) => meetingsApi.createMeeting(meetingBody),
    onSuccess: () => {
      handleResetForm()
    }
  })
  const updateMeetingMutation = useMutation({
    mutationFn: (meetingBody: MeetingReqBodyUpdate) => meetingsApi.updateMeeting(meetingBody),
    onSuccess: () => {
      handleResetForm()
    }
  })
  const deleteMeetingMutation = useMutation({
    mutationFn: (meetingId: number) => meetingsApi.deleteMeeting(meetingId),
    onSuccess: () => {
      handleResetForm()
    }
  })

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleOnNext()
  }

  const handleOnSubmit: SubmitHandler<AppointmentScheduleSchema> = (data) => {
    const meetingBody: any = {
      startTime: dayjs.utc(`${data.date} ${data.startTime}`, 'YYYY-MM-DD HH:mm').local().toISOString(),
      endTime: dayjs.utc(`${data.date} ${data.endTime}`, 'YYYY-MM-DD HH:mm').local().toISOString(),
      note: data.note || ' ',
      place: data.location,
      title: data.name
    }
    if (getValues('id')) {
      meetingBody.id = getValues('id')
      updateMeetingMutation.mutate(meetingBody)
      return
    }
    meetingBody.patientId = currentPatient?.id
    createMeetingMutation.mutate(meetingBody)
  }

  const handleOnNext = async () => {
    const fieldName = stepsForm[currentStep].name
    const output = await trigger(fieldName as any, { shouldFocus: true })

    if (!output) {
      return
    }

    if (currentStep === 0) {
      setIsSearching(true)
      return
    }

    if (currentStep < stepsForm.length) {
      if (currentStep === stepsForm.length - 1) {
        await handleSubmit(handleOnSubmit)()
      } else {
        setPreviousStep(currentStep)
        setCurrentStep((prev) => prev + 1)
        handleScrollTopModal()
      }
    }
  }
  const handleOnBack = () => {
    setPreviousStep(currentStep)
    setCurrentStep((prev) => prev - 1)
    handleScrollTopModal()
  }

  const onDelete = () => {
    confirmModalRef.current?.showModal()
  }
  const handleOnDelete = () => {
    deleteMeetingMutation.mutate(getValues('id') as number)
  }

  const handleCreateSchedule = () => {
    handleResetStep()
    reset()
    handleOpenModal()
  }
  const handleChoosePatient = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, patient: PatientOfDoctor) => {
    setValue('patientName', patient.fullName)
    setPreviousStep(currentStep)
    setCurrentStep((prev) => prev + 1)
    handleScrollTopModal()
    setCurrentPatient(patient)
  }

  const handleOnCancel = () => {
    confirmModalRef.current?.close()
  }

  const handleOpenModal = () => {
    modalRef.current?.showModal()
  }

  const handleCloseModal = () => {
    modalRef.current?.close()
    confirmModalRef.current?.close()
  }

  const handleScrollTopModal = () => {
    modalRef.current?.firstElementChild?.scrollTo({
      behavior: 'smooth',
      top: 0
    })
  }

  const handleFocusInputTime = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    event.target.showPicker()
  }

  const handleResetStep = () => {
    setPreviousStep(0)
    setCurrentStep(0)
  }

  const calendarOptions: CalendarOptions = {
    ...defaultCalendarOptions,
    dayMaxEvents: isMonthView && 1,
    customButtons: {
      create: {
        text: 'Create',
        click: handleCreateSchedule
      }
    },
    events: events,
    eventClick(arg) {
      const propsEvent = arg.event.extendedProps
      const currentEvent: Omit<AppointmentScheduleSchema, 'search'> = {
        name: arg.event.title,
        date: dayjs(arg.event.start as Date)
          .utc()
          .format('YYYY-MM-DD'),
        startTime: dayjs(arg.event.start as Date)
          .utc()
          .format('HH:mm'),
        endTime: dayjs(arg.event.end as Date)
          .utc()
          .format('HH:mm'),
        location: propsEvent.location,
        note: propsEvent.note,
        patientName: propsEvent.patientName,
        id: propsEvent.meetingId
      }
      Object.entries(currentEvent).forEach(([name, value]: any) => setValue(name, value))
      setValue('search.keyword', 'Updating...')
      setCurrentStep(1)
      handleOpenModal()
    },
    datesSet: (arg) => {
      const newEvent = [...events]
      setEvents(newEvent)
    }
  }

  const isUpdateMode = Boolean(getValues('id'))

  return (
    <section className='flex w-full flex-col gap-6 p-4 lg:p-8'>
      <h1 className='text-2xl font-bold'>Appointment Schedule</h1>
      {meetingsLoading && <Loading />}
      {!meetingsLoading && (
        <div className='w-full rounded-lg bg-white p-8 shadow-lg'>
          <FullCalendar ref={calendarRef} {...calendarOptions} />
          <Modal modalRef={modalRef}>
            <article className='flex justify-between gap-2'>
              <h2 className='text-xl font-bold'>
                {isUpdateMode ? 'Appointment Schedule' : 'Create New Appointment Schedule'}
              </h2>
            </article>
            <form className='mt-8 flex flex-1 flex-col gap-8' onSubmit={handleSubmitForm}>
              {currentStep === 0 && (
                <motion.div
                  className='flex flex-1 flex-col gap-4'
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <SearchForm
                    handleChoosePatient={handleChoosePatient}
                    isLoading={isLoading}
                    searchData={searchData?.data.data}
                    form={{
                      register,
                      name: 'search.keyword',
                      errorMessage: errors.search?.keyword?.message
                    }}
                  />
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  className='flex flex-1 flex-col gap-4'
                  initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <div className='flex w-full flex-col gap-4'>
                    <div className='flex w-full flex-col gap-2'>
                      <h2 className='text-base font-bold'>Appointment Schedule Name</h2>
                      <Input
                        register={register}
                        name='name'
                        containerClass='w-full'
                        placeholder='Name'
                        errorMessage={errors.name?.message}
                      />
                    </div>
                    <div className='flex w-full flex-col gap-2'>
                      <h2 className='text-base font-bold'>Patient Name</h2>
                      <Input
                        register={register}
                        name='patientName'
                        containerClass='w-full'
                        placeholder='Appointment schedule name'
                        disabled
                      />
                    </div>
                    <div className='flex w-full flex-col gap-2'>
                      <h2 className='text-base font-bold'>Date & Time</h2>
                      <div className='flex w-full flex-col gap-2'>
                        <Input
                          register={register}
                          name='date'
                          type='date'
                          inputClass='cursor-pointer'
                          errorMessage={errors.date?.message}
                          onFocus={handleFocusInputTime}
                        />
                        <div className='flex gap-2'>
                          <Controller
                            control={control}
                            name='startTime'
                            render={({ field }) => (
                              <Input
                                register={register}
                                type='time'
                                onFocus={handleFocusInputTime}
                                containerClass='w-full'
                                inputClass='cursor-pointer'
                                errorMessage={errors.startTime?.message}
                                name={field.name}
                                onChange={(event) => {
                                  field.onChange(event)
                                  trigger(['endTime', 'startTime'])
                                }}
                              />
                            )}
                          />
                          <Controller
                            control={control}
                            name='endTime'
                            render={({ field }) => (
                              <Input
                                register={register}
                                type='time'
                                onFocus={handleFocusInputTime}
                                containerClass='w-full'
                                inputClass='cursor-pointer'
                                errorMessage={errors.endTime?.message}
                                name={field.name}
                                onChange={(event) => {
                                  field.onChange(event)
                                  trigger(['endTime', 'startTime'])
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='flex w-full flex-col gap-2'>
                      <h2 className='text-base font-bold'>Location</h2>
                      <Input
                        register={register}
                        name='location'
                        containerClass='w-full'
                        placeholder='Location'
                        errorMessage={errors.location?.message}
                      />
                    </div>
                    <div className='flex w-full flex-col gap-2'>
                      <h2 className='text-base font-bold'>Note</h2>
                      <textarea
                        {...register('note')}
                        rows={6}
                        className='textarea input-bordered placeholder:text-base hover:border-primary focus:border-primary focus:outline-none'
                        placeholder='Note'
                      ></textarea>
                    </div>
                  </div>
                </motion.div>
              )}
            </form>

            {currentStep > 0 && (
              <article className='mt-4 flex w-full justify-end gap-4'>
                {!isUpdateMode && (
                  <Button
                    type='button'
                    title='Back'
                    className='btn-outline font-bold '
                    Icon={HiOutlineChevronLeft}
                    iconClass='w-5 h-5'
                    onClick={handleOnBack}
                  />
                )}
                {isUpdateMode && (
                  <>
                    <Button
                      type='button'
                      title='Delete'
                      className='btn-error font-bold text-white'
                      Icon={HiOutlineXMark}
                      iconClass='w-5 h-5'
                      onClick={onDelete}
                    />
                    <Modal modalRef={confirmModalRef} modalBoxClass='min-h-[unset] w-1/3 flex flex-col gap-2'>
                      <p>Are you sure you want to delete?</p>
                      <div className='flex w-full justify-end'>
                        <article className='flex gap-4'>
                          <Button
                            type='button'
                            title='Cancel'
                            className='btn-outline font-bold '
                            onClick={handleOnCancel}
                          />
                          <Button
                            type='button'
                            title='Confirm'
                            className='btn-primary font-bold text-white'
                            onClick={handleOnDelete}
                            loading={deleteMeetingMutation.isLoading}
                          />
                        </article>
                      </div>
                    </Modal>
                  </>
                )}

                <Button
                  type='button'
                  title={currentStep !== stepsForm.length - 1 ? 'Next' : isUpdateMode ? 'Update' : 'Create'}
                  className='btn-primary font-bold text-white'
                  Icon={currentStep !== stepsForm.length - 1 ? HiOutlineChevronRight : HiOutlineCheck}
                  iconClass='w-5 h-5'
                  onClick={handleOnNext}
                  loading={createMeetingMutation.isLoading || updateMeetingMutation.isLoading}
                />
              </article>
            )}
          </Modal>
        </div>
      )}
    </section>
  )
}

function renderEventContent(eventInfo: EventContentArg) {
  return (
    <button className='btn btn-primary btn-sm h-auto w-full justify-between gap-1 rounded-md px-2 py-1 text-start text-white'>
      <span className='line-clamp-1 text-wrap'>{eventInfo.event.title}</span>
    </button>
  )
}
