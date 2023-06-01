import {LoadingButton} from "@mui/lab";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider, MenuItem,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {FC} from "react";
import {useForm} from "react-hook-form";
import {Form} from "shared/components/Form";
import {useValues} from "./useValues";
import {useStudGroupCoursesContext} from "../context/studGroupCourses.context";
import {useAddStudGroupCourses} from "../../../api/StudGroupCoursesService/hooks";
import {AddStudGroupCourses} from "../../../api/StudGroupCoursesService/StudGroupCoursesService.interface";
import {useTeachers} from "../../../api/TeachersService/hooks";
import {useCourses} from "../../../api/CoursesService/hooks";
import {useStudGroups} from "../../../api/DictionaryService/hooks";

export const AddModal: FC = () => {
    const {modalState, closeModal} = useStudGroupCoursesContext()

    const {
        mutateAsync: addStudGroupCourses,
        error,
        reset: resetError,
        isLoading: isLoadingAdd
    } = useAddStudGroupCourses()

    const {data: teachers} = useTeachers()
    const {data: courses} = useCourses()
    const {data: studGroups} = useStudGroups()

    const {defaultValues} = useValues()
    const {control, reset, handleSubmit} = useForm<AddStudGroupCourses>({defaultValues})

    const add = (values: AddStudGroupCourses) => {
        addStudGroupCourses(values)
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
                        <Grid item xs={12} md={4}>
                            <TextField label="Преподаватель" rules={{required: true}} size="small" select name="teacherId">
                                <MenuItem value="">Не выбрано</MenuItem>
                                {teachers?.data?.map(teacher => (
                                    <MenuItem value={teacher.id} key={teacher.id}>{teacher.teacherFio}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField label="Курс" rules={{required: true}} size="small" select name="courseId">
                                <MenuItem value="">Не выбрано</MenuItem>
                                {courses?.data?.map(course => (
                                    <MenuItem value={course.id} key={course.id}>{course.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField label="Номер группы" rules={{required: true}} size="small" select name="studGroupId">
                                <MenuItem value="">Не выбрано</MenuItem>
                                {studGroups?.map(studGroup => (
                                    <MenuItem value={studGroup.id} key={studGroup.id}>{studGroup.value}</MenuItem>
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