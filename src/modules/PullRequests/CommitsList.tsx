import { useQuery } from '@tanstack/react-query'
import { fetchCommitsForPR } from './api/api'
import LoadingScreen from '../shared/components/Loading'

interface Props {
  user: string
  repo: string
  prNumber: number
}

const CommitsList: React.FC<Props> = ({
  user,
  repo,
  prNumber,
}: {
  user: string
  repo: string
  prNumber: number
}) => {
  const {
    data: commits,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['commits', user, repo, prNumber],
    queryFn: () => fetchCommitsForPR(user, repo, prNumber),
  })

  if (isLoading) return <LoadingScreen size="s" />
  if (error) return <p className="commits-error">Échec du chargement des commits.</p>

  return (
    <div className="commits-section">
      <span className="commits-list-label">Commits List :</span>
      {commits?.map((c) => (
        <div key={c.sha} className="commit-item">
          <img src={c.author?.avatar_url} alt="avatar" className="commit-avatar" />
          <div className="commit-info">
            <div className="commit-message">{c.commit.message}</div>
            <div className="commit-date">
              Created at: {new Date(c.commit.author.date).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CommitsList
