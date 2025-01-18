import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Dispatch, SetStateAction } from 'react'

interface setSearchType {
  setSearch: Dispatch<SetStateAction<string>>
}

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

export function Search({ setSearch }: setSearchType) {
  const { register, handleSubmit } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchRepository(data: SearchFormInputs) {
    setSearch(data.query)
  }

  return (
    <form onSubmit={handleSubmit(handleSearchRepository)}>
      <input
        type="text"
        placeholder="Buscar conteúdo"
        {...register('query')}
        className="bg-baseInput border-2 border-baseBorder focus:border-blue focus:outline-none placeholder:text-baseLabel text-baseText rounded-md px-4 py-3 w-full"
      />
    </form>
  )
}
