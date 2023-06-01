import {LoadingButton} from "@mui/lab";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useUsers} from "api/UserService/hooks";
import {FC} from "react";
import {useForm} from "react-hook-form";
import {Form} from "shared/components/Form";
import {useValues} from "./useValues";
import {useTeachersContext} from "../context/teachers.context";
import {useAddTeacher} from "../../../api/TeachersService/hooks";
import {AddTeacher} from "../../../api/TeachersService/TeachersService.interface";
import {Roles} from "../../../global/constants";

export const AddModal: FC = () => {
    const {modalState, closeModal} = useTeachersContext()
    const {data: users} = useUsers({roles: [Roles.Teacher]})

    const {mutateAsync: addTeacher, error, reset: resetError, isLoading: isLoadingAdd} = useAddTeacher()

    const {defaultValues} = useValues()
    const {control, reset, handleSubmit} = useForm<AddTeacher>({defaultValues})

    const add = (values: AddTeacher) => {
        addTeacher(values)
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
                        <Grid item xs={12} md={6}>
                            <TextField name="teacherFio" label="ФИО" size="small" rules={{required: true}}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField label="Пользователь" rules={{required: true}} size="small" select name="userId">
                                <MenuItem value="">Не выбрано</MenuItem>
                                {users?.data?.map(user => (
                                    <MenuItem value={user.id} key={user.id}>{user.fullName}</MenuItem>
                                ))}
                            </TextField>
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