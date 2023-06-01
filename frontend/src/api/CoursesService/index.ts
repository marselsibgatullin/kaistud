import {API} from "../axios"
import {Service} from "../service"
import {AddCourse, Course, CoursesFilters} from "./CoursesService.interface";

class CoursesService extends Service {
    readonly endpoints = {
        courses: "/List",
        course: "/Get/:id",
        add: "/Add",
        edit: "/Update",
    }

    constructor() {
        super({api: API})
        super.setPrefix("/Courses")
    }

    getCourses(params?: CoursesFilters) {
        return this.api.get<PaginationList<Course>>(this.endpoints.courses, {params})
    }

    getCourse(id: string) {
        return this.api.get<Course>(this.endpoints.course, {urlParams: {id}})
    }

    addCourse(data: AddCourse) {
        return this.api.post<Course>(this.endpoints.add, data)
    }
}

export const coursesService = new CoursesService()
