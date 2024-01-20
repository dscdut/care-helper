import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import DefaultLayout from 'src/layouts/DefaultLayout'

function PrivateRoute() {
  // const [havePermission, setHavePermission] = useState(false) // Sau ni dung accessToken

  useEffect(() => {
    //handle redirect o day
  }, [])

  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  )
}

export default PrivateRoute
