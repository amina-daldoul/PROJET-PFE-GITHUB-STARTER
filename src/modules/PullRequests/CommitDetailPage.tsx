import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainContainer from '../shared/layout/MainContainer/MainContainer';
import CommitFilesList from './CommitFilesList';
import FileDiffViewer from './FileDiffViewer';
import { fetchCommitDiffRaw } from './api/commit.api';
import './CommitDetailPage.scss'; // Import du fichier de styles

interface RouteParams {
    owner: string;
    repo: string;
    sha: string;
}

const CommitDetailPage: React.FC = () => {
    const { owner, repo, sha } = useParams<RouteParams>();
    const [selectedFilename, setSelectedFilename] = useState<string | null>(null);
    const [selectedDiff, setSelectedDiff] = useState<string | null>(null);
    const [fullCommitDiff, setFullCommitDiff] = useState<string | null>(null);
    const [loadingDiff, setLoadingDiff] = useState<boolean>(false);
    const [diffError, setDiffError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDiff = async () => {
            if (owner && repo && sha) {
                setLoadingDiff(true);
                setDiffError(null);
                try {
                    const diff = await fetchCommitDiffRaw(owner, repo, sha);
                    setFullCommitDiff(diff);
                } catch (error: any) {
                    console.error("Erreur lors de la récupération du diff complet:", error);
                    setDiffError("Impossible de charger le diff complet.");
                    setFullCommitDiff(null);
                } finally {
                    setLoadingDiff(false);
                }
            }
        };

        fetchDiff();
    }, [owner, repo, sha]);

    const handleFileSelect = (filename: string) => {
        setSelectedFilename(filename);
        // Filtrer le diff complet pour obtenir le diff du fichier sélectionné
        const fileDiff = splitDiffByFile(fullCommitDiff, filename);
        setSelectedDiff(fileDiff);
    };

    return (
        <MainContainer
            linkProps={{
                title: 'First Commit',
                links: [
                    { name: 'Repositories', href: `/repositories` },
                    { name: 'Pull Requests', href: `/repositories/${owner}/${repo}/pulls` },
                    { name: 'Commit', href: '#' }, // Vous pouvez ajuster le lien ici
                ],
            }}
        >
            <h2>FILES: </h2>
            {sha && owner && repo && (
                <div className="commit-detail-page-content">
                    <div className="commit-files-list-container">
                       
                        <CommitFilesList
                            user={owner}
                            repo={repo}
                            sha={sha}
                            onFileSelect={handleFileSelect}
                        />
                    </div>
                    <div className="file-diff-viewer-container">
                        <h3>FILE CONTENT :</h3>
                        <>
                            {loadingDiff && <p>Chargement du diff complet...</p>}
                            {diffError && <p className="error-message">{diffError}</p>}
                            {selectedDiff && (
                                <FileDiffViewer diffString={selectedDiff} filename={selectedFilename} />
                            )}
                            {!selectedDiff && selectedFilename && !loadingDiff && !diffError && <p>Aucun changement significatif pour ce fichier dans ce commit.</p>}
                            {!selectedDiff && !selectedFilename && !loadingDiff && !diffError && <p>Sélectionnez un fichier pour afficher ses modifications.</p>}
                        </>
                    </div>
                </div>
            )}
        </MainContainer>
    );
};

// Fonction pour diviser le diff complet par fichier
const splitDiffByFile = (fullDiff: string | null, targetFilename: string): string | null => {
    if (!fullDiff || !targetFilename) {
        return null;
    }

    const diffLines = fullDiff.split('\n');
    let fileDiff: string[] = [];
    let capturing = false;

    for (const line of diffLines) {
        if (line.startsWith(`diff --git a/${targetFilename}`)) {
            capturing = true;
            fileDiff.push(line);
            continue;
        }

        if (capturing) {
            fileDiff.push(line);
            // Heuristique pour arrêter la capture : quand on rencontre le début d'un nouveau diff
            if (line.startsWith(`diff --git a/`) && !line.startsWith(`diff --git a/${targetFilename}`)) {
                break;
            }
        }
    }

    return fileDiff.length > 0 ? fileDiff.join('\n') : null;
};

export default CommitDetailPage;