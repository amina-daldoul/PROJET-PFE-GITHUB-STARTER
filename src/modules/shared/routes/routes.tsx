import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import repositoriesRoutes from '../../repositories/routes/routes'
import filesChangesRoutes from '../../FilesChanges/routes/routes'

const routes = [...sharedRoutes, ...authRoutes, ...repositoriesRoutes, ...filesChangesRoutes]

export default routes
