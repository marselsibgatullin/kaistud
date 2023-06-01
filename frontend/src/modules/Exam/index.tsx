import {FC} from "react";
import {useHeaderTitle} from "../layout/Header/hooks/useHeaderTitle";
import {Box, Card, Stack, TextField, Typography} from "@mui/material";
import useUrl from "../../shared/hooks/useUrl";
import {useElectiveCourseExamQuestions} from "../../api/ElectiveCourseExamQuestionsService/hooks";
import {ExamItem} from "./ExamItem";
import {useRoles} from "../../shared/hooks/useRoles";
import {Roles} from "../../global/constants";
import Grid from "@mui/material/Grid";
import {LoadingButton} from "@mui/lab";

const Exam: FC = () => {
    const {electiveCourseId, studentElectiveCourseId} = useUrl()
    useHeaderTitle("Экзамен")
    const userRoles = useRoles()
    const {data: questions} = useElectiveCourseExamQuestions({electiveCourseId: electiveCourseId}, {enabled: !!electiveCourseId})

    return (
        <Box sx={{p: {xs: 2, md: 3}}}>
            <Card variant="outlined" sx={{p: 3}}>
                <Typography variant="h6" mb={2}>
                    Экзаменационные вопросы
                </Typography>
                {
                    questions?.data?.map((question, index) =>
                        <ExamItem key={question.id} index={index + 1} question={question}
                                  electiveCourseId={electiveCourseId}
                                  studentElectiveCourseId={studentElectiveCourseId}/>
                    )
                }
                {
                    userRoles.includes(Roles.Teacher) &&
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Stack direction="row" spacing={2}>
                                <Box>
                                    <TextField type="number" label="Оценка" name="grade" size="small"/>
                                </Box>
                                <LoadingButton variant="contained" loading={false} type="submit">
                                    Сохранить оценку
                                </LoadingButton>
                            </Stack>
                        </Grid>
                    </Grid>
                }
            </Card>
        </Box>
    )
}

export default Exam