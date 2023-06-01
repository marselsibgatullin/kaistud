import { LoadingButton } from "@mui/lab"
import { Box, Grid, Stack, TextField, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import { useEditPassword } from "api/UserService/hooks"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Form } from "shared/components/Form"

type Values = {
	newPassword: string,
	newPasswordConfirm: string,
}

type PasswordTabProps = {
	id: string,
}

export const PasswordTab: FC<PasswordTabProps> = ({ id }) => {
    const navigate = useNavigate()
	const { mutateAsync: editPassword, error, reset: resetError, isLoading: isLoadingEdit } = useEditPassword()
	const { handleSubmit, reset, control } = useForm<Values>({
		defaultValues: {
			newPassword: "",
			newPasswordConfirm: "",
		}
	})

	const edit = (data: Values) => {
		editPassword({ id, ...data })
			.then(() => {
				resetError()
				reset()
			})
	}
	return (
		<Box sx={{ py: 3 }}>
			<Form control={control} onSubmit={handleSubmit(edit)}>
				<Typography variant="h6" pb={2}>
					Пароль
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<TextField name="newPassword" label="Новый пароль" rules={{ required: true }} type="password" size="small" />
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField name="newPasswordConfirm" label="Подтверждения нового пароля" rules={{ required: true }} type="password" size="small" />
					</Grid>
				</Grid>
				{error?.response?.data?.Detail &&
					<Typography color="error" textAlign="center" mt={2}>{error?.response?.data?.Detail}</Typography>}
				<Stack mt={3} direction="row" spacing={2}>
					<LoadingButton type="submit" variant="text" loading={isLoadingEdit}>
						Сохранить
					</LoadingButton>
					<Button color="error" type="button" variant="text" onClick={() => navigate(-1)}>
						Назад
					</Button>
				</Stack>
			</Form>
		</Box >
	)
}