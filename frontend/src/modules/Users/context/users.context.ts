import { User } from "api/UserService/UserService.interface"
import { useCallback, useState } from "react"
import { createCallableCtx } from "shared/utils/createCallableCtx"

type ModalState = {
    type: "add",
    user?: User,
} | {
    type: "block",
    user: User,
} | {
    type: null,
    user?: undefined,
}

const useHook = () => {
    const [modalState, setModalState] = useState<ModalState>({ type: null })

    const openAdd = useCallback(() => {
        setModalState({ type: "add" })
    }, [])

    const openBlock = useCallback((user: User) => {
        setModalState({ type: "block", user })
    }, [])

    const closeModal = useCallback(() => {
        setModalState({ type: null })
    }, [])

    return {
        modalState,
        openAdd,
        openBlock,
        closeModal,
    }
}

export const [useUsersContext, UsersContextProvider] = createCallableCtx(useHook, { name: "UsersContextProvider" })

