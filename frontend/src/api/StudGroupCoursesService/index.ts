import {API} from "../axios"
import {Service} from "../service"
import {AddStudGroupCourses, StudGroupCourse, StudGroupCoursesFilters} from "./StudGroupCoursesService.interface";

class StudGroupCoursesService extends Service {
    readonly endpoints = {
        courses: "/List",
        course: "/Get/:id",
        add: "/Add",
        edit: "/Update",
    }

    constructor() {
        super({api: API})
        super.setPrefix("/StudGroupCourses")
    }

    getStudGroupCourses(params: StudGroupCoursesFilters) {
        return this.api.get<PaginationList<StudGroupCourse>>(this.endpoints.courses, {params})
    }

    getStudGroupCourse(id: string) {
        return this.api.get<StudGroupCourse>(this.endpoints.course, {urlParams: {id}})
    }

    addStudGroupCourse(data: AddStudGroupCourses) {
        return this.api.post<StudGroupCourse>(this.endpoints.add, data)
    }
}

export const studGroupCoursesService = new StudGroupCoursesService()
