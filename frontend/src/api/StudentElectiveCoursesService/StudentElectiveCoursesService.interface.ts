export type StudentElectiveCoursesFilters = {
    start?: number,
    length?: number,
    electiveCourseId?: number,
    studentId?: number,
}

export type StudentElectiveCourse = {
    id: number,
    electiveCourseText: string,
    studentText: string,
    grade: number,
    examDate: string,
    electiveCourseId: number,
    studentId: number,
    teacherText: string,
    name: string,
    description: string,
    competence: string,
    laboratoryWorksCount: number,
    hasExams: boolean,
}

export type AddStudentElectiveCourse = {
    electiveCourseId: number,
    studentId: number
}