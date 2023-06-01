import {Api} from "api/axios"
import {QueryOptions, useApiMutation, useApiQuery} from "api/query"
import {useQueryClient} from "react-query"
import {AddStudGroupCourses, StudGroupCourse, StudGroupCoursesFilters} from "./StudGroupCoursesService.interface";
import {studGroupCoursesService} from "./index";

export const STUD_GROUP_COURSES_KEY = "stud-group-courses"
type StudGroupCoursesKey = [typeof STUD_GROUP_COURSES_KEY, StudGroupCoursesFilters]

export const useStudGroupCourses = (
    data: StudGroupCoursesFilters,
    options: QueryOptions<PaginationList<StudGroupCourse>, StudGroupCoursesKey> = {}
) =>
    useApiQuery<PaginationList<StudGroupCourse>, StudGroupCoursesKey>(
        [STUD_GROUP_COURSES_KEY, data],
        () => studGroupCoursesService.getStudGroupCourses(data).then(Api.getResponseData),
        options,
    )

const STUD_GROUP_COURSE_KEY = "stud-group-course"
type StudGroupCourseKey = [typeof STUD_GROUP_COURSE_KEY, string]

export const useCourse = (id: string, options: QueryOptions<StudGroupCourse, StudGroupCourseKey> = {}) =>
    useApiQuery<StudGroupCourse, StudGroupCourseKey>(
        [STUD_GROUP_COURSE_KEY, id],
        () => studGroupCoursesService.getStudGroupCourse(id)
            .then(Api.getResponseData),
        options,
    )

export const useAddStudGroupCourses = () => {
    const query = useQueryClient()

    return useApiMutation(
        (data: AddStudGroupCourses) =>
            studGroupCoursesService
                .addStudGroupCourse(data)
                .then(Api.getResponseData),
        {
            onSuccess: () => {
                query.invalidateQueries([STUD_GROUP_COURSES_KEY])
            }
        }
    )
}
