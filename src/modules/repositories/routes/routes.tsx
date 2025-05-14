/* eslint-disable @typescript-eslint/no-explicit-any */
import UniverseWrapper from '@src/modules/shared/layout/UniverseWrapper'
import { Fragment, lazy } from 'react'
import { RouteProps, Navigate } from 'react-router-dom'

import AuthGuard from '@src/modules/shared/guards/AuthGuard'
import { PATH } from '@src/modules/auth/routes/paths'
import MainLayout from '@src/modules/shared/layout/MainLayout/MainLayout'

type RouteConfig = {
  exact: boolean | null
  path: string
  component: React.ComponentType<any>
  guard?: React.ComponentType<any> | typeof Fragment | any
  layout?: React.ComponentType<any> | typeof Fragment
} & RouteProps

const routes: RouteConfig[] = [
  {
    exact: true,
    guard: AuthGuard,
    path: PATH.REPOSITORIES,
    component: lazy(() => import('../index')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: PATH.REPOSITORIES + '/:owner/:repo/pulls',
    component: lazy(() => import('@src/modules/PullRequests/PullRequestPage')),
    layout: MainLayout,
  },
  {
    exact: true,
    guard: AuthGuard,
    path: PATH.REPOSITORIES + '/:owner/:repo/commits/:sha', // Nouvelle route pour les détails du commit
    component: lazy(() => import('@src/modules/PullRequests/CommitDetailPage')), // Créez ce composant
    layout: MainLayout,
},
];
  

export default routes
