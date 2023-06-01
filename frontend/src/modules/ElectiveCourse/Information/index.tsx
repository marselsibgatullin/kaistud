import {Box, Button, Card, TextField, Typography} from "@mui/material"
import Grid from "@mui/material/Grid"
import {Stack} from "@mui/system"
import {FC, useEffect} from "react"
import {useForm} from "react-hook-form"
import {generatePath, useNavigate, useParams} from "react-router"
import {Form} from "shared/components/Form"
import {useValues} from "./useValues"
import {useElectiveCourse} from "../../../api/ElectiveCoursesService/hooks";
import {ElectiveCourse} from "../../../api/ElectiveCoursesService/ElectiveCoursesService.interface";
import {useElectiveCourseContext} from "../context/electiveCourse.context";
import {AddModal} from "../AddModal";
import {
    useElectiveCourseExamQuestions
} from "../../../api/ElectiveCourseExamQuestionsService/hooks";
import {useRoles} from "../../../shared/hooks/useRoles";
import {Roles} from "../../../global/constants";
import {useHeaderContext} from "../../layout/Header/context/headerContext";
import {useAddStudentElectiveCourse, useStudentElectiveCourse} from "../../../api/StudentElectiveCoursesService/hooks";
import {LoadingButton} from "@mui/lab";
import {useLocation} from "react-router-dom";
import {APP_LINKS} from "../../../global/appLinks";

const ElectiveCourseInfo: FC = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {pathname} = useLocation()
    const isMyElective = pathname.split("/")[1] === APP_LINKS.MyElectiveCourse.split("/")[1]
    const {reset, control} = useForm<ElectiveCourse>({
        defaultValues: {
            teacherText: "",
            name: "",
            description: "",
            competence: "",
            laboratoryWorksCount: 0,
        }
    })
    const {
        mutateAsync: addElectiveCourse,
        isLoading: isLoadingAdd
    } = useAddStudentElectiveCourse()

    const {data: electiveCourse} = useElectiveCourse(+id!, {enabled: (!!id && !isMyElective)})
    const {data: studElectiveCourse} = useStudentElectiveCourse(+id!, {enabled: (!!id && isMyElective)})
    const {data: questions} = useElectiveCourseExamQuestions({electiveCourseId: +id!}, {enabled: !isMyElective})

    const {values} = useValues(isMyElective ? studElectiveCourse : electiveCourse)
    const userRoles = useRoles()
    const {selectedGroup} = useHeaderContext()

    useEffect(() => {
        reset(values)
    }, [values, reset])

    const {openAdd, openEdit} = useElectiveCourseContext()

    const onOpenAdd = () => {
        if (!electiveCourse) return

        openAdd(electiveCourse)
    }

    const onOpenEdit = () => {
        if (!questions?.count) return

        openEdit(questions.data)
    }

    const addCourse = () => {
        addElectiveCourse({
            electiveCourseId: +id!,
            studentId: +selectedGroup,
        })
    }

    const goToExam = () => {
        if (studElectiveCourse?.electiveCourseId)
            navigate({
                pathname: APP_LINKS.Exam,
                search: `?electiveCourseId=${studElectiveCourse?.electiveCourseId}&studentElectiveCourseId=${id}`,
            })
    };

    const goToExams = () => {
        if (electiveCourse?.id)
            navigate({
                pathname: APP_LINKS.Exams,
                search: `?electiveCourseId=${electiveCourse?.id}`,
            })
    };

    return (
        <Box sx={{p: {xs: 2, md: 3}}}>
            <Form control={control}>
                <Card variant="outlined" sx={{p: 3}}>
                    <Typography variant="h6" mb={3}>
                        Информация о факультативном курсе
                    </Typography>
                    <Grid container>
                        <Grid item xs={12} md={9} xl={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField name="name" label="Название" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="description" label="Описание курса" size="small" multiline

                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="competence" label="Компетенция" size="small" multiline
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="laboratoryWorksCount" label="Количество лабораторных работ"
                                               type="number" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="teacherText" label="Преподаватель" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Stack mt={3} direction="row" spacing={2}>
                        {
                            userRoles.includes(Roles.Student) && (
                                isMyElective ?
                                    <>
                                        {
                                            studElectiveCourse?.hasExams && !studElectiveCourse?.examDate &&
                                            <Button type="button" onClick={goToExam}>
                                                Пройти экзамен
                                            </Button>
                                        }
                                    </>
                                    :
                                    <>
                                        {
                                            <LoadingButton loading={isLoadingAdd} type="button" variant="contained"
                                                           onClick={addCourse}>
                                                Записаться на курс
                                            </LoadingButton>
                                        }
                                    </>
                            )
                        }
                        {
                            userRoles.includes(Roles.Teacher) &&
                            <>
                                <Button type="button" onClick={questions?.count ? onOpenEdit : onOpenAdd}>
                                    {questions?.count ? "Посмотреть вопросы" : "Создать экзамен"}
                                </Button>
                                {!!questions?.count &&
                                    <Button type="button" onClick={goToExams}>
                                        Посмотреть экзамен
                                    </Button>
                                }
                            </>
                        }
                        <Button color="error" type="button" variant="text" onClick={() => navigate(-1)}>
                            Назад
                        </Button>
                    </Stack>
                </Card>
            </Form>
            <AddModal/>
        </Box>
    )
}

export default ElectiveCourseInfo