export type ElectiveCourseExamAnswersFilters = {
    start?: number,
    length?: number,
    examQuestionId?: number,
    studentElectiveCourseId?: number,
}

export type ElectiveCourseExamAnswer = {
    id: number,
    examQuestionText: string,
    examQuestionId: number,
    studentElectiveCourseId: number,
    answer: string,
    answerFileId?: string
}

export type AddElectiveCourseExamAnswer = Omit<ElectiveCourseExamAnswer, "id" | "examQuestionText">