export type ElectiveCourseExamQuestionsFilters = {
    start?: number,
    length?: number,
    electiveCourseId?: number,
}

export type ElectiveCourseExamQuestion = {
    id: number,
    electiveCourseId: number,
    question: string
}

export type AddElectiveCourseExamQuestion = Omit<ElectiveCourseExamQuestion, "id">