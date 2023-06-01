import {useCallback, useState} from "react"
import {createCallableCtx} from "shared/utils/createCallableCtx"
import {ElectiveCourse} from "../../../api/ElectiveCoursesService/ElectiveCoursesService.interface";
import {
    ElectiveCourseExamQuestion
} from "../../../api/ElectiveCourseExamQuestionsService/ElectiveCourseExamQuestionsService.interface";

type ModalState = {
    type: "add",
    course: ElectiveCourse,
    questions?: undefined,
} | {
    type: "edit",
    questions: ElectiveCourseExamQuestion[],
    course?: undefined,
} | {
    type: null,
    course?: undefined,
    questions?: undefined,
}

const useHook = () => {
    const [modalState, setModalState] = useState<ModalState>({type: null})

    const openAdd = useCallback((course: ElectiveCourse) => {
        setModalState({type: "add", course})
    }, [])

    const openEdit = useCallback((questions: ElectiveCourseExamQuestion[]) => {
        setModalState({type: "edit", questions})
    }, [])

    const closeModal = useCallback(() => {
        setModalState({type: null})
    }, [])

    return {
        modalState,
        openAdd,
        closeModal,
        openEdit
    }
}

export const [useElectiveCourseContext, ElectiveCourseContextProvider] = createCallableCtx(useHook, {name: "CourseContextProvider"})

