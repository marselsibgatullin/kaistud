export type ElectiveCoursesFilters = {
    start?: number,
    length?: number,
    teacherId?: number,
}

export type ElectiveCourse = {
    id: number,
    teacherText: string,
    name: string,
    description: string,
    competence: string,
    laboratoryWorksCount: number,
    teacherId: number,
    hasExams: boolean,
}

export type AddElectiveCourse = Omit<ElectiveCourse, "id" | "teacherText">