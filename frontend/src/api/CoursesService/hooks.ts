import {Api} from "api/axios"
import {QueryOptions, useApiMutation, useApiQuery} from "api/query"
import {useQueryClient} from "react-query"
import {AddCourse, Course, CoursesFilters} from "./CoursesService.interface";
import {coursesService} from "./index";

export const COURSES_KEY = "courses"
type CoursesKey = [typeof COURSES_KEY, CoursesFilters]

export const useCourses = (
    data?: CoursesFilters,
    options: QueryOptions<PaginationList<Course>, CoursesKey> = {}
) =>
    useApiQuery<PaginationList<Course>, CoursesKey>(
        [COURSES_KEY, data ?? {}],
        () => coursesService.getCourses(data).then(Api.getResponseData),
        options,
    )

const COURSE_KEY = "course"
type CourseKey = [typeof COURSE_KEY, string]

export const useCourse = (id: string, options: QueryOptions<Course, CourseKey> = {}) =>
    useApiQuery<Course, CourseKey>(
        [COURSE_KEY, id],
        () => coursesService.getCourse(id)
            .then(Api.getResponseData),
        options,
    )

export const useAddCourse = () => {
    const query = useQueryClient()

    return useApiMutation(
        (data: AddCourse) =>
            coursesService
                .addCourse(data)
                .then(Api.getResponseData),
        {
            onSuccess: () => {
                query.invalidateQueries([COURSES_KEY])
            }
        }
    )
}

/*export const useEditUser = () => {
  const query = useQueryClient()
  const { notification } = useNotifications()

  return useApiMutation(
    (data: Teacher) =>
      userService
          .editTeacher(data)
        .then(Api.getResponseData),
    {
      onSuccess: (data) => {
        query.invalidateQueries([TEACHERS_KEY])
        query.invalidateQueries([TEACHER_KEY, data.id])
        notification.succes("Учитель успешно отредактирован")
      }
    }
  )
}*/
