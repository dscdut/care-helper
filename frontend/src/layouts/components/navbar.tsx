import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext, AppContextType } from 'src/contexts/app.context'
import classNames from 'classnames'
import { quickOptionsNavbar } from 'src/data/layout'
export interface NavbarProps {}

export default function Navbar(props: NavbarProps) {
  const { showSidebar, setShowSidebar } = useContext<AppContextType>(AppContext)
  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar)
  }
  return (
    <div
      className={classNames('navbar fixed z-10 h-16 justify-between bg-white py-2', {
        'lg:pl-[19rem]': showSidebar,
        'lg:pl-24': !showSidebar
      })}
    >
      <div className='navbar-start flex-[30%]'>
        <button
          className={classNames('btn btn-circle btn-ghost hidden transition-all lg:flex', {
            'rotate-180': !showSidebar
          })}
          onClick={handleShowSidebar}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5' />
          </svg>
        </button>
      </div>
      <div className='navbar-center flex-[30%]'>
        <form className='w-full'>
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
              <svg
                className='h-4 w-4 text-gray-500'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              type='text'
              className='input input-bordered !h-11 w-full !rounded-xl ps-10 hover:border-primary focus:border-primary focus:outline-none'
              placeholder='Search...'
            />
          </div>
        </form>
      </div>
      <div className='navbar-end flex flex-[30%] items-center'>
        <button className='btn btn-circle btn-ghost mt-1'>
          <div className='indicator'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
              />
            </svg>
            <span className='badge indicator-item badge-primary badge-xs'></span>
          </div>
        </button>
        <div className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='avatar btn btn-circle btn-ghost'>
            <div className='w-10 rounded-full'>
              <img
                alt='Tailwind CSS Navbar component'
                src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
              />
            </div>
          </div>
          <div
            tabIndex={0}
            role='button'
            className='dropdown-content top-[120%] z-[1] flex w-56 flex-col rounded-md bg-base-100 shadow'
          >
            <div className='w-full border-b border-dashed border-black p-4 py-3'>
              <h3 className='line-clamp-1 text-base font-semibold'>Pham Tuyen &nbsp;</h3>
              <p className='line-clamp-1 text-sm'>tuyenpham1104.dev@gmail.com &nbsp;</p>
            </div>
            <ul className='menu menu-sm gap-[1px]'>
              {quickOptionsNavbar.map((option) => (
                <li key={option.id} className='rounded'>
                  <Link
                    className='hover:bg-primary hover:text-white focus:!bg-primary focus:!text-white active:!bg-primary'
                    to={option.to}
                  >
                    {option.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
