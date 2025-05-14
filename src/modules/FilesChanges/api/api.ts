import axiosInstance from '../../auth/utils/axios'
import { endpoints } from '../../shared/store/routes/endpoints.routes'

interface Commit {
  sha: string
  commit: {
    message: string
    author: {
      date: string
    }
  }
  author: {
    avatar_url: string
  }
}

export const FetchCommitFiles = async (user: string, repo: string, sha: string): Promise<any> => {
  try {
    const response = await axiosInstance.get(
      endpoints.getOneFileChanges
        .replace(':owner', user)
        .replace(':repo', repo)
        .replace(':sha', sha)
    )
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw new Error('Failed to fetch commits for PullRequest')
  }
}

export const fetchCommitDiffRaw = async (
  user: string,
  repo: string,
  commitSHA: string
): Promise<string> => {
  try {
    const response = await axiosInstance.get(
      endpoints.getOneFileChanges
        .replace(':owner', user)
        .replace(':repo', repo)
        .replace(':sha', commitSHA),
      {
        headers: {
          Accept: 'application/vnd.github.v3.diff',
          'Content-Type': 'text/plain; charset=utf-8',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération du diff brut:', error)
    throw error
  }
}
