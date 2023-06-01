import {LoadingButton} from "@mui/lab";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider, Stack,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {FC, useState, useMemo} from "react";
import {useForm} from "react-hook-form";
import {Form} from "shared/components/Form";
import {Values} from "./useValues";
import {useElectiveCourseContext} from "../context/electiveCourse.context";
import {useAddElectiveCourseExamQuestion} from "../../../api/ElectiveCourseExamQuestionsService/hooks";
import {useRoles} from "../../../shared/hooks/useRoles";

export const AddModal: FC = () => {
    const {modalState, closeModal} = useElectiveCourseContext()

    const [questionsCount, setQuestionsCount] = useState(modalState.type === "edit" ? modalState.questions?.length : 1)

    const {
        mutateAsync: addElectiveCourseExamQuestion,
        error,
        reset: resetError,
        isLoading: isLoadingAdd
    } = useAddElectiveCourseExamQuestion()

    const {control, reset, handleSubmit} = useForm<Values>()

    const add = async (values: Values) => {
        if (modalState.course?.id) {
            const promises = Object.keys(values).map(key => {
                if (key.startsWith('question-')) {
                    return addElectiveCourseExamQuestion({
                        question: values[key],
                        electiveCourseId: +modalState.course?.id!
                    })
                }
                return Promise.resolve()
            })
            await Promise.all(promises)
            onCloseModal()
        }
    }

    const onCloseModal = () => {
        closeModal()
        reset()
        resetError()
        setQuestionsCount(1)
    }

    const questionElements = useMemo(() => {
        if (modalState.type === "edit") {
            return modalState.questions?.map((question, index) => (
                <Grid item xs={12} key={question.id}>
                    <TextField
                        name={`question-${question.id}`}
                        label={`Экзаменационный вопрос ${index + 1}`}
                        size="small"
                        defaultValue={question.question}
                        multiline
                        inputProps={{ readOnly: true }}
                    />
                </Grid>
            ));
        } else {
            const elements = [];
            for (let i = 0; i < questionsCount; i++) {
                elements.push(
                    <Grid item xs={12} key={i}>
                        <TextField
                            name={`question-${i}`}
                            label={`Экзаменационный вопрос ${i + 1}`}
                            size="small"
                            rules={{ required: true }}
                            multiline
                        />
                    </Grid>
                );
            }
            return elements;
        }
    }, [modalState.type, modalState.questions, questionsCount]);

    const incrementCount = () => setQuestionsCount(prev => prev + 1)
    const decrementCount = () => setQuestionsCount(prev => prev - 1)

    return (
        <Dialog
            open={modalState.type === "add" || modalState.type === "edit"}
            onClose={onCloseModal}
            maxWidth="md"
            fullWidth
            keepMounted={false}
        >
            <Form control={control} onSubmit={handleSubmit(add)}>
                <DialogTitle textAlign="center">{modalState.type === "edit" ? "Просмотр вопросов" : "Добавить вопросы"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} mt={1}>
                        {questionElements}
                    </Grid>
                    {
                        modalState.type === "add" &&
                        <Stack direction="row" mt={2} spacing={2}>
                            {
                                (questionsCount > 1) &&
                                <Button color="error" onClick={decrementCount} size="small">
                                    -
                                </Button>
                            }
                            <Button onClick={incrementCount} size="small">
                                +
                            </Button>
                        </Stack>
                    }
                    {error?.response?.data?.Detail &&
                        <Typography color="error" textAlign="center"
                                    mt={2}>{error?.response?.data?.Detail}</Typography>}
                </DialogContent>

                <Divider/>
                {
                    modalState.type === "add" ?
                        <DialogActions>
                            <Button variant="text" color="error" onClick={onCloseModal}>
                                Отменить
                            </Button>
                            <LoadingButton type="submit" variant="text" loading={isLoadingAdd}>
                                Создать
                            </LoadingButton>
                        </DialogActions>
                        :
                        <DialogActions>
                            <Button variant="text" color="error" onClick={onCloseModal}>
                                Закрыть
                            </Button>
                        </DialogActions>
                }
            </Form>
        </Dialog>
    )
}