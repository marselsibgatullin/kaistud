import {API} from "../axios"
import {Service} from "../service"
import {AddElectiveCourse, ElectiveCourse, ElectiveCoursesFilters} from "./ElectiveCoursesService.interface";

class ElectiveCoursesService extends Service {
    readonly endpoints = {
        electiveCourses: "/List",
        electiveCourse: "/Get/:id",
        add: "/Add",
        edit: "/Update",
    }

    constructor() {
        super({api: API})
        super.setPrefix("/ElectiveCourses")
    }

    getElectiveCourses(params?: ElectiveCoursesFilters) {
        return this.api.get<PaginationList<ElectiveCourse>>(this.endpoints.electiveCourses, {params})
    }

    getElectiveCourse(id: number) {
        return this.api.get<ElectiveCourse>(this.endpoints.electiveCourse, {urlParams: {id}})
    }

    addElectiveCourse(data: AddElectiveCourse) {
        return this.api.post<ElectiveCourse>(this.endpoints.add, data)
    }
}

export const electiveCoursesService = new ElectiveCoursesService()
