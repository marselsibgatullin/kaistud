import {Api} from "api/axios"
import {QueryOptions, useApiMutation, useApiQuery} from "api/query"
import {useQueryClient} from "react-query"
import {
    AddElectiveCourseExamAnswer,
    ElectiveCourseExamAnswer,
    ElectiveCourseExamAnswersFilters
} from "./ElectiveCourseExamAnswersService.interface";
import {electiveCourseExamAnswersService} from "./index";
import {useNotifications} from "../../shared/hooks/useNotifications";

export const ANSWERS_KEY = "answers"
type AnswersKey = [typeof ANSWERS_KEY, ElectiveCourseExamAnswersFilters]

export const useElectiveCourseExamAnswers = (
    data?: ElectiveCourseExamAnswersFilters,
    options: QueryOptions<PaginationList<ElectiveCourseExamAnswer>, AnswersKey> = {}
) =>
    useApiQuery<PaginationList<ElectiveCourseExamAnswer>, AnswersKey>(
        [ANSWERS_KEY, data ?? {}],
        () => electiveCourseExamAnswersService.getElectiveCourseExamAnswers(data).then(Api.getResponseData),
        options,
    )

export const useAddElectiveCourseExamAnswer = () => {
    const query = useQueryClient()
    const {notification} = useNotifications()

    return useApiMutation(
        (data: AddElectiveCourseExamAnswer) =>
            electiveCourseExamAnswersService
                .addElectiveCourseExamAnswer(data)
                .then(Api.getResponseData),
        {
            onSuccess: () => {
                notification.succes("Ответ сохранён.")
                query.invalidateQueries([ANSWERS_KEY])
            }
        }
    )
}