/* eslint-disable @typescript-eslint/no-explicit-any */
import UniverseWrapper from '@src/modules/shared/layout/UniverseWrapper'
import { Fragment, lazy } from 'react'
import { RouteProps, Navigate } from 'react-router-dom'
import GuestGuard from '../../shared/guards/GuestGuard'
import { PATH } from './paths'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment | any
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    component: () => <Navigate to={PATH.LOGIN} replace />,
  },
  {
    exact: true,
    guard: GuestGuard,
    path: PATH.LOGIN,
    component: lazy(() => import('../features/Login/Login')),
    layout: (props: any) => <UniverseWrapper {...props} />,
  },
]

export default routes
