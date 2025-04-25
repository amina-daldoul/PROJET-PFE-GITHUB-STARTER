import React from 'react'
import { useParams } from 'react-router-dom'
import { Collapse } from 'antd'
import MainContainer from '../shared/layout/MainContainer/MainContainer'
import PullRequestList from './PullRequestList'
import './PullRequests.css'

const { Panel } = Collapse

const PullRequestPage = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>()
  const githubToken = import.meta.env.VITE_GITHUB_TOKEN || ''

  return (
    <MainContainer
      linkProps={{
        title: 'PROJET-PFE-GITHUB-STARTER',
        links: [
          { name: 'Repositories', href: '/' },

          { name: 'Pull Requests', href: '#' },
        ],
      }}
    >
      <Collapse ghost className="pr-info-collapse" defaultActiveKey={['tech-info']}>
        <Panel
          header={
            <div className="pr-panel-header">
              <span className="pr-panel-title">Informations Techniques</span>
              <span className="pr-panel-subtitle">
                {owner}/{repo}
              </span>
            </div>
          }
          key="tech-info"
        >
          <div className="pr-tech-details">
            <div className="pr-detail-item">
              <span className="pr-detail-label">Propriétaire:</span>
              <span className="pr-detail-value">{owner}</span>
            </div>
            <div className="pr-detail-item">
              <span className="pr-detail-label">Dépôt:</span>
              <span className="pr-detail-value">{repo}</span>
            </div>
            <div className="pr-detail-item">
              <span className="pr-detail-label">Statut API:</span>
              <span className="pr-detail-value">{githubToken ? 'Connecté' : 'Token manquant'}</span>
            </div>
          </div>
        </Panel>
      </Collapse>

      {owner && repo ? (
        <PullRequestList user={owner} repo={repo} token={githubToken} />
      ) : (
        <div className="pr-error-container">
          <h3 className="pr-error-title">Erreur de chargement</h3>
          <p className="pr-error-message">
            Format d'URL invalide. Attendu: /repositories/:owner/:repo/pulls
          </p>
        </div>
      )}
    </MainContainer>
  )
}

export default PullRequestPage
