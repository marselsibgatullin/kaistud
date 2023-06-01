import {LoadingButton} from "@mui/lab";
import {Checkbox, FormControlLabel, Paper, Stack, TextField, Typography} from "@mui/material";
import {LoginData} from "api/AuthService/authService.interface";
import {useLogin} from "api/AuthService/hooks";
import {FC, useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Form} from "shared/components/Form";
import styles from "./index.module.scss";

const Login: FC = () => {
    const [isTeacher, setIsTeacher] = useState<boolean>(false)
    const {control, handleSubmit} = useForm<LoginData>({
        defaultValues: {
            userName: "",
            password: "",
        }
    })

    const {mutate: login, isLoading, error} = useLogin()

    const handleAdmin = (e: any) => {
        setIsTeacher(e.target.checked)
    }

    const onLogin = useCallback((data: LoginData) => {
        login({data, isTeacher: isTeacher})
    }, [login, isTeacher])

    return (
        <div className={styles["container"]}>
            <Paper className={styles["container__box"]}>
                <Typography variant="h5" textAlign="center">Войти</Typography>
                <Form control={control} onSubmit={handleSubmit(onLogin)}>
                    <Stack spacing={2} mt={2}>
                        <TextField name="userName" label="Логин" rules={{required: true}}
                                   InputLabelProps={{shrink: true}}/>
                        <TextField name="password" label="Пароль" rules={{required: true}} type="password"
                                   InputLabelProps={{shrink: true}}/>
                        <FormControlLabel
                            control={<Checkbox value={isTeacher} checked={isTeacher} onChange={handleAdmin}
                                               size="small"/>} label="Вход для учителей"/>

                        {error &&
                            <Typography color="error" textAlign="center">{error.response?.data.Detail}</Typography>}
                        <LoadingButton
                            fullWidth
                            color="error"
                            type="submit"
                            variant="contained"
                            loading={isLoading}
                        >
                            Войти
                        </LoadingButton>
                    </Stack>
                </Form>
            </Paper>
        </div>
    )
}

export default Login