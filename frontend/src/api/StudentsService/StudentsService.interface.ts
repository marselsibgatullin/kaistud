export type StudentsFilters = {
    start?: number,
    length?: number,
}

export type Student = {
    id: number,
    studFio: string,
    studGroupText: string
}

export type StudentData = {
    id: number,
    studGroupText: string,
    userId: string,
    outerId: number,
    studFio: string,
    status: string,
    studGroupId: number,
    profileName: string,
    specCode: string,
    specName: string,
    eduQualif: string,
    eduCycle: string,
    programForm: string,
    competitionType: string,
    eduLevel: string,
    instName: string,
    kafName: string,
    zach: string,
    predpr: string,
    rukFIO: string,
    rabTheme: string,
    rabProfile: string
}