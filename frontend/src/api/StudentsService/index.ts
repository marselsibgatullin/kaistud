import {API} from "../axios"
import {Service} from "../service"
import {Student, StudentData, StudentsFilters} from "./StudentsService.interface";

class StudentsService extends Service {
    readonly endpoints = {
        students: "/List",
        student: "/Get/:id",
    }

    constructor() {
        super({api: API})
        super.setPrefix("/Students")
    }

    getStudents(params?: StudentsFilters) {
        return this.api.get<PaginationList<Student>>(this.endpoints.students, {params})
    }

    getStudent(id: number) {
        return this.api.get<StudentData>(this.endpoints.student, {urlParams: {id}})
    }
}

export const studentsService = new StudentsService()
