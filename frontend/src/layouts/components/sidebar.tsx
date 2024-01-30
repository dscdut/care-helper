import classNames from 'classnames'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { path } from 'src/constants/path'
import { AppContext, AppContextType } from 'src/contexts/app.context'
import { sidebarOption } from 'src/data/layout'
import { HiBars3, HiArrowRightOnRectangle } from 'react-icons/hi2'

export interface SidebarProps {}

export default function Sidebar(props: SidebarProps) {
  const { showSidebar } = useContext<AppContextType>(AppContext)
  const { pathname } = useLocation()
  return (
    <div className='drawer fixed z-10 w-max bg-white lg:drawer-open'>
      <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex h-16 flex-col items-center justify-center pl-2  lg:hidden'>
        <label htmlFor='my-drawer-2' aria-label='open sidebar' className='btn drawer-button h-3/5'>
          <HiBars3 className='h-6 w-6' />
        </label>
      </div>
      <div className='drawer-side overflow-y-clip'>
        <label htmlFor='my-drawer-2' aria-label='close sidebar' className='drawer-overlay'></label>
        <ul
          className={classNames(
            'menu min-h-full justify-between bg-white p-4 pt-0 text-base font-semibold text-black !transition-all',
            {
              'lg:w-72': showSidebar,
              'lg:w-[5.5rem]': !showSidebar
            }
          )}
        >
          <div className='flex w-full flex-col gap-8'>
            <li className='flex h-16 items-center justify-center border-b border-dashed border-black'>
              <Link to={path.home} className='w-max px-0'>
                {showSidebar ? (
                  <h3 className='w-max pl-0 text-3xl font-semibold'>
                    Care<span className='text-primary'>Helper</span>
                  </h3>
                ) : (
                  <h3>Logo</h3>
                )}
              </Link>
            </li>

            <div className='flex flex-col gap-1'>
              {sidebarOption.map(({ icon: Icon, id, title, to }) => (
                <li key={id}>
                  <Link
                    className={classNames(
                      'text-nowrap hover:bg-primary hover:text-white focus:!bg-primary focus:!text-white active:!bg-primary',
                      {
                        'tooltip tooltip-right': !showSidebar,
                        'bg-primary text-white':
                          (pathname !== path.home && to !== path.home && pathname.startsWith(path.home + to)) ||
                          (to === path.home && pathname === path.home)
                      }
                    )}
                    to={to}
                    data-tip={title}
                  >
                    <Icon className='h-6 w-6' />
                    {showSidebar && title}
                  </Link>
                </li>
              ))}
            </div>
          </div>

          <li>
            <Link
              to={path.login}
              className={`hover:bg-primary hover:text-white focus:!bg-primary focus:!text-white active:!bg-primary ${
                !showSidebar && 'tooltip tooltip-right'
              }`}
              data-tip={'Sign out'}
            >
              <HiArrowRightOnRectangle className='h-6 w-6' />
              {showSidebar && 'Sign out'}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
