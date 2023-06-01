import {LoadingButton} from "@mui/lab";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {FC} from "react";
import {useForm} from "react-hook-form";
import {Form} from "shared/components/Form";
import {useValues} from "./useValues";
import {useCoursesContext} from "../context/сourses.context";
import {useAddCourse} from "../../../api/CoursesService/hooks";
import {AddCourse} from "../../../api/CoursesService/CoursesService.interface";

export const AddModal: FC = () => {
    const {modalState, closeModal} = useCoursesContext()

    const {mutateAsync: addCourse, error, reset: resetError, isLoading: isLoadingAdd} = useAddCourse()

    const {defaultValues} = useValues()
    const {control, reset, handleSubmit} = useForm<AddCourse>({defaultValues})

    const add = (values: AddCourse) => {
        addCourse(values)
            .then(() => {
                closeModal()
                reset()
                resetError()
            })
    }

    const onCloseModal = () => {
        closeModal()
        reset()
        resetError()
    }

    return (
        <Dialog
            open={modalState.type === "add"}
            onClose={onCloseModal}
            maxWidth="md"
            fullWidth
            keepMounted={false}
        >
            <Form control={control} onSubmit={handleSubmit(add)}>
                <DialogTitle textAlign="center">Создать</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12}>
                            <TextField name="name" label="Название курса" size="small" rules={{required: true}}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="description" label="Описание курса" size="small" rules={{required: true}} fullWidth multiline/>
                        </Grid>
                    </Grid>
                    {error?.response?.data?.Detail &&
                        <Typography color="error" textAlign="center"
                                    mt={2}>{error?.response?.data?.Detail}</Typography>}
                </DialogContent>

                <Divider/>

                <DialogActions>
                    <Button variant="text" color="error" onClick={onCloseModal}>
                        Отменить
                    </Button>
                    <LoadingButton type="submit" variant="text" loading={isLoadingAdd}>
                        Создать
                    </LoadingButton>
                </DialogActions>
            </Form>
        </Dialog>
    )
}