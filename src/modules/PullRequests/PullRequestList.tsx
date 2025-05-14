import { useQuery } from '@tanstack/react-query'
import { Collapse } from 'antd'
import LoadingScreen from '../shared/components/Loading'
import CommitsList from './CommitsList'
import { fetchPublicPullRequest } from './api/api'

const { Panel } = Collapse

const PullRequestList = ({ user, repo }: { user: string; repo: string }) => {
  const { data: pullRequests, isLoading } = useQuery({
    queryKey: ['pullrequest', user, repo],
    queryFn: () => fetchPublicPullRequest(user, repo),
  })

  if (isLoading) return <LoadingScreen size="full" blur />
  if (pullRequests?.length === 0) return <div className="pr-empty">Aucune pull request trouvée</div>

  return (
    <Collapse accordion className="pr-main-collapse" expandIconPosition="end">
      {pullRequests?.map((pr) => (
        <Panel
          key={pr.id}
          header={
            <div className="pr-header">
              <div className="pr-left">
                <span className={`pr-state pr-state-${pr.state}`}>#{pr.number}</span>
                <span className="pr-title">{pr.title}</span>
                <span className="pr-user">@{pr.user.login}</span>
              </div>
              <div className="pr-right">
                <span className="pr-date">Updated at : {new Date(pr.created_at).toLocaleString()}</span>
              </div>
            </div>
          }
          className="pr-item"
        >
          {pr.body && <div className="pr-description"><h4>Description</h4><p>{pr.body}</p></div>}
          <CommitsList user={user} repo={repo} prNumber={pr.number} />
        </Panel>
      ))}
    </Collapse>
  )
}

export default PullRequestList
