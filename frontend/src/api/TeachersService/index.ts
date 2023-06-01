import {API} from "../axios"
import {Service} from "../service"
import {
    AddTeacher, Teacher, TeachersFilters,
} from "./TeachersService.interface"

class TeachersService extends Service {
    readonly endpoints = {
        teachers: "/List",
        teacher: "/Get/:id",
        add: "/Add",
        edit: "/Update",
    }

    constructor() {
        super({api: API})
        super.setPrefix("/Teachers")
    }

    getTeachers(params?: TeachersFilters) {
        return this.api.get<PaginationList<Teacher>>(this.endpoints.teachers, {params})
    }

    getTeacher(id: string) {
        return this.api.get<Teacher>(this.endpoints.teacher, {urlParams: {id}})
    }

    addTeacher(data: AddTeacher) {
        return this.api.post<Teacher>(this.endpoints.add, data)
    }
}

export const teachersService = new TeachersService()
