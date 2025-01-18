import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { GitIcon } from '../../assets/gitIcon'
import { LinkIcon } from '../../assets/linkIcon'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import Markdown from 'react-markdown'
import { CaretLeft } from '../../assets/caretLeft'
import { DateIcon } from '../../assets/dateIcon'
import { CommentsIcon } from '../../assets/commentsIcon'

interface IssueSelected {
  comments: number
  created_at: number
  html_url: string
  user: {
    login: string
  }
  body: string
  title: string
}

export function Repository() {
  const username = 'ValdeciNovak'
  const repo = 'git-blog'
  const params = useParams()
  const [issue, setIssue] = useState<IssueSelected>()

  
  const ProfilePage = useCallback(async () => {
    const response = await axios.get(
      `https://api.github.com/repos/${username}/${repo}/issues/${params.id}`
    )

    setIssue(response.data)
  }, [params])

  useEffect(() => {
    ProfilePage()
  }, [ProfilePage])

  return (
    <div className="min-h-screen bg-baseBackground">
      <div className="flex flex-col w-full items-center">
        <div className="flex items-center w-1/2 mt-[-4rem] flex-col">
          <div className=" w-full justify-center  items-center flex bg-profile rounded-[10px] shadow-md shadow-black">
            <div className="pt-10 h-full pr-8 pb-8 w-full pl-8">
              <div className="flex justify-between h-full w-full flex-col">
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-5">
                    <Link to={'/'}>
                      <div className="flex gap-1 items-center">
                        <CaretLeft />
                        <span className="text-blue font-nunito flex gap-1 items-center font-nunito700 text-xs">
                          VOLTAR
                        </span>
                      </div>
                    </Link>
                    <a
                      href={issue?.html_url}
                      className="text-blue font-nunito flex gap-1 items-center font-nunito700 text-xs"
                      target="noreferrer"
                    >
                      VER NO GITHUB
                      <LinkIcon />
                    </a>
                  </div>
                  <h1 className="font-nunito font-nunito700 leading-130 text-2xl text-baseTitle">
                    {issue?.title}
                  </h1>
                </div>
                <div className="flex space-x-6 end">
                  <div className="flex items-center gap-1">
                    <GitIcon />
                    <span className="text-baseSubtitle font-nunito font-nunito400 text-base leading-160">
                      {issue?.user.login}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DateIcon />
                    <span className="text-baseSubtitle font-nunito font-nunito400 text-base leading-160">
                      {issue?.created_at
                        ? formatDistanceToNow(new Date(issue.created_at), {
                            addSuffix: true,
                            locale: ptBR,
                          })
                        : 'Data não disponível'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CommentsIcon />
                    <span className="text-baseSubtitle font-nunito font-nunito400 text-base leading-160">
                      {issue?.comments} comentários
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="font-nunito font-nunito400 text-baseText leading-160 text-base py-10 px-8">
            <Markdown>{issue?.body}</Markdown>
          </span>
        </div>
      </div>
    </div>
  )
}
