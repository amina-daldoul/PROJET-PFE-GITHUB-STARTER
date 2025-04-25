import CardSkew from '@src/modules/shared/components/Cards/Cards-SKEW/Card-skew'
import NoData from '@src/modules/shared/components/NoData'
import { useQuery } from '@tanstack/react-query'
import { fetchPublicRepositories } from '../repositories/api'
import { useAppSelector } from '../shared/store'
import LoadingScreen from '../shared/components/Loading'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react' // Ajouté pour le debogage

const Repositories = () => {
  const { user } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()

  // Debug: Affiche l'objet user complet
  useEffect(() => {
    console.log('User data in Repositories:', user)
  }, [user])

  const {
    data: repositories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['repositories', {}],
    queryFn: () => fetchPublicRepositories(),
  })

  const handleRepositoryClick = (repo: { id: string; name: string }) => {
    // Solution 1: Utilisation sécurisée avec fallback
    const owner =
      user?.login || user?.user_metadata?.user_name || user?.email?.split('@')[0] || 'default_owner' // Fallback ultime

    if (!owner) {
      console.error('Cannot determine repository owner:', user)
      alert("Erreur : Impossible d'identifier le propriétaire du dépôt")
      return
    }

    console.log(`Navigating to: /repositories/${owner}/${repo.name}/pulls`) // Debug
    navigate(`/repositories/${owner}/${repo.name}/pulls`)
  }

  if (isLoading) return <LoadingScreen size="full" blur />
  if (error) return <NoData title="Failed to load public repositories" />

  return (
    <div className="repositories-container">
      {repositories?.length ? (
        repositories.map((repo, index) => (
          <CardSkew
            key={repo.id}
            autoColors={index + 1}
            onClick={() => handleRepositoryClick(repo)} // Modifié
          >
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
