import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import repositoriesRoutes from '../../repositories/routes/routes'
const routes = [...sharedRoutes, ...authRoutes, ...repositoriesRoutes]

export default routes
