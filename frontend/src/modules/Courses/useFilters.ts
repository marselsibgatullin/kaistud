import { useMemo } from "react"
import { Query } from "shared/hooks/useTableQuery"

export type Values = {
	start?: number,
	length?: number,
}