import classNames from 'classnames'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext, AppContextType } from 'src/contexts/app.context'
import { quickOptionsNavbar } from 'src/data/layout'
import { HiChevronDoubleLeft, HiMagnifyingGlass, HiOutlineBell } from 'react-icons/hi2'
import Button from 'src/components/button/Button'
export interface NavbarProps {}

export default function Navbar(props: NavbarProps) {
  const { showSidebar, setShowSidebar, user } = useContext<AppContextType>(AppContext)
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
        <Button
          className={classNames('btn btn-circle btn-ghost hidden transition-all lg:flex', {
            'rotate-180': !showSidebar
          })}
          onClick={handleShowSidebar}
          Icon={HiChevronDoubleLeft}
        />
      </div>
      <div className='navbar-center flex-[30%]'>
        <form className='w-full'>
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3'>
              <HiMagnifyingGlass className='h-5 w-5' />
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
            <HiOutlineBell className='h-6 w-6' />
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
              <h3 className='line-clamp-1 text-base font-semibold'>
                {user?.fullName || 'Name not updated yet'} &nbsp;
              </h3>
              <p className='line-clamp-1 text-sm'>{user?.email} &nbsp;</p>
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
