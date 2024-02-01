import { HiMiniArrowDownCircle } from 'react-icons/hi2'

export default function PatientListRecords() {
  return (
    <>
      <section className='rounded-lg bg-white p-4 shadow-lg'>
        <div className='overflow-x-auto'>
          <div className='flex flex-row justify-between px-4'>
            <div className='text-base'>
              <p className='font-bold'>Danh sách các lần khám</p>
              <p>Từ các hồ sơ bệnh án của tất cả bệnh viện</p>
            </div>
            <div className='dropdown dropdown-end dropdown-bottom'>
              <div tabIndex={0} role='button' className='btn m-1'>
                <HiMiniArrowDownCircle className='h-6 w-6' />
                <p>Hiển thị theo tất cả bệnh viện</p>
              </div>
              <ul className='menu dropdown-content z-[1] w-max rounded-box bg-base-100 p-2 text-base font-medium shadow-[0_1px_4px_rgba(0,0,0,0.16)]'>
                <li>
                  <p>Bệnh viện Nhi Đồng I</p>
                </li>
                <li>
                  <p>Bệnh viện Đa khoa Lâm Đồng</p>
                </li>
              </ul>
            </div>
          </div>
          <table className='table   '>
            {/* head */}
            <thead className='border-b-2 border-b-indigo-500 text-sm'>
              <tr>
                <th>Lần khám</th>
                <th>Ngày khám</th>
                <th>Bệnh viện</th>
                <th>Bác sỹ phụ trách</th>
              </tr>
            </thead>
            <tbody>
              <tr className=''>
                <th>Lần 4</th>
                <td>17/01/2023</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              <tr className=''>
                <th>Lần 3</th>
                <td>17/12/2023</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              <tr className=''>
                <th>Lần 2</th>
                <td>17/11/2023</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              <tr className=''>
                <th>Lần 1</th>
                <td>17/10/2023</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
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
    </>
  )
}
