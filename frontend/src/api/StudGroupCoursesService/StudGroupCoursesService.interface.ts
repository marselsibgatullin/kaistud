export type StudGroupCoursesFilters = {
    start?: number,
    length?: number,
    studentId?: number,
    studGroupId?: number,
    teacherId?: number
}

export type StudGroupCourse = {
    id: number,
    courseText: string,
    courseDescription: string,
    studGroupText: string,
    teacherText: string,
    teacherId: number,
    courseId: number,
    studGroupId: number
}

export type AddStudGroupCourses = {
    teacherId: number | null,
    courseId: number | null,
    studGroupId: number | null
}