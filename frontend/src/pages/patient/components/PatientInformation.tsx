import { patientAdministrative } from 'src/data/patient'

export default function PatientInformation() {
  return (
    <div className='flex flex-col'>
      <div className='flex gap-8 rounded-lg bg-white p-4 shadow-lg'>
        <div className='avatar hidden flex-shrink-0 self-center rounded xl:flex'>
          <div className='h-40 w-36 rounded-md'>
            <img alt='img' src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
          </div>
        </div>
        <div className='flex flex-1 flex-col gap-2 xl:flex-row xl:items-center'>
          <ul className='flex h-full flex-col justify-between gap-2 xl:w-1/2'>
            {patientAdministrative.information.left.map((infor, index) => (
              <li key={index} className='flex gap-2'>
                <h3 className='xl:w-1/2'>{infor.title}</h3>
                <h3 className='font-bold xl:w-1/2'>{infor.value}</h3>
              </li>
            ))}
          </ul>
          <ul className='flex h-full flex-col gap-2 xl:w-1/2'>
            {patientAdministrative.information.right.map((infor, index) => (
              <li key={index} className='flex gap-2'>
                <h3 className='xl:w-1/3'>{infor.title}</h3>
                <h3 className='font-bold xl:w-2/3'>{infor.value}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='mt-4 flex flex-col justify-between gap-5 lg:flex-row'>
        <div className='w-full rounded-lg bg-white p-5 shadow-lg'>
          <p className='pb-5 font-bold'>Lý do nhập viện</p>
          <p>{patientAdministrative.reasonForHospitalization}</p>
        </div>
        <div className='flex flex-col gap-5'>
          <div className='card w-full min-w-max rounded-lg bg-slate-300 text-black shadow-lg lg:w-96'>
            <div className='card-body py-5'>
              <h2 className='card-title'>Bảo hiểm y tế</h2>
              <div className='stats stats-vertical text-center shadow lg:stats-horizontal'>
                {patientAdministrative.healthInsurance.data.map((data, index) => (
                  <div key={index} className='stat p-3'>
                    <div className='stat-title text-black'>{data}</div>
                  </div>
                ))}
              </div>
              <p>
                Đối tượng: <span className='font-bold'>{patientAdministrative.healthInsurance.object}</span>
              </p>
            </div>
          </div>
          <div className='card w-full min-w-max rounded-lg bg-slate-300 text-black shadow-lg lg:w-96'>
            <div className='card-body py-5'>
              <h2 className='card-title'>Tổng quan sức khoẻ</h2>
              {patientAdministrative.healthOverview.map((health, index) => (
                <p key={index}>
                  {health.title}: <span className='font-bold'>{health.value}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
