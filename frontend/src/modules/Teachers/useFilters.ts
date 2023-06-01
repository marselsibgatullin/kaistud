import { useMemo } from "react"
import { Query } from "shared/hooks/useTableQuery"

export type Values = {
	start?: number,
	length?: number,
}

export const useFilters = (query: Query) => {
	const defaultValues: Values = useMemo(() => ({
	}), [])

	const values: Values = useMemo(() => ({
	}), [query])

	return { defaultValues, values }
}