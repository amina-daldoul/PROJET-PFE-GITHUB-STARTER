import axiosInstance from '../../auth/utils/axios';
import { endpoints } from '../../shared/store/routes/endpoints.routes';

interface PullRequest {
  id: number;
  number: number;
  title: string;
  html_url: string;
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  state: 'open' | 'closed';
  body?: string;
}

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  author: {
    avatar_url: string;
  };
}

export const fetchPublicPullRequest = async (user: string, repo: string): Promise<PullRequest[]> => {
  try {
    const response = await axiosInstance.get(
      endpoints.getPullRequests.replace(':user', user).replace(':repo', repo)
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch public PullRequest');
  }
};

export const fetchCommitsForPR = async (user: string, repo: string, prNumber: number): Promise<Commit[]> => {
  try {
    const response = await axiosInstance.get(
      endpoints.getPullRequestsCommits
        .replace(':user', user)
        .replace(':repo', repo)
        .replace(':ref', prNumber.toString())
    );
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch commits for PullRequest');
  }
};
