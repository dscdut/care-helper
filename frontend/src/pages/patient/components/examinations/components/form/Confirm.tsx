import { ExaminationSchema } from 'src/utils/rules'
import { motion } from 'framer-motion'
import { Prescription } from 'src/pages/patient/components/examinations/components'

export interface ConfirmProps {
  data: ExaminationSchema
  delta: number
  examinationId: number
  patientName: string
}

export default function Confirm({ data, delta, examinationId, patientName }: ConfirmProps) {
  const prescriptionData = [
    {
      details: data.prescription.prescriptionRow,
      examinationId: examinationId,
      startDate: data.prescription.date.startDate as string,
      endDate: data.prescription.date.endDate as string,
      note: data.prescription.note || '',
      prescriptionFilename: ''
    }
  ]
  return (
    <motion.div
      initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className='flex flex-1 flex-col gap-8'
    >
      <section className='flex flex-col gap-2'>
        <h2 className='text-lg font-bold'>Birth Mark</h2>
        <div className='card bg-bg_primary shadow'>
          <div className='card-body'>
            <div className='overflow-x-auto'>
              <table className='table'>
                <thead>
                  <tr className='border-black/70'>
                    <th className='w-1/2'>Medical test</th>
                    <th className='w-1/4'>Value</th>
                    <th className='w-1/4 text-right'>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.birthMark.map((birthMark, index) => (
                    <tr key={index} className='hover border-black/20'>
                      <td>{birthMark.parameter}</td>
                      <td>{birthMark.index}</td>
                      <td className='text-right'>{birthMark.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-2'>
        <h2 className='text-lg font-bold'>Blood Test</h2>
        <div className='card bg-bg_primary shadow'>
          <div className='card-body'>
            <div className='overflow-x-auto'>
              <table className='table'>
                <thead>
                  <tr className='border-black/70'>
                    <th className='w-1/2'>Medical test</th>
                    <th className='w-1/4'>Value</th>
                    <th className='w-1/4 text-right'>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.bloodTest.map((blood, index) => (
                    <tr key={index} className='hover border-black/20'>
                      <td>{blood.parameter}</td>
                      <td>{blood.index}</td>
                      <td className='text-right'>{blood.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-2'>
        <h2 className='text-lg font-bold'>Blood Fat Test</h2>
        <div className='card bg-bg_primary shadow'>
          <div className='card-body'>
            <div className='overflow-x-auto'>
              <table className='table'>
                <thead>
                  <tr className='border-black/70'>
                    <th className='w-1/2'>Medical test</th>
                    <th className='w-1/4'>Value</th>
                    <th className='w-1/4 text-right'>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {data.bloodFatTest.map((bloodFat, index) => (
                    <tr key={index} className='hover border-black/20'>
                      <td>{bloodFat.parameter}</td>
                      <td>{bloodFat.index}</td>
                      <td className='text-right'>{bloodFat.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-2'>
        <h2 className='text-lg font-bold'>Diagnose</h2>
        <div className='card bg-bg_primary shadow'>
          <div className='card-body gap-8'>
            <article className='flex flex-col gap-2'>
              <h3 className='text-base font-bold'>Conclusion</h3>
              <p className='rounded-xl bg-white p-4 shadow'>{data.diagnose.conclude}</p>
            </article>
            <article className='flex flex-col gap-2'>
              <h3 className='text-base font-bold'>Details</h3>
              <div className='card gap-2 shadow'>
                <div className='card-body rounded-2xl bg-white px-4'>
                  <p>{data.diagnose.details}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-2'>
        <h2 className='text-lg font-bold'>Note</h2>
        <div className='card bg-bg_primary shadow'>
          <div className='card-body gap-8'>
            <p>{data.diagnose.advice}</p>
          </div>
        </div>
      </section>
      <Prescription
        prescriptionData={prescriptionData}
        patientName={patientName}
        containerClass='bg-bg_primary shadow mt-4'
        cardClass='bg-white'
        canAdd={false}
      />
    </motion.div>
  )
}
