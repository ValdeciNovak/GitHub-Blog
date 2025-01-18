import axios from 'axios'
import { Search } from '../Search/search'
import { useCallback, useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { ptBR } from 'date-fns/locale/pt-BR'
import { formatDistanceToNow } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { LinkIcon } from '../../assets/linkIcon'
import { MapPinIcon } from '../../assets/companyIcon'
import { GitIcon } from '../../assets/gitIcon'
import { FollowersIcon } from '../../assets/followersIcon'
import type { Components } from 'react-markdown'

interface GitIssues {
  id: number
  url: string
  number: number
  title: string
  user: {
    login: string
  }

  comments: number
  created_at: number
  body: string
}

interface GitApi {
  name: string
  avatar_url: string
  bio: string
  location: string
  followers: number
  login: string
  html_url: string
  url: string
}

const MarkdownComponents: Components = {
  // Prevent anchor tags from being rendered as links
  a: ({ node, ...props }) => <span {...props} />,
  // Prevent any other interactive elements
  button: ({ node, ...props }) => <span {...props} />,
  input: ({ node, ...props }) => <span {...props} />,
  textarea: ({ node, ...props }) => <span {...props} />,
}

export function Home() {
  const [userGit, setUserGit] = useState<GitApi>()
  const [search, setSearch] = useState<string>('')
  const [issues, setIssues] = useState<GitIssues[]>()
  const navigate = useNavigate()
  const username = 'ValdeciNovak'
  const repo = 'git-blog'
  const publish = issues?.length

  const fetchUserGit = useCallback(async () => {
    const response = await axios.get(`https://api.github.com/users/${username}`)
    const data = response.data

    setUserGit(data)
  }, [])

  const fetchIssuesGit = useCallback(async () => {
    const response = await axios.get(
      `https://api.github.com/search/issues?q=${search}%20repo:${username}/${repo}`
    )

    const data = response.data.items
    setIssues(data)
  }, [search])

  const handleNavigation = useCallback(
    (issueNumber: number) => {
      navigate(`/issues/${issueNumber}`)
    },
    [navigate]
  )

  useEffect(() => {
    fetchIssuesGit()
  }, [fetchIssuesGit])

  useEffect(() => {
    fetchUserGit()
  }, [fetchUserGit])

  return (
    <div className="min-h-screen bg-baseBackground">
      <div className="flex flex-col w-full items-center">
        <div className="flex items-center w-1/2 mt-[-4rem] flex-col">
          <div className="h-[13.25rem] w-full mb-[4.5rem] justify-center  items-center flex bg-profile rounded-[10px] shadow-md shadow-black">
            <div className="ml-10 ">
              <img
                src={userGit?.avatar_url}
                alt=""
                className="rounded-lg min-w-[9.25rem] h-[9.25rem]"
              />
            </div>
            <div className="pt-10 h-full pr-8 pb-8 w-full pl-8">
              <div className="flex justify-between h-full w-full flex-col">
                <div>
                  <div className="flex justify-between mb-2">
                    <h1 className="font-nunito font-nunito700 leading-130 text-2xl text-baseTitle">
                      {userGit?.name}
                    </h1>

                    <a
                      href={userGit?.html_url}
                      className="text-blue font-nunito flex gap-1 items-center font-nunito700 text-xs"
                      target="noreferrer"
                    >
                      GITHUB
                      <LinkIcon />
                    </a>
                  </div>

                  <span className="font-nunito font-nunito400 text-baseText text-base leading-160">
                    {userGit?.bio}
                  </span>
                </div>
                <div className="flex space-x-6 end mt-6">
                  <div className="flex items-center gap-1">
                    <GitIcon />
                    <span className="text-baseSubtitle font-nunito font-nunito400 text-base leading-160">
                      {userGit?.login}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinIcon />
                    <span className="text-baseSubtitle font-nunito font-nunito400 text-base leading-160">
                      {userGit?.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FollowersIcon />
                    <span className="text-baseSubtitle font-nunito font-nunito400 text-base leading-160">
                      {userGit?.followers} seguidores
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" w-full mb-12">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg text-baseSubtitle font-nunito font-nunito700 leading-160">
                Publicações
              </span>
              <span className="text-baseSpan font-nunito font-nunito400 leading-160 text-sm">
                {publish} publicações
              </span>
            </div>
            <Search setSearch={setSearch} />
          </div>
          <div className="grid grid-cols-12 gap-8 w-full pb-[15.875rem]">
            {issues?.map(issue => {
              return (
                <div
                  key={issue.id}
                  className="col-span-6 rounded-[10px] bg-basePost p-8 h-[16.25rem] "
                >
                  <button
                    type="button"
                    onClick={() => handleNavigation(issue.number)}
                    className="w-full text-left cursor-pointer focus:outline-none focus:ring-4 focus:ring-baseBackground focus:ring-opacity-50 rounded-lg"
                  >
                    <div className="flex justify-between mb-5">
                      <h1 className="text-baseTitle leading-160 font-nunito font-nunito700 text-xl max-w-[14rem]">
                        {issue.title}
                      </h1>
                      <span className="text-baseSpan font-nunito font-nunito400 leading-160 text-sm  min-w-[3.125rem] text-right">
                        {formatDistanceToNow(new Date(issue.created_at), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                    <span className="line-clamp-4 text-base  leading-160 font-nunito font-nunito400 text-baseText">
                      <Markdown
                        components={MarkdownComponents}
                        className="pointer-events-none"
                      >
                        {issue.body}
                      </Markdown>
                    </span>
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
