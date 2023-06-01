import {useMemo} from "react"
import {AddStudGroupCourses} from "../../../api/StudGroupCoursesService/StudGroupCoursesService.interface";

export const useValues = () => {
    const defaultValues: AddStudGroupCourses = useMemo(() => ({
        teacherId: null,
        courseId: null,
        studGroupId: null,
    }), [])

    return {defaultValues}
}