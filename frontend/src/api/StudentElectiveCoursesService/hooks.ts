import {Api} from "api/axios"
import {QueryOptions, useApiMutation, useApiQuery} from "api/query"
import {useQueryClient} from "react-query"
import {
    AddStudentElectiveCourse,
    StudentElectiveCourse,
    StudentElectiveCoursesFilters
} from "./StudentElectiveCoursesService.interface";
import {studentElectiveCoursesService} from "./index";
import {useNotifications} from "../../shared/hooks/useNotifications";

export const STUDENT_ELECTIVES_KEY = "student-electives"
type StudentElectiveCoursesKey = [typeof STUDENT_ELECTIVES_KEY, StudentElectiveCoursesFilters]

export const useStudentElectiveCourses = (
    data?: StudentElectiveCoursesFilters,
    options: QueryOptions<PaginationList<StudentElectiveCourse>, StudentElectiveCoursesKey> = {}
) =>
    useApiQuery<PaginationList<StudentElectiveCourse>, StudentElectiveCoursesKey>(
        [STUDENT_ELECTIVES_KEY, data ?? {}],
        () => studentElectiveCoursesService.getStudentElectiveCourses(data).then(Api.getResponseData),
        options,
    )

const STUDENT_ELECTIVE_KEY = "student-elective"
type StudentElectiveCourseKey = [typeof STUDENT_ELECTIVE_KEY, number]

export const useStudentElectiveCourse = (id: number, options: QueryOptions<StudentElectiveCourse, StudentElectiveCourseKey> = {}) =>
    useApiQuery<StudentElectiveCourse, StudentElectiveCourseKey>(
        [STUDENT_ELECTIVE_KEY, id],
        () => studentElectiveCoursesService.getStudentElectiveCourse(id)
            .then(Api.getResponseData),
        options,
    )

export const useAddStudentElectiveCourse = () => {
    const query = useQueryClient()
    const {notification} = useNotifications()

    return useApiMutation(
        (data: AddStudentElectiveCourse) =>
            studentElectiveCoursesService
                .addStudentElectiveCourse(data)
                .then(Api.getResponseData),
        {
            onSuccess: () => {
                query.invalidateQueries([STUDENT_ELECTIVES_KEY])
                notification.succes("Вы успешно записались на курс!")
            }
        }
    )
}