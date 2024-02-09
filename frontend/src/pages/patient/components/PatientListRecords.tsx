import { HiMiniPlus } from 'react-icons/hi2'
import Pagination from 'src/components/pagination/Pagination'
import { patientRecords } from 'src/data/patient'

export default function PatientListRecords() {
  return (
    <section className='rounded-lg bg-white p-4 shadow-lg'>
      <div className='mt-2 flex flex-wrap justify-between gap-2 px-4'>
        <div className='text-base'>
          <p className='font-bold'>Danh sách các lần khám</p>
          <p>Từ các hồ sơ bệnh án của tất cả bệnh viện</p>
        </div>
        <div className='btn btn-primary text-white'>
          <HiMiniPlus className='h-6 w-6' />
          <p> Thêm lần khám mới</p>
        </div>
      </div>
      <div className='mt-4 overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr className='border-primary text-sm'>
              <th>Ngày khám</th>
              <th>Bác sỹ phụ trách</th>
            </tr>
          </thead>
          <tbody>
            {patientRecords.map((patient) => (
              <tr className='hover cursor-pointer' key={patient.id}>
                <td>{patient.date}</td>
                <td>{patient.doctor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-2 flex items-center justify-end'>
        <Pagination />
      </div>
    </section>
  )
}
