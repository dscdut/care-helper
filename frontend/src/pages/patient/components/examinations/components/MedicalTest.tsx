import { MedialTestType, TestType, testRowType } from 'src/types/medicalTests.type'

export interface MedicalTestProps {
  medicalTestData: MedialTestType
}
type classifyDataName = 'urogenitals' | 'bloods' | 'bloodFats'

export default function MedicalTest({ medicalTestData }: MedicalTestProps) {
  const classifyData: { [p in classifyDataName]: testRowType[] } = {
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
            <div className='overflow-x-auto'>
              <table className='table'>
                {/* head */}
                <thead>
                  <tr className='border-black/70'>
                    <th>Medical test</th>
                    <th>Value</th>
                    <th className='text-right'>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {classifyData.bloods.map((blood, index) => (
                    <tr key={index} className='hover border-black/20'>
                      <td>{blood.name}</td>
                      <td>{blood.value}</td>
                      <td className='text-right'>{blood.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className='card bg-bg_primary shadow'>
          <div className='card-body'>
            <h2 className='card-title font-bold'>Blood Fat Test</h2>
            <div className='overflow-x-auto'>
              <table className='table'>
                {/* head */}
                <thead>
                  <tr className='border-black/70'>
                    <th>Medical test</th>
                    <th>Value</th>
                    <th className='text-right'>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {classifyData.bloodFats.map((bloodFat, index) => (
                    <tr key={index} className='hover border-black/20'>
                      <td>{bloodFat.name}</td>
                      <td>{bloodFat.value}</td>
                      <td className='text-right'>{bloodFat.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
