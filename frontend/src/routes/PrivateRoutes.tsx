import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { path } from 'src/constants/path'
import { AppContext, AppContextType } from 'src/contexts/app.context'
import DefaultLayout from 'src/layouts/DefaultLayout'

function PrivateRoutes() {
  const { isAuthenticated } = useContext<AppContextType>(AppContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(path.login)
    }
  }, [])
  // TODO useRoutes
  if (!isAuthenticated) {
    return null
  }

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}

export default PrivateRoutes
