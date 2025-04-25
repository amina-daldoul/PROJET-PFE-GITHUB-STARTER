import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Collapse } from 'antd'
import './PullRequests.css'

const { Panel } = Collapse

interface IPullRequest {
  id: number
  number: number
  title: string
  html_url: string
  user: {
    login: string
    avatar_url: string
  }
  created_at: string
  state: 'open' | 'closed'
  body?: string
}

const PullRequestList = ({ user, repo, token }: { user: string; repo: string; token: string }) => {
  const [pullRequests, setPullRequests] = useState<IPullRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPRs = async () => {
      try {
        const url = `https://api.github.com/repos/${user}/${repo}/pulls?state=all`
        const headers = token ? { Authorization: `Bearer ${token}` } : {}
        const response = await axios.get<IPullRequest[]>(url, { headers })
        setPullRequests(response.data)
      } catch (err: any) {
        setError(
          err.response?.status === 404 ? `Dépôt "${repo}" introuvable` : 'Erreur de chargement'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchPRs()
  }, [user, repo, token])

  if (loading) return <div className="pr-loading">Chargement en cours...</div>
  if (error) return <div className="pr-error">{error}</div>
  if (pullRequests.length === 0) return <div className="pr-empty">Aucune pull request trouvée</div>

  return (
    <Collapse accordion className="pr-main-collapse" expandIconPosition="end">
      {pullRequests.map((pr) => (
        <Panel
          key={pr.id}
          header={
            <div className="pr-header">
              <span className={`pr-state pr-state-${pr.state}`}>#{pr.number}</span>
              <span className="pr-title">{pr.title}</span>
              <span className="pr-user">@{pr.user.login}</span>
              <span className="pr-date">{new Date(pr.created_at).toLocaleDateString()}</span>
            </div>
          }
          className="pr-item"
        >
          <div className="pr-content">
            {pr.body && (
              <div className="pr-description">
                <h4>Description</h4>
                <p>{pr.body}</p>
              </div>
            )}
            <a href={pr.html_url} target="_blank" rel="noopener noreferrer" className="pr-link">
              Voir sur GitHub
            </a>
          </div>
        </Panel>
      ))}
    </Collapse>
  )
}

export default PullRequestList
