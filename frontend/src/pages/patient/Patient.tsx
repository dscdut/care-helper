import { HiMiniPlus } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'

export interface PatientProps {}

export default function Patient(props: PatientProps) {
  const navigate = useNavigate()
  const handelClick = () => {
    navigate('1')
  }
  return (
    <article className='flex w-full flex-col gap-4 p-4 lg:p-8'>
      <section className='flex w-full items-start justify-between'>
        <h1 className='self-center text-2xl font-bold'>Danh sách bệnh nhân</h1>
        <button className='btn btn-primary font-bold text-white'>
          <HiMiniPlus className='h-6 w-6' /> Thêm bệnh nhân
        </button>
      </section>
      <section className='rounded-lg bg-white p-4 shadow-lg'>
        <div className='overflow-x-auto'>
          <table className='table'>
            {/* head */}
            <thead>
              <tr className='text-base font-semibold text-black'>
                <th className='flex items-center gap-4'>
                  <input type='checkbox' className='checkbox-primary checkbox' /> Tên bệnh nhân
                </th>
                <th>Ngày khám</th>
                <th>Bác sỹ phụ trách</th>
                <th>Chẩn đoán</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className='hover' onClick={handelClick}>
                <th className='flex items-center gap-4'>
                  <input type='checkbox' className='checkbox-primary checkbox' /> Nguyễn Văn A
                </th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr className='hover'>
                <th className='flex items-center gap-4'>
                  <input type='checkbox' className='checkbox-primary checkbox' /> Nguyễn Văn B
                </th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr className='hover'>
                <th className='flex items-center gap-4'>
                  <input type='checkbox' className='checkbox-primary checkbox' /> Nguyễn Văn C
                </th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
          <div className='flex items-center justify-end'>
            <div className='join items-center gap-6'>
              <button className='join-item text-xl'>&#60;</button>
              <button className='btn btn-primary join-item btn-xs !rounded-md'>1</button>
              <button className='join-item'>2</button>
              <button className='join-item'>3</button>
              <button className='join-item'>4</button>
              <button className='join-item text-xl'>&#62;</button>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
