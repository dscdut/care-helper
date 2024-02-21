import dayjs from 'dayjs'
import prescriptionsApi from 'src/apis/prescriptions.api'
import examinationApi from 'src/apis/examination.api'
import medicalTestsApi from 'src/apis/medicalTests.api'
import { useQueries } from 'react-query'
import { useOutletContext, useParams } from 'react-router-dom'
import { MedialTestType } from 'src/types/medicalTests.type'
import { ExaminationType } from 'src/types/examination.type'
import { PrescriptionType } from 'src/types/prescriptions.type'
import { AxiosResponse } from 'axios'
import { Diagnose, MedicalTest, Prescription } from 'src/pages/patient/components/examinations/components'
import { useContext } from 'react'
import { AppContext, AppContextType } from 'src/contexts/app.context'
import Loading from 'src/components/loading/Loading'
import NoDataDisplay from 'src/components/no-data-display/NoDataDisplay'

export interface ExaminationProps {}

export default function Examination(props: ExaminationProps) {
  const { examinationId } = useParams() as { examinationId: string }
  const { user } = useContext<AppContextType>(AppContext)
  const patientName = useOutletContext<string>()
  const data = useQueries([
    {
      queryKey: ['medicalTestExaminationId', Number(examinationId)],
      queryFn: () => medicalTestsApi.getMedicalTestExaminationById(Number(examinationId))
    },
    {
      queryKey: ['examinationId', Number(examinationId)],
      queryFn: () => examinationApi.getExaminationById(Number(examinationId))
    },
    {
      queryKey: ['prescriptionExaminationId', Number(examinationId)],
      queryFn: () => prescriptionsApi.getPrescriptionExaminationId(Number(examinationId))
    }
  ])

  const allSuccess = data.every((childData) => childData.isSuccess === true)
  const [medicalTestsData, examinationDataId, prescriptionExaminationData] = data.map((childData) => childData.data)
  if (!allSuccess) {
    return <Loading />
  }
  if (
    !(medicalTestsData && (medicalTestsData as AxiosResponse<MedialTestType[]>).data.length > 0) ||
    !(examinationDataId && Object.keys((examinationDataId as AxiosResponse<ExaminationType>).data).length > 0) ||
    !(prescriptionExaminationData && (prescriptionExaminationData as AxiosResponse<PrescriptionType[]>).data.length > 0)
  ) {
    return <NoDataDisplay title='No data' description='There is no examination information available' />
  }
  return (
    <div className='flex flex-col gap-8'>
      <section className='card bg-white shadow-lg'>
        <div className='card-body flex-col justify-between md:flex-row'>
          <article>
            <span className='border-b border-black'>Examination day</span>
            <h3 className='text-xl font-semibold'>
              {dayjs((examinationDataId?.data as ExaminationType)?.createdAt).format('DD/MM/YYYY')}
            </h3>
          </article>
          <article>
            <span className='border-b border-black'>Doctor</span>
            <h3 className='text-xl font-semibold'>{user?.fullName}</h3>
          </article>
        </div>
      </section>
      <div className='flex flex-wrap gap-8 2xl:flex-nowrap'>
        <div className='w-full 2xl:w-3/5'>
          <MedicalTest medicalTestData={(medicalTestsData as AxiosResponse<MedialTestType[]>).data[0]} />
        </div>
        <div className='w-full 2xl:w-2/5'>
          <Diagnose examinationData={(examinationDataId as AxiosResponse<ExaminationType>).data} />
        </div>
      </div>
      <Prescription
        prescriptionData={(prescriptionExaminationData as AxiosResponse<PrescriptionType[]>).data}
        patientName={patientName}
      />
    </div>
  )
}
