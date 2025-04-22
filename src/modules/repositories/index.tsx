import CardSkew from '@src/modules/shared/components/Cards/Cards-SKEW/Card-skew'
import NoData from '@src/modules/shared/components/NoData'
import { useQuery } from '@tanstack/react-query'
import { fetchPublicRepositories } from '../repositories/api'
import { useAppSelector } from '../shared/store'
import LoadingScreen from '../shared/components/Loading'

const Repositories = () => {
  const { user } = useAppSelector((state) => state.auth)
  console.log(user)

  const {
    data: repositories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['repositories', {}],
    queryFn: () => fetchPublicRepositories(),
  })
  console.log(isLoading)
  if (isLoading) return <LoadingScreen size="full" blur />

  if (error) return <NoData title="Failed to load public repositories" />

  return (
    <div className="repositories-container">
      {repositories?.length ? (
        repositories.map((repo, index) => (
          <CardSkew key={repo.id} autoColors={index + 1}>
            <div className="project-card-content">
              <h1 className="project-title">{repo.name}</h1>
              <p className="project-description">{repo.description}</p>
              <div className="button-container">
                <button className="public-button">Public</button>
              </div>
            </div>
          </CardSkew>
        ))
      ) : (
        <NoData title="No Public Projects Found" />
      )}
    </div>
  )
}
export default Repositories
