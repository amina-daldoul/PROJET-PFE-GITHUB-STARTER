import { useQuery } from '@tanstack/react-query'
import { fetchCommitsForPR } from './api/api'
import LoadingScreen from '../shared/components/Loading'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Importez useNavigate
import './CommitsList.scss'
import { PATH } from '../auth/routes/paths'

interface Props {
  user: string
  repo: string
  prNumber: number
}

const CommitsList: React.FC<Props> = ({ user, repo, prNumber }) => {
  const [selectedSha, setSelectedSha] = useState<string | null>(null)
  const navigate = useNavigate() // Initialisez useNavigate

  const {
    data: commits,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['commits', user, repo, prNumber],
    queryFn: () => fetchCommitsForPR(user, repo, prNumber),
  })

  const handleCommitClick = (sha: string) => {
    setSelectedSha(sha)
    navigate(PATH.FilesChanges.replace(':owner', user).replace(':repo', repo).replace(':sha', sha))
  }

  if (isLoading) return <LoadingScreen />
  if (error) return <p>Échec du chargement des commits.</p>

  return (
    <div className="commits-page">
      <div className="commits-list-section">
        <span className="commits-list-label">Commits List :</span>
        {commits?.map((c) => (
          <div
            key={c.sha}
            className={`commit-item ${selectedSha === c.sha ? 'selected' : ''}`}
            onClick={() => handleCommitClick(c.sha)}
          >
            <img src={c.author?.avatar_url} alt="Avatar" className="commit-avatar" />
            <div className="commit-info">
              <span className="commit-message">{c.commit.message}</span>
              <span className="commit-date">
                Created at: {new Date(c.commit.author.date).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommitsList
