import { useCallback, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { setIntoUrl } from "../utils/setIntoUrl"
import useUrl from "./useUrl"

type Pagination = {
    page: number,
    perPage: number,
}

type Updater = {
    updater: number,
}

export type Query = Record<string, any> & Pagination & Updater

export const useTableQuery = <T>(initialFilters?: Omit<Query, keyof Updater>) => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const filters = useUrl()

    const [query, setQuery] = useState<T & Query>(initialFilters ? { ...initialFilters, ...filters, updater: 0 } as Query : {
        page: 1,
        perPage: 10,
        updater: 0,
        ...filters,
    })

    const setPage = useCallback((value: number) => {
        setQuery(prev => ({
            ...prev,
            page: value,
            updater: prev.updater + 1,
        }))
    }, [])

    const setPerPage = useCallback((value: number) => {
        setQuery(prev => ({
            ...prev,
            perPage: value,
            updater: prev.updater + 1,
        }))
    }, [])

    const setFilters = useCallback((filters: any) => {
        setQuery(prev => ({
            ...prev,
            ...filters,
            page: 1,
            updater: prev.updater + 1,
        }))
    }, [])

    const update = useCallback(() => {
        setQuery(prev => ({
            ...prev,
            updater: prev.updater + 1,
        }))
    }, [])

    useEffect(() => {
        let params = new URLSearchParams()

        for (let filter in query) {
            if (filter === "updater") continue

            setIntoUrl(params, query, filter)
        }

        navigate({
            pathname: pathname,
            search: params.toString()
        }, { replace: true })
    }, [navigate, pathname, query])

    return { query, setPage, setPerPage, setFilters, update }
}
