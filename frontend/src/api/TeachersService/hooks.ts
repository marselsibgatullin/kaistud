import {Api} from "api/axios"
import {QueryOptions, useApiMutation, useApiQuery} from "api/query"
import {useQueryClient} from "react-query"
import {AddTeacher, Teacher, TeachersFilters} from "./TeachersService.interface";
import {teachersService} from "./index";

export const TEACHERS_KEY = "teachers"
type TeachersKey = [typeof TEACHERS_KEY, TeachersFilters]

export const useTeachers = (
    data?: TeachersFilters,
    options: QueryOptions<PaginationList<Teacher>, TeachersKey> = {}
) =>
    useApiQuery<PaginationList<Teacher>, TeachersKey>(
        [TEACHERS_KEY, data ?? {}],
        () => teachersService.getTeachers(data).then(Api.getResponseData),
        options,
    )

const TEACHER_KEY = "teacher"
type TeacherKey = [typeof TEACHER_KEY, string]

export const useTeacher = (id: string, options: QueryOptions<Teacher, TeacherKey> = {}) =>
    useApiQuery<Teacher, TeacherKey>(
        [TEACHER_KEY, id],
        () => teachersService.getTeacher(id)
            .then(Api.getResponseData),
        options,
    )

export const useAddTeacher = () => {
    const query = useQueryClient()

    return useApiMutation(
        (data: AddTeacher) =>
            teachersService
                .addTeacher(data)
                .then(Api.getResponseData),
        {
            onSuccess: () => {
                query.invalidateQueries([TEACHERS_KEY])
            }
        }
    )
}