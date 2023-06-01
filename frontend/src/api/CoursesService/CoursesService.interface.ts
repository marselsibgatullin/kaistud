export type CoursesFilters = {
    start?: number,
    length?: number,
}

export type Course = {
    id: number,
    name: string,
    description: string
}

export type AddCourse = Omit<Course, "id">