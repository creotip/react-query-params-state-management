import { useQueryParam, StringParam } from 'use-query-params'

export const useFilters = () => {
  const [categoryParam, setCategoryParam] = useQueryParam(
    'filterByCategory',
    StringParam
  )

  return {
    categoryParam,
    setCategoryParam,
  }
}
