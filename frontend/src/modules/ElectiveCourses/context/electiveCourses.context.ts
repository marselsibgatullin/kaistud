import { useCallback, useState } from "react"
import { createCallableCtx } from "shared/utils/createCallableCtx"
import {ElectiveCourse} from "../../../api/ElectiveCoursesService/ElectiveCoursesService.interface";

type ModalState = {
    type: "add",
    course?: ElectiveCourse,
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

export const [useElectiveCoursesContext, ElectiveCoursesContextProvider] = createCallableCtx(useHook, { name: "CoursesContextProvider" })

