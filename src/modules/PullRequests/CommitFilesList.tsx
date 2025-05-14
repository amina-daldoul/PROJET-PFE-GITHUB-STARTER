import React, { useState, useEffect } from 'react';
import { fetchCommitFiles } from './api/commit.api';
import LoadingScreen from '../shared/components/Loading';
import './CommitFilesList.scss'; // Import du fichier de styles

interface Props {
    user: string;
    repo: string;
    sha: string;
    onFileSelect: (filename: string) => void; // Nouvelle prop pour notifier la sélection
}

interface File {
    filename: string;
    status: string;
    additions: number;
    deletions: number;
    changes: number;
}

const CommitFilesList: React.FC<Props> = ({ user, repo, sha, onFileSelect }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("CommitFilesList - user:", user, "repo:", repo, "sha:", sha);
        const fetchFiles = async () => {
            try {
                const filesResponse = await fetchCommitFiles(user, repo, sha);
                setFiles(filesResponse || []); // Accéder directement au tableau
                console.log("CommitFilesList - filesData:", filesResponse);
                setIsLoading(false);
            } catch (err) {
                setError('Impossible de charger les fichiers modifiés.');
                setIsLoading(false);
            }
        };
        fetchFiles();
    }, [user, repo, sha]);

    if (isLoading) return <LoadingScreen />;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="commit-files-section">
            <h3>Fichiers Modifiés :</h3>
            <ul className="commit-files-list">
                {files.map((file) => (
                    <li
                        key={file.filename}
                        className={`commit-file-item ${file.status}`}
                        onClick={() => onFileSelect(file.filename)} // Notifier la sélection du fichier
                    >
                        <span className="filename">{file.filename}</span>
                        {file.additions > 0 && <span className="additions">+ {file.additions}</span>}
                        {file.deletions > 0 && <span className="deletions">- {file.deletions}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommitFilesList;