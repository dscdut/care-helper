import { RouteObject } from 'react-router-dom'
import { path } from 'src/constants/path'
import Home from 'src/pages/Home'
import Login from 'src/pages/login/Login'
import Register from 'src/pages/register/Register'

// private routes (path, component)
export const AUTH_ROUTER: RouteObject[] = [
  {
    path: path.login,
    element: <Login />
  },
  {
    path: path.register,
    element: <Register />
  }
]

export const PRIVATE_ROUTER: RouteObject[] = [
  {
    path: '',
    element: <Home />
  }
]
