import { MutationFunction, QueryClient, QueryFunction, QueryKey, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "react-query"
import { useNotifications } from "shared/hooks/useNotifications"
import { ErrorResponse } from "./axios"

export const queryClient = new QueryClient()

export type QueryOptions<TQueryFnData = unknown, TQueryKey extends QueryKey = QueryKey, TData = TQueryFnData> = Omit<UseQueryOptions<TQueryFnData, ErrorResponse, TData, TQueryKey>, 'queryKey' | 'queryFn'>

export const useApiQuery = <
  TQueryFnData = unknown,
  TQueryKey extends QueryKey = QueryKey,
  TData = TQueryFnData,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<UseQueryOptions<TQueryFnData, ErrorResponse, TData, TQueryKey>, 'queryKey' | 'queryFn'>
) =>
  useQuery(
    queryKey,
    queryFn,
    {
      retry: false,
      refetchOnWindowFocus: false,
      ...options,
    },
  )

export const useApiMutation = <
  TData = unknown,
  TVariables = void,
  TContext = unknown,
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<UseMutationOptions<TData, ErrorResponse, TVariables, TContext>, 'mutationFn'>
) => {
  const { notification } = useNotifications()

  return useMutation(
    mutationFn,
    {
      ...options,
      onError: (error, variables, context) => {
        notification.error(error.response?.data.Detail ?? error.message ?? "Неизвестная ошибка")
        options?.onError?.(error, variables, context)
      }
    },
  )
}