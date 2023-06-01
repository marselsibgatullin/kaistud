import {useState} from "react"
import {createCallableCtx} from "shared/utils/createCallableCtx"

const useHook = () => {
    const [title, setTitle] = useState("")
    const [selectedGroup, setSelectedGroup] = useState<number | "">("")

    return {
        title,
        setTitle,
        selectedGroup,
        setSelectedGroup,
    }
}

export const [useHeaderContext, HeaderContextProvider] = createCallableCtx(useHook, {name: "HeaderContextProvider"})

