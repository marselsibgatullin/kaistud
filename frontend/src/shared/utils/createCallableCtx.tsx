import { createContext, useContext as useReactContext } from "react"
import { FCC } from "../../global/types"

type ContextParams = {
	name?: string
}

export function createCallableCtx<R>(value: () => R, { name }: ContextParams): readonly [() => R, FCC] {
	const Ctx = createContext<R>({} as R)

	const useContext = () => {
		const context = useReactContext(Ctx)

		if (context === undefined) {
			throw new Error("useContext must be inside a Provider with a value")
		}

		return context
	}

	const Provider: FCC = ({ children }) => <Ctx.Provider value={value()}>{children}</Ctx.Provider>

	if (name) {
		Provider.displayName = name
	}

	return [useContext, Provider] as const
}
