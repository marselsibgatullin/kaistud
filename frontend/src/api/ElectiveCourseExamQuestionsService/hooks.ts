import {Api} from "api/axios"
import {QueryOptions, useApiMutation, useApiQuery} from "api/query"
import {useQueryClient} from "react-query"
import {
    AddElectiveCourseExamQuestion,
    ElectiveCourseExamQuestion,
    ElectiveCourseExamQuestionsFilters
} from "./ElectiveCourseExamQuestionsService.interface";
import {electiveCourseExamQuestionsService} from "./index";

export const QUESTIONS_KEY = "questions"
type QuestionsKey = [typeof QUESTIONS_KEY, ElectiveCourseExamQuestionsFilters]

export const useElectiveCourseExamQuestions = (
    data?: ElectiveCourseExamQuestionsFilters,
    options: QueryOptions<PaginationList<ElectiveCourseExamQuestion>, QuestionsKey> = {}
) =>
    useApiQuery<PaginationList<ElectiveCourseExamQuestion>, QuestionsKey>(
        [QUESTIONS_KEY, data ?? {}],
        () => electiveCourseExamQuestionsService.getElectiveCourseExamQuestions(data).then(Api.getResponseData),
        options,
    )

export const useAddElectiveCourseExamQuestion = () => {
    const query = useQueryClient()

    return useApiMutation(
        (data: AddElectiveCourseExamQuestion) =>
            electiveCourseExamQuestionsService
                .addElectiveCourseExamQuestion(data)
                .then(Api.getResponseData),
        {
            onSuccess: () => {
                query.invalidateQueries([QUESTIONS_KEY])
            }
        }
    )
}