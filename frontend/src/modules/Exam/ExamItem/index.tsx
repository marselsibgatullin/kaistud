import {FC, useEffect, useRef, useState} from "react";
import {Box, Button, TextField, Typography} from "@mui/material";
import {Form} from "../../../shared/components/Form";
import {useForm} from "react-hook-form";
import {
    ElectiveCourseExamQuestion
} from "../../../api/ElectiveCourseExamQuestionsService/ElectiveCourseExamQuestionsService.interface";
import {useValues} from "./useValues"
import {useDownloadFile, useUploadFile} from "../../../api/FileService/hooks";
import {FileInfo} from "../../../api/FileService/FileService.interface";
import {LoadingButton} from "@mui/lab";
import {useAddElectiveCourseExamAnswer} from "../../../api/ElectiveCourseExamAnswersService/hooks";
import {useRoles} from "../../../shared/hooks/useRoles";
import {Roles} from "../../../global/constants";

type ExamItemProps = {
    electiveCourseId?: number,
    studentElectiveCourseId?: number,
    question?: ElectiveCourseExamQuestion,
    index: number,
}
export const ExamItem: FC<ExamItemProps> = ({index, electiveCourseId, studentElectiveCourseId, question}) => {
    const [file, setFile] = useState<FileInfo | null>(null)
    const fileInput = useRef<HTMLInputElement | null>(null)
    const [saved, setSaved] = useState<boolean>(false)

    const {mutateAsync: upload, isLoading: isLoadingUpload, error: errorUpload} = useUploadFile()
    const {mutateAsync: download, isLoading: isLoadingDownload} = useDownloadFile()
    const userRoles = useRoles()
    const {mutateAsync: addAnswer, error, reset: resetError, isLoading: isLoadingAdd} = useAddElectiveCourseExamAnswer()
    const updateFile = (e: any) => {
        upload(e.target.files[0]).then((data) => setFile(data))
    }

    const downloadFile = () => {
    }

    const {reset, control, handleSubmit} = useForm({
        defaultValues: {
            question: "",
            answer: ""
        }
    })
    const {values} = useValues({question: question?.question ?? "", answer: ""})

    useEffect(() => {
        reset(values)
    }, [values, reset])

    const saveAnswer = (data: any) => {
        addAnswer({
            examQuestionId: question?.id!,
            studentElectiveCourseId: studentElectiveCourseId!,
            answer: data.answer,
            answerFileId: file?.id,
        }).then(() => setSaved(true))
    }

    return (
        <Box py={2}>
            <Typography pb={1}>
                Вопрос {index}
            </Typography>
            <Form control={control} onSubmit={handleSubmit(saveAnswer)}>
                <TextField style={{paddingBottom: 10}} label="Вопрос" name="question" size="small" multiline
                           inputProps={{readOnly: true}}/>
                <TextField inputProps={{readOnly: saved}} label="Ответ" name="answer" size="small" multiline/>
                {
                    userRoles.includes(Roles.Student) &&
                    <Box display="flex" justifyContent="space-between">
                        <Button variant="outlined" disabled={saved} component="label" sx={{my: 1}}>
                            {file?.name ?? "Выбрать файл"}
                            <input
                                onChange={updateFile}
                                hidden
                                ref={fileInput}
                                type="file"
                                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            />
                        </Button>
                        <LoadingButton variant="contained" disabled={saved} loading={isLoadingAdd} type="submit" sx={{my: 1}}>
                            Сохранить ответ
                        </LoadingButton>
                    </Box>
                }
                {
                    userRoles.includes(Roles.Teacher) &&
                    <Box>
                        <Typography component="span">
                            {}
                        </Typography>
                        <LoadingButton sx={{ my: 1 }} onClick={downloadFile} loading={isLoadingDownload} variant="outlined">
                            Скачать прикреплённый файл
                        </LoadingButton>
                    </Box>
                }
            </Form>
        </Box>
    )
}