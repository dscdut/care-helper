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
            <li className='flex gap-2'>
              <h3 className='xl:w-1/2'>Họ và tên</h3>
              <h3 className='font-bold xl:w-1/2'>Nguyễn Văn A</h3>
            </li>
            <li className='flex gap-2'>
              <h3 className='xl:w-1/2'>Ngày tháng năm sinh</h3>
              <h3 className='font-bold xl:w-1/2'>25/12/1997</h3>
            </li>
            <li className='flex gap-2'>
              <h3 className='xl:w-1/2'>Giới tính</h3>
              <h3 className='font-bold xl:w-1/2'>Nam</h3>
            </li>
            <li className='flex gap-2'>
              <h3 className='xl:w-1/2'>Căn cước công dân</h3>
              <h3 className='font-bold xl:w-1/2'>201853583</h3>
            </li>
          </ul>
          <ul className='flex h-full flex-col gap-2 xl:w-1/2'>
            <li className='flex gap-2'>
              <h3 className='xl:w-1/3'>Địa chỉ thường trú</h3>
              <h3 className='font-bold xl:w-2/3'>54 Nguyễn Lương Bằng, quận Liên Chiểu, thành phố Đà Nẵng</h3>
            </li>
            <li className='flex gap-2'>
              <h3 className='xl:w-1/3'>Nghề nghiệp</h3>
              <h3 className='font-bold xl:w-2/3'>Kinh doanh</h3>
            </li>
          </ul>
        </div>
      </div>
      <div className='mt-4 flex flex-col justify-between gap-5 lg:flex-row'>
        <div className='w-full rounded-lg bg-white p-5 shadow-lg'>
          <p className='pb-5 font-bold'>Lý do nhập viện</p>
          <p>Đau đầu, chóng mặt, buồn nôn</p>
        </div>
        <div className='flex flex-col gap-5'>
          <div className='card w-full min-w-max rounded-lg bg-slate-300 text-black shadow-lg lg:w-96'>
            <div className='card-body py-5'>
              <h2 className='card-title'>Bảo hiểm y tế</h2>
              <div className='stats stats-vertical text-center shadow lg:stats-horizontal'>
                <div className='stat p-3'>
                  <div className='stat-title text-black'>DN</div>
                </div>

                <div className='stat p-3'>
                  <div className='stat-title'>4</div>
                </div>

                <div className='stat p-3'>
                  <div className='stat-title'>79</div>
                </div>
                <div className='stat p-3'>
                  <div className='stat-title'>7917131400</div>
                </div>
              </div>
              <p>
                Đối tượng: <span className='font-bold'>Thu phí</span>
              </p>
            </div>
          </div>
          <div className='card w-full min-w-max rounded-lg bg-slate-300 text-black shadow-lg lg:w-96'>
            <div className='card-body py-5'>
              <h2 className='card-title'>Tổng quan sức khoẻ</h2>
              <p>
                Chiều cao: <span className='font-bold'>178cm</span>
              </p>
              <p>
                Cân nặng: <span className='font-bold'>48kg</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
