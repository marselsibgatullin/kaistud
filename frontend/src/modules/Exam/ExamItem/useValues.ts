import { useMemo } from "react";

export type Values = {
	question: string,
	answer: string,
}

export const useValues = (exam:Values) => {
	const values: Values = useMemo(() => ({
		question: exam.question ?? "",
		answer: exam.answer ?? "",
	}), [])

	return { values }
}