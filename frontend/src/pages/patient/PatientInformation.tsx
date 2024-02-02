export default function PatientInformation() {
  return (
    <>
      <div className='flex flex-col'>
        <div className='flex rounded-lg bg-white'>
          <div className='avatar self-center pl-5'>
            <div className=' h-36 w-36 rounded '>
              <img alt='' src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' />
            </div>
          </div>
          <div className='xl:flex'>
            <div className='min-w-fit pl-5'>
              <div className='table table-fixed xl:table-auto'>
                <tbody>
                  <tr className='border-b-0'>
                    <td className='w-1/3 xl:w-fit'>Họ và tên</td>
                    <th>Nguyễn Văn A</th>
                  </tr>
                  <tr className='border-b-0'>
                    <td>Ngày tháng năm sinh</td>
                    <th>25/12/1997</th>
                  </tr>
                  <tr className='border-b-0'>
                    <td>Giới tính</td>
                    <th>Nam</th>
                  </tr>
                  <tr className='border-b-0'>
                    <td>Căn cước công dân</td>
                    <th>201853583</th>
                  </tr>
                </tbody>
              </div>
            </div>
            <div className='pl-5'>
              <div className='table lg:table-fixed xl:table-auto'>
                <tbody>
                  <tr className='border-b-0'>
                    <td className='w-1/3 xl:w-fit'>Địa chỉ thường trú</td>
                    <th>54 Nguyễn Lương Bằng, quận Liên Chiểu, thành phố Đà Nẵng</th>
                  </tr>
                  <tr className='border-b-0'>
                    <td>Nghề nghiệp</td>
                    <th>Kinh doanh</th>
                  </tr>
                </tbody>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-5 flex flex-row justify-between'>
          <div className=' mr-8 w-full rounded-lg bg-white p-5'>
            <p className='pb-5 font-bold'>Lý do nhập viện</p>
            <p>Đau đầu, chóng mặt, buồn nôn</p>
          </div>
          <div className=''>
            <div className='card w-96 w-full min-w-max bg-slate-300 text-black'>
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
            <div className='card mt-5 w-96 w-full min-w-max bg-slate-300 text-black'>
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
    </>
  )
}
