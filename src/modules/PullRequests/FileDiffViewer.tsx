import React, { useEffect, useState } from 'react';
import * as Diff2Html from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';
import './FileDiffViewer.scss';

interface Props {
    diffString?: string;
    filename?: string; // Prop pour le nom du fichier sélectionné
}

const FileDiffViewer: React.FC<Props> = ({ diffString, filename }) => {
    const [diffHtml, setDiffHtml] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const splitDiffByFile = (fullDiff: string, targetFilename: string): string | null => {
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
                // Heuristic to stop capturing: when we encounter the start of a new diff
                if (line.startsWith(`diff --git a/`) && !line.startsWith(`diff --git a/${targetFilename}`)) {
                    break;
                }
            }
        }

        return fileDiff.length > 0 ? fileDiff.join('\n') : null;
    };

    useEffect(() => {
        if (diffString && filename) {
            const fileSpecificDiff = splitDiffByFile(diffString, filename);
            if (fileSpecificDiff) {
                try {
                    const html = Diff2Html.html(fileSpecificDiff, {
                        inputFormat: 'diff',
                        outputFormat: 'side-by-side',
                        drawFileList: false,
                        highlight: true,
                        matching: 'lines',
                    });
                    setDiffHtml(html);
                } catch (err) {
                    console.error("Erreur lors de la génération du HTML diff pour le fichier:", err);
                    setError(String(err));
                }
            } else {
                setDiffHtml(null);
                setError(`Aucun diff trouvé pour le fichier : ${filename}`);
            }
        } else if (diffString) {
            // Si aucun fichier n'est sélectionné, afficher le diff complet (optionnel, peut-être à retirer)
            try {
                const html = Diff2Html.html(diffString, {
                    inputFormat: 'diff',
                    outputFormat: 'side-by-side',
                    drawFileList: false,
                    highlight: true,
                    matching: 'lines',
                });
                setDiffHtml(html);
            } catch (err) {
                console.error("Erreur lors de la génération du HTML diff complet:", err);
                setError(String(err));
            }
        } else {
            setDiffHtml(null);
        }
    }, [diffString, filename]);

    if (!diffHtml && diffString && !filename) {
        return <p>Chargement du diff complet...</p>;
    }

    if (!diffHtml && diffString && filename) {
        return <p>Chargement du diff pour {filename}...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>Erreur : {error}</p>;
    }

    return (
        <div className="diff-viewer" dangerouslySetInnerHTML={{ __html: diffHtml || '' }} />
    );
};

export default FileDiffViewer;