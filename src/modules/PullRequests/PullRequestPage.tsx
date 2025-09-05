import { useParams } from 'react-router-dom'
import { PATH } from '../auth/routes/paths'
import MainContainer from '../shared/layout/MainContainer/MainContainer'
import PullRequestList from './PullRequestList'

const PullRequestPage = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>()

  return (
    <MainContainer
      linkProps={{
        title: 'PROJET-PFE-GITHUB-STARTER',
        links: [
          { name: 'Repositories', href: PATH.REPOSITORIES },

          { name: 'Pull Requests', href: '/' },
        ],
      }}
    >
      <PullRequestList user={owner!} repo={repo!} />
    </MainContainer>
  )
}

export default PullRequestPage
