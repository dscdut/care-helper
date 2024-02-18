import { MedicalTestSchema } from 'src/utils/rules'
import { twMerge } from 'tailwind-merge'

export interface MedicalTestTableProps {
  medicalTestData: MedicalTestSchema[]
  containerClass?: string
  tableClass?: string
}

export default function MedicalTestTable({ medicalTestData, containerClass, tableClass }: MedicalTestTableProps) {
  return (
    <div className={twMerge('overflow-x-auto', containerClass)}>
      <table className={twMerge('table', tableClass)}>
        <thead>
          <tr className='border-black/70'>
            <th className='w-1/2'>Medical test</th>
            <th className='w-1/4'>Value</th>
            <th className='w-1/4 text-right'>Unit</th>
          </tr>
        </thead>
        <tbody>
          {medicalTestData.map((medicalTest, index) => (
            <tr key={index} className='hover border-black/20'>
              <td>{medicalTest.parameter}</td>
              <td>{medicalTest.index}</td>
              <td className='text-right'>{medicalTest.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
