import {API} from "../axios"
import {Service} from "../service"
import {
    AddElectiveCourseExamQuestion,
    ElectiveCourseExamQuestion,
    ElectiveCourseExamQuestionsFilters
} from "./ElectiveCourseExamQuestionsService.interface";

class ElectiveCourseExamQuestionsService extends Service {
    readonly endpoints = {
        questions: "/List",
        add: "/Add",
    }

    constructor() {
        super({api: API})
        super.setPrefix("/ElectiveCourseExamQuestions")
    }

    getElectiveCourseExamQuestions(params?: ElectiveCourseExamQuestionsFilters) {
        return this.api.get<PaginationList<ElectiveCourseExamQuestion>>(this.endpoints.questions, {params})
    }

    addElectiveCourseExamQuestion(data: AddElectiveCourseExamQuestion) {
        return this.api.post<ElectiveCourseExamQuestion>(this.endpoints.add, data)
    }
}

export const electiveCourseExamQuestionsService = new ElectiveCourseExamQuestionsService()
