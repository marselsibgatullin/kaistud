export type TeachersFilters = {
    start?: number,
    length?: number,
}

export type Teacher = {
    id: number,
    teacherFio: string,
    userId: string
}

export type AddTeacher = Omit<Teacher, "id">