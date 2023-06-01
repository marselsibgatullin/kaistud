import {Api} from "api/axios"
import {QueryOptions, useApiQuery} from "api/query"
import {Student, StudentData, StudentsFilters} from "./StudentsService.interface";
import {studentsService} from "./index";

export const STUDENTS_KEY = "students"
type StudentsKey = [typeof STUDENTS_KEY, StudentsFilters]

export const useStudents = (
    data?: StudentsFilters,
    options: QueryOptions<PaginationList<Student>, StudentsKey> = {}
) =>
    useApiQuery<PaginationList<Student>, StudentsKey>(
        [STUDENTS_KEY, data ?? {}],
        () => studentsService.getStudents(data).then(Api.getResponseData),
        options,
    )

const STUDENT_KEY = "student"
type StudentKey = [typeof STUDENT_KEY, number]

export const useStudent = (id: number, options: QueryOptions<StudentData, StudentKey> = {}) =>
    useApiQuery<StudentData, StudentKey>(
        [STUDENT_KEY, id],
        () => studentsService.getStudent(id)
            .then(Api.getResponseData),
        options,
    )