import { RouteObject } from 'react-router-dom'
import { RouteLazy } from 'src/interface/app'
import Home from 'src/pages/Home'

// contanst url
const PATH_URL = {
  admin: '/admin'
} as const

// private routes (path, component)
export const PRIVATE_ROUTE: RouteLazy[] = [
  {
    path: '',
    element: () => import('src/pages/Home')
  }
]

export const DEFAULT_ROUTE: RouteObject[] = [
  {
    path: '',
    element: <Home />
  }
]

export default PATH_URL
