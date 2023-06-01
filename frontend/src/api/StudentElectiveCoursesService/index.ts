import {API} from "../axios"
import {Service} from "../service"
import {
    AddStudentElectiveCourse,
    StudentElectiveCourse,
    StudentElectiveCoursesFilters
} from "./StudentElectiveCoursesService.interface";

class StudentElectiveCoursesService extends Service {
    readonly endpoints = {
        studentElectiveCourses: "/List",
        studentElectiveCourse: "/Get/:id",
        add: "/Add"
    }

    constructor() {
        super({api: API})
        super.setPrefix("/StudentElectiveCourses")
    }

    getStudentElectiveCourses(params?: StudentElectiveCoursesFilters) {
        return this.api.get<PaginationList<StudentElectiveCourse>>(this.endpoints.studentElectiveCourses, {params})
    }

    getStudentElectiveCourse(id: number) {
        return this.api.get<StudentElectiveCourse>(this.endpoints.studentElectiveCourse, {urlParams: {id}})
    }

    addStudentElectiveCourse(data: AddStudentElectiveCourse) {
        return this.api.post<StudentElectiveCourse>(this.endpoints.add, data)
    }
}

export const studentElectiveCoursesService = new StudentElectiveCoursesService()
