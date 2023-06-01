import { Api } from 'api/axios'
import { dictionaryService } from '.'
import { QueryOptions, useApiQuery } from '../query'
import { Dictionary } from './DictionaryService.interface'

const STUD_GROUPS_KEY = "stud-groups"
type StudGroupsKey = [typeof STUD_GROUPS_KEY]

export const useStudGroups = (options: QueryOptions<Dictionary[], StudGroupsKey> = {}) =>
  useApiQuery<Dictionary[], StudGroupsKey>(
    [STUD_GROUPS_KEY],
    () => dictionaryService.getStudGroups().then(Api.getResponseData),
    {
      staleTime: 60 * 60 * 1000,
      cacheTime: 65 * 60 * 1000,
      ...options,
    }
  )