import { useCallback, useState } from "react"
import { createCallableCtx } from "shared/utils/createCallableCtx"
import {Teacher} from "../../../api/TeachersService/TeachersService.interface";

type ModalState = {
    type: "add",
    teacher?: Teacher,
} | {
    type: null,
    teacher?: undefined,
}

const useHook = () => {
    const [modalState, setModalState] = useState<ModalState>({ type: null })

    const openAdd = useCallback(() => {
        setModalState({ type: "add" })
    }, [])

    const closeModal = useCallback(() => {
        setModalState({ type: null })
    }, [])

    return {
        modalState,
        openAdd,
        closeModal,
    }
}

export const [useTeachersContext, TeachersContextProvider] = createCallableCtx(useHook, { name: "TeachersContextProvider" })

