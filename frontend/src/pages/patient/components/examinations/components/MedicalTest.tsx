import MedicalTestTable from 'src/components/table/MedicalTestTable'
import { MedialTestType, TestType, TestRowType } from 'src/types/medicalTests.type'

export interface MedicalTestProps {
  medicalTestData: MedialTestType
}
type classifyDataName = 'urogenitals' | 'bloods' | 'bloodFats'

export default function MedicalTest({ medicalTestData }: MedicalTestProps) {
  const classifyData: { [p in classifyDataName]: TestRowType[] } = {
    urogenitals: [],
    bloods: [],
    bloodFats: []
  }

  medicalTestData.testRows.forEach((data) => {
    switch (data.type) {
      case TestType.UROGENITAL: {
        classifyData.urogenitals.push(data)
        break
      }
      case TestType.BLOOD: {
        classifyData.bloods.push(data)
        break
      }
      case TestType.BLOOD_FAT: {
        classifyData.bloodFats.push(data)
        break
      }
    }
  })

  return (
    <section className='card w-full bg-white shadow-lg'>
      <div className='card-body gap-6'>
        <h2 className='card-title font-bold'>Medical Test</h2>
        <div className='stats stats-vertical mt-2 bg-bg_primary py-4 shadow xl:stats-horizontal'>
          {classifyData.urogenitals.map((urogenital, index) => (
            <article key={index} className='stat'>
              <span className='stat-title font-semibold'>{urogenital.name}</span>
              <h3 className='stat-value'>
                {urogenital.value} {urogenital.unit}
              </h3>
            </article>
          ))}
        </div>
        <div className='card bg-bg_primary shadow'>
          <div className='card-body'>
            <h2 className='card-title font-bold'>Blood Test</h2>
            <MedicalTestTable
              medicalTestData={classifyData.bloods.map((blood) => ({
                parameter: blood.name,
                index: blood.value,
                unit: blood.unit
              }))}
            />
          </div>
        </div>
        <div className='card bg-bg_primary shadow'>
          <div className='card-body'>
            <h2 className='card-title font-bold'>Blood Fat Test</h2>
            <MedicalTestTable
              medicalTestData={classifyData.bloodFats.map((blood) => ({
                parameter: blood.name,
                index: blood.value,
                unit: blood.unit
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
