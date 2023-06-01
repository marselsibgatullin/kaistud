import { useCallback, useState } from "react"
import { createCallableCtx } from "shared/utils/createCallableCtx"
import {Course} from "../../../api/CoursesService/CoursesService.interface";

type ModalState = {
    type: "add",
    course?: Course,
} | {
    type: null,
    course?: undefined,
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

export const [useCoursesContext, CoursesContextProvider] = createCallableCtx(useHook, { name: "CoursesContextProvider" })

