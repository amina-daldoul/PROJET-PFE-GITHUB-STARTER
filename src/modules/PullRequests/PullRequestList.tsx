import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Collapse } from 'antd'
import './PullRequests.css'

import { fetchPublicPullRequest } from './api'
import { useQuery } from '@tanstack/react-query'
import LoadingScreen from '../shared/components/Loading'

const { Panel } = Collapse

interface PullRequest {
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

const PullRequestList = ({ user, repo}: { user: string; repo: string}) => {
  const { data:pullRequests, isLoading ,error }= useQuery({queryKey:["pullrequest"],queryFn:()=>fetchPublicPullRequest(user ,repo)})
  
console.log({pullRequests})
  if (isLoading) return <LoadingScreen size="full" blur/>
  
  if ( pullRequests?.length && pullRequests?.length === 0) return <div className="pr-empty">Aucune pull request trouvée</div>

  return (
    <Collapse accordion className="pr-main-collapse" expandIconPosition="end">
      {pullRequests?.map((pr) => (
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
