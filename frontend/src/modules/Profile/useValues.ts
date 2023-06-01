import {useMemo} from "react";
import {StudentData} from "../../api/StudentsService/StudentsService.interface";

export type Values = {
    studGroupText: string,
    studFio: string,
    status: string,
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

export const useValues = (profile?: StudentData) => {
    const values: Values = useMemo(() => ({
        studGroupText: profile?.studGroupText ?? "",
        studFio: profile?.studFio ?? "",
        status: profile?.status ?? "",
        profileName: profile?.profileName ?? "",
        specCode: profile?.specCode ?? "",
        specName: profile?.specName ?? "",
        eduQualif: profile?.eduQualif ?? "",
        eduCycle: profile?.eduCycle ?? "",
        programForm: profile?.programForm ?? "",
        competitionType: profile?.competitionType ?? "",
        eduLevel: profile?.eduLevel ?? "",
        instName: profile?.instName ?? "",
        kafName: profile?.kafName ?? "",
        zach: profile?.zach ?? "",
        predpr: profile?.predpr ?? "",
        rukFIO: profile?.rukFIO ?? "",
        rabTheme: profile?.rabTheme ?? "",
        rabProfile: profile?.rabProfile ?? ""
    }), [profile])

    return {values}
}