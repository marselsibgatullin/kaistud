import { useCallback, useState } from "react"
import { createCallableCtx } from "shared/utils/createCallableCtx"
import {StudGroupCourse} from "../../../api/StudGroupCoursesService/StudGroupCoursesService.interface";

type ModalState = {
    type: "add",
    studGroupCourse?: StudGroupCourse,
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

export const [useStudGroupCoursesContext, StudGroupCoursesContextProvider] = createCallableCtx(useHook, { name: "StudGroupCoursesContextProvider" })

