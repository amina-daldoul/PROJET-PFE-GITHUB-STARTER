import * as Diff2Html from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'
import { useParams } from 'react-router-dom'

import { useQuery } from '@tanstack/react-query'
import { Tooltip } from 'antd'
import { useState } from 'react'

import { PATH } from '../auth/routes/paths'
import LoadingScreen from '../shared/components/Loading'
import MainContainer from '../shared/layout/MainContainer/MainContainer'
import { FetchCommitFiles, fetchCommitDiffRaw } from './api/api'
import ReviewButton from '../shared/components/Buttons/Review'
import emptyFile from '../shared/assets/images/folder_empty.png'
import { set } from 'date-fns'

const FilesChanges = () => {
  const { repo, owner, sha } = useParams()
  const [fileDiffContent, setFileDiffContent] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<any>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['filesChanges', owner, repo, sha],
    queryFn: () => FetchCommitFiles(owner!, repo!, sha!),
  })
  const { data: diffString } = useQuery({
    queryKey: ['diff-string', owner, repo, sha],
    queryFn: () => fetchCommitDiffRaw(owner!, repo!, sha!),
  })

  const getFileDiffContent = (file: string) => {
    const fileDiff = diffString?.split('diff --git').filter((diff: string) => !!diff)
    const diffContent = fileDiff?.find((diff: string) => diff.includes(file))
    setFileDiffContent(diffContent!)
  }

  const files = data?.files
  const hasDiffString = !!fileDiffContent

  const diffHtml =
    hasDiffString &&
    Diff2Html.html(fileDiffContent!, {
      inputFormat: 'diff',
      highlight: true,
      //@ts-ignore
      colorScheme: 'dark',
      outputFormat: 'line-by-line',
      drawFileList: true,
      DiffStyleType: 'char',
    })

  const handelFileSelect = (file: string) => {
    getFileDiffContent(file)
    setSelectedFile(file)
  }

  if (isLoading) return <LoadingScreen size="full" blur />

  return (
    <MainContainer
      linkProps={{
        links: [
          { name: 'repositories', href: PATH.REPOSITORIES },
          {
            name: 'pull requests',
            href: PATH.PULLREQUESTS.replace(':repo', repo!).replace(':owner', owner!),
          },
          { name: 'commit', href: '' },
        ],
        title: data?.commit?.message!,
      }}
      style={{ paddingBottom: 0 }}
    >
      <div className="one-commit-page">
        <div className="one-commit-page__files">
          <p className="one-commit-page__files__title">Files :</p>
          {files?.map((file: any) => (
            <div
              className={`one-commit-page__files__one-file ${
                selectedFile?.filename === file.filename &&
                'one-commit-page__files__one-file--active'
              }`}
              key={file.filename}
              onClick={() => handelFileSelect(file.filename)}
            >
              <p className="one-commit-page__files__one-file__name">{file.filename}</p>
              <div className="one-commit-page__files__one-file__stats">
                <Tooltip title={'deletions'} color={'#ef233c'}>
                  <span className="one-commit-page__file-changes one-commit-page__file-changes--delete">
                    {`${file?.deletions}`.padStart(2, '0')}
                  </span>
                </Tooltip>
                <Tooltip title={'additions'} color={'#2dc653'}>
                  <span className="one-commit-page__file-changes one-commit-page__file-changes--addition">
                    {`${file?.additions}`.padStart(2, '0')}
                  </span>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>

        <div className="one-commit-page__content">
          <p className="one-commit-page__files__title">File Content :</p>
          <div className="one-commit-page__content__blanc">
            <div className="one-commit-page__content__blanc__editor">
              {diffHtml ? (
                <div className="code-diff__wrapper">
                  <div className="code-diff" dangerouslySetInnerHTML={{ __html: diffHtml }} />
                </div>
              ) : (
                <div className="one-commit-page__content__blanc__one-file">
                  <img className="one-commit-page__content__blanc__one-file__src" src={emptyFile} />
                  <p className="one-commit-page__content__blanc__one-file__message">
                    no file selected
                  </p>
                </div>
              )}
            </div>
            {selectedFile ? (
              <div className="stream-wrapper__button">
                <ReviewButton title={'Review changes'} onClick={() => console.log('holla')} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </MainContainer>
  )
}

export default FilesChanges
