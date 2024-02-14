import { ExaminationType } from 'src/types/examination.type'

export interface DiagnoseProps {
  examinationData: ExaminationType
}

export default function Diagnose({ examinationData }: DiagnoseProps) {
  return (
    <section className='flex flex-col gap-6 '>
      <section className='card h-max w-full bg-white shadow-lg'>
        <div className='card-body gap-6'>
          <h2 className='card-title mt-2 font-bold'>Diagnose</h2>
          <p className='whitespace-pre-line pl-2 leading-8'>{examinationData.detailDiagnose}</p>
          <div className='card bg-bg_primary shadow'>
            <div className='card-body'>
              <h2 className='card-title font-bold'>Conclude</h2>
              <p>{examinationData?.diagnose}</p>
            </div>
          </div>
        </div>
      </section>
      <section className='card h-max w-full bg-white shadow-lg '>
        <div className='card-body gap-6'>
          <h2 className='card-title mt-2 font-bold'>Examination Note</h2>
          <p className='whitespace-pre-line pl-2 leading-8'>{examinationData.advice}</p>
        </div>
      </section>
    </section>
  )
}
