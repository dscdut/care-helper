import { RouteObject, useRoutes } from 'react-router-dom'
import { DEFAULT_ROUTE, PRIVATE_ROUTE } from '../path'

// component
import { Suspense, lazy } from 'react'
import { RouteLazy } from '../../interface/app'
import NotFoundPage from '../../pages/not-found'
import PrivateRoute from '../../routes/PrivateRoutes'
import DefaultRoute from '../../routes/DefaultRoutes'

interface RouteElement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routeElement: () => Promise<any>
  isPrivate?: boolean
}
interface LazyRouteProps {
  routes: RouteLazy[]
}
function LazyElement({ routeElement }: RouteElement) {
  const LazyComponent = lazy(routeElement)
  return (
    <Suspense
      fallback={
        <div className='flex h-screen w-full items-center justify-center'>
          <span className='loading loading-spinner loading-lg'></span>
        </div>
      }
    >
      <LazyComponent />
    </Suspense>
  )
}
function wrapRoutesWithLazy({ routes }: LazyRouteProps): RouteObject[] {
  return routes?.map((route: RouteLazy) => ({
    path: route.path,
    element: <LazyElement routeElement={route.element} />,
    ...(route.children && { children: wrapRoutesWithLazy({ routes: route.children }) })
  }))
}
export default function useRouteElements() {
  const routeElements = [
    {
      path: '*',
      element: <NotFoundPage />
    },

    {
      path: '/',
      element: <DefaultRoute />,
      children: DEFAULT_ROUTE
    },
    {
      path: '/admin',
      element: <PrivateRoute />,
      children: wrapRoutesWithLazy({ routes: PRIVATE_ROUTE })
    }
  ]
  return useRoutes(routeElements)
}
