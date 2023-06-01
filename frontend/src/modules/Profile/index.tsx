import {FC, useEffect} from "react";
import {useHeaderTitle} from "../layout/Header/hooks/useHeaderTitle";
import {Box, Card, TextField, Typography} from "@mui/material";
import {Form} from "../../shared/components/Form";
import Grid from "@mui/material/Grid";
import {useForm} from "react-hook-form";
import {useStudent} from "../../api/StudentsService/hooks";
import {useHeaderContext} from "../layout/Header/context/headerContext";
import {useValues} from "./useValues";
import {StudentData} from "../../api/StudentsService/StudentsService.interface";

const ProfilePage: FC = () => {
    useHeaderTitle("Профиль")
    const {reset, control} = useForm<StudentData>({
        defaultValues: {
            studGroupText:"",
            studFio:"",
            status:"",
            profileName: "",
            specCode:"",
            specName: "",
            eduQualif: "",
            eduCycle:"",
            programForm: "",
            competitionType: "",
            eduLevel: "",
            instName: "",
            kafName: "",
            zach: "",
            predpr: "",
            rukFIO: "",
            rabTheme: "",
            rabProfile: ""
        }
    })
    const {selectedGroup} = useHeaderContext()
    const {data: profile} = useStudent(+selectedGroup)
    const {values} = useValues(profile)

    useEffect(() => {
        reset(values)
    }, [values, reset])

    return (
        <Box sx={{p: {xs: 2, md: 3}}}>
            <Form control={control}>
                <Card variant="outlined" sx={{p: 3}}>
                    <Typography variant="h6" mb={3}>
                        Информация о студенте
                    </Typography>
                    <Grid container>
                        <Grid item xs={12} md={9} xl={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField name="studGroupText" label="Номер группы" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="studFio" label="ФИО студента" size="small" multiline

                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="status" label="Статус" size="small" multiline
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="profileName" label="Название профиля" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="specCode" label="Код специальности" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="specName" label="Название специальности" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="eduQualif" label="Квалификация" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="eduCycle" label="Цикл обучения" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="programForm" label="Форма обучения" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="competitionType" label="Вид обучения" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="eduLevel" label="Уровень образования" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="instName" label="Название факультета" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="kafName" label="Название кафедры" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="zach" label="Номер зачетной книжки" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="predpr" label="Предприятие для целевиков" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="rukFIO" label="ФИО научного руководителя" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="rabTheme" label="Тема диплома/диссертации" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="rabProfile" label="Научная специализация (для аспирантов)" size="small"
                                               inputProps={{readOnly: true}}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Form>
        </Box>
    )
}

export default ProfilePage