import axiosInstance from '../auth/utils/axios'
import { endpoints } from '../shared/store/routes/endpoints.routes'

export interface Repository {
  id: number
  name: string
  description: string | null
  private: boolean
}

export const fetchPublicRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await axiosInstance.get(endpoints.getRepositories, {
      params: {
        per_page: 100,
        sort: 'updated',
      },
    })
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw new Error('Failed to fetch public repositories')
  }
}
