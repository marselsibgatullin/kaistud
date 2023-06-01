import { useLocation } from 'react-router';
import { SyntheticEvent, useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useUrl from "./useUrl"

export const useTab = () => {
  const { tab } = useUrl()
  const [tabIndex, setTabIndex] = useState<number | false>(tab ?? 0)

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleChangeTab = useCallback((event: SyntheticEvent, newValue: number) => {
    let params = new URLSearchParams()
    params.set("tab", newValue.toString())

    navigate({
      pathname,
      search: params.toString(),
    }, { replace: true })
  }, [pathname, navigate])

  useEffect(() => {
    if (tab !== undefined)
      setTabIndex(tab)
  }, [tab])

  return { tabIndex, handleChangeTab }
}