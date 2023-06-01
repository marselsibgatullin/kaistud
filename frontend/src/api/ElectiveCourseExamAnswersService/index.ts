import {API} from "../axios"
import {Service} from "../service"
import {
    AddElectiveCourseExamAnswer, ElectiveCourseExamAnswer,
    ElectiveCourseExamAnswersFilters
} from "./ElectiveCourseExamAnswersService.interface";

class ElectiveCourseExamAnswersService extends Service {
    readonly endpoints = {
        answers: "/List",
        answer: "/Get/:id",
        add: "/Add",
    }

    constructor() {
        super({api: API})
        super.setPrefix("/ElectiveCourseExamAnswers")
    }

    getElectiveCourseExamAnswers(params?: ElectiveCourseExamAnswersFilters) {
        return this.api.get<PaginationList<ElectiveCourseExamAnswer>>(this.endpoints.answers, {params})
    }

    getElectiveCourseExamQuestion(id: number) {
        return this.api.get<ElectiveCourseExamAnswer>(this.endpoints.answer, {urlParams: {id}})
    }

    addElectiveCourseExamAnswer(data: AddElectiveCourseExamAnswer) {
        return this.api.post<ElectiveCourseExamAnswer>(this.endpoints.add, data)
    }
}

export const electiveCourseExamAnswersService = new ElectiveCourseExamAnswersService()
