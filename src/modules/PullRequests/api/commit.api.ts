import axiosInstance from '../../auth/utils/axios';

const getOneCommitChanges = '/repos/:owner/:repo/commits/:commitSHA';
const getCommitDetailsEndpoint = '/repos/:owner/:repo/commits/:sha';
const getCommitFilesEndpoint = '/repos/:owner/:repo/commits/:sha/files';

// 🔄 Récupère le diff brut d'un commit
export const fetchCommitDiffRaw = async (user: string, repo: string, commitSHA: string): Promise<string> => {
    try {
        const response = await axiosInstance.get(
            getOneCommitChanges
                .replace(':owner', user)
                .replace(':repo', repo)
                .replace(':commitSHA', commitSHA),
            {
                headers: {
                    'Accept': 'application/vnd.github.v3.diff',
                    'Content-Type': 'text/plain; charset=utf-8'
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération du diff brut:', error);
        throw error;
    }
};

// 🔄 Récupère les détails d'un commit
export const fetchCommitDetails = async (user: string, repo: string, sha: string) => {
    try {
        const response = await axiosInstance.get(
            getCommitDetailsEndpoint
                .replace(':owner', user)
                .replace(':repo', repo)
                .replace(':sha', sha)
        );
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des détails du commit:', error);
        throw error;
    }
};

// 🔄 Récupère uniquement les fichiers modifiés d'un commit
export const fetchCommitFiles = async (user: string, repo: string, sha: string) => {
    try {
        const response = await axiosInstance.get(
            getCommitDetailsEndpoint
                .replace(':owner', user)
                .replace(':repo', repo)
                .replace(':sha', sha)
        );
        return response.data.files;
    } catch (error) {
        console.error('Erreur lors de la récupération des fichiers du commit:', error);
        throw new Error('Impossible de récupérer les fichiers pour ce commit');
    }
};
