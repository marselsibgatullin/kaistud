import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAddUser } from "api/UserService/hooks";
import { AddUserData } from "api/UserService/UserService.interface";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Form } from "shared/components/Form";
import { RolesSelect } from "shared/components/RolesSelect";
import { useUsersContext } from "../context/users.context";
import { useValues } from "./useValues";

export const AddModal: FC = () => {
	const { modalState, closeModal } = useUsersContext()

	const { mutateAsync: addUser, error, reset: resetError, isLoading: isLoadingAdd } = useAddUser()

	const { defaultValues } = useValues()
	const { control, reset, handleSubmit } = useForm<AddUserData>({ defaultValues })

	const add = (values: AddUserData) => {
		addUser(values)
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
						<Grid item xs={12} md={6} xl={4}>
							<TextField name="lastName" label="Фамилия" size="small" rules={{ required: true }} />
						</Grid>
						<Grid item xs={12} md={6} xl={4}>
							<TextField name="firstName" label="Имя" rules={{ required: true }} size="small" />
						</Grid>
						<Grid item xs={12} md={6} xl={4}>
							<TextField name="patronymic" label="Отчество" size="small" />
						</Grid>
						<Grid item xs={12} md={6} xl={4}>
							<TextField name="userName" label="Логин" rules={{ required: true }} size="small" autoComplete="new-password" />
						</Grid>
						<Grid item xs={12} md={6} xl={4}>
							<TextField name="password" label="Пароль" rules={{ required: true }} type="password" size="small" autoComplete="new-password" />
						</Grid>
						<Grid item xs={12} md={6} xl={4}>
							<TextField name="confirmPassword" label="Подтверждение пароля" rules={{ required: true }} size="small" autoComplete="new-password" />
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField name="email" label="Email" rules={{ required: true }} size="small" />
						</Grid>
						<Grid item xs={12} md={6}>
							<RolesSelect name="roles" label="Роли" />
						</Grid>
					</Grid>
					{error?.response?.data?.Detail &&
						<Typography color="error" textAlign="center" mt={2}>{error?.response?.data?.Detail}</Typography>}
				</DialogContent>

				<Divider />

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