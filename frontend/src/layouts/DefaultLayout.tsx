import Navbar from 'src/layouts/components/navbar'
import Sidebar from 'src/layouts/components/sidebar'
import { ReactWithChild } from 'src/interface/app'
import { useContext } from 'react'
import { AppContext, AppContextType } from 'src/contexts/app.context'
import classNames from 'classnames'

export default function DefaultLayout({ children }: ReactWithChild) {
  const { showSidebar } = useContext<AppContextType>(AppContext)
  return (
    <div className='bg-bg_primary'>
      <Navbar />
      <Sidebar />
      <div
        className={classNames('flex min-h-screen w-full flex-col items-center pt-16', {
          'lg:pl-[18rem]': showSidebar,
          'lg:pl-24': !showSidebar
        })}
      >
        {children}
      </div>
    </div>
  )
}
