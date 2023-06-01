import { Roles } from "global/constants"
import { useMemo } from "react"
import { Query } from "shared/hooks/useTableQuery"

export type Values = {
	start?: number,
	length?: number,
	firstName?: string,
	lastName?: string,
	patronymic?: string,
	isBlocked?: boolean,
	email?: string,
	roles?: Roles[],
}

export const useFilters = (query: Query) => {
	const defaultValues: Values = useMemo(() => ({
		firstName: "",
		lastName: "",
		email: "",
		roles: [],
	}), [])

	const values: Values = useMemo(() => ({
		firstName: query.firstName ?? "",
		lastName: query.lastName ?? "",
		email: query.email ?? "",
		roles: query.roles ?? []
	}), [query])

	return { defaultValues, values }
}