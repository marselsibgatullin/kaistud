import {Api} from "api/axios"
import {QueryOptions, useApiMutation, useApiQuery} from "api/query"
import {useQueryClient} from "react-query"
import {AddElectiveCourse, ElectiveCourse, ElectiveCoursesFilters} from "./ElectiveCoursesService.interface";
import {electiveCoursesService} from "./index";

export const ELECTIVE_COURSES_KEY = "elective-courses"
type ElectiveCoursesKey = [typeof ELECTIVE_COURSES_KEY, ElectiveCoursesFilters]

export const useElectiveCourses = (
    data?: ElectiveCoursesFilters,
    options: QueryOptions<PaginationList<ElectiveCourse>, ElectiveCoursesKey> = {}
) =>
    useApiQuery<PaginationList<ElectiveCourse>, ElectiveCoursesKey>(
        [ELECTIVE_COURSES_KEY, data ?? {}],
        () => electiveCoursesService.getElectiveCourses(data).then(Api.getResponseData),
        options,
    )

const ELECTIVE_COURSE_KEY = "elective-course"
type ElectiveCourseKey = [typeof ELECTIVE_COURSE_KEY, number]

export const useElectiveCourse = (id: number, options: QueryOptions<ElectiveCourse, ElectiveCourseKey> = {}) =>
    useApiQuery<ElectiveCourse, ElectiveCourseKey>(
        [ELECTIVE_COURSE_KEY, id],
        () => electiveCoursesService.getElectiveCourse(id)
            .then(Api.getResponseData),
        options,
    )

export const useAddElectiveCourse = () => {
    const query = useQueryClient()

    return useApiMutation(
        (data: AddElectiveCourse) =>
            electiveCoursesService
                .addElectiveCourse(data)
                .then(Api.getResponseData),
        {
            onSuccess: () => {
                query.invalidateQueries([ELECTIVE_COURSES_KEY])
            }
        }
    )
}