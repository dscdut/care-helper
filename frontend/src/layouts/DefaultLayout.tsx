import Navbar from 'src/layouts/components/navbar'
import Sidebar from 'src/layouts/components/sidebar'
import classNames from 'classnames'
import { ReactWithChild } from 'src/interface/app'
import { useContext } from 'react'
import { AppContext, AppContextType } from 'src/contexts/app.context'

export default function DefaultLayout({ children }: ReactWithChild) {
  const { showSidebar } = useContext<AppContextType>(AppContext)
  return (
    <div className='bg-bg_primary'>
      <Navbar />
      <Sidebar />
      <div
        className={classNames('flex min-h-screen w-full flex-col items-center pt-16', {
          'lg:pl-72': showSidebar,
          'lg:pl-[88px]': !showSidebar
        })}
      >
        {children}
      </div>
    </div>
  )
}
