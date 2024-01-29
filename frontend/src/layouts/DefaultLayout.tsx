import { ReactWithChild } from 'src/interface/app'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
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
        className={classNames('flex min-h-screen w-full flex-col items-center justify-center pt-16', {
          'lg:pl-[19rem]': showSidebar,
          'lg:pl-24': !showSidebar
        })}
      >
        {children}
      </div>
    </div>
  )
}
