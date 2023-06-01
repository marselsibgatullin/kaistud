import {useMemo} from "react";
import {ElectiveCourse} from "../../../api/ElectiveCoursesService/ElectiveCoursesService.interface";
import {
    StudentElectiveCourse
} from "../../../api/StudentElectiveCoursesService/StudentElectiveCoursesService.interface";

export type Values = {
    teacherText: string,
    name: string,
    description: string,
    competence: string,
    laboratoryWorksCount: number,
}

export const useValues = (electiveCourse?: ElectiveCourse | StudentElectiveCourse) => {
    const values: Values = useMemo(() => ({
        teacherText: electiveCourse?.teacherText ?? "",
        name: electiveCourse?.name ?? "",
        description: electiveCourse?.description ?? "",
        competence: electiveCourse?.competence ?? "",
        laboratoryWorksCount: electiveCourse?.laboratoryWorksCount ?? 0,
    }), [electiveCourse])

    return {values}
}