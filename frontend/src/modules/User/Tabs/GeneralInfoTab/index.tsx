import { LoadingButton } from "@mui/lab"
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material"
import { useEditUser } from "api/UserService/hooks"
import { UserFull } from "api/UserService/UserService.interface"
import { useUserContext } from "modules/User/context/user.context"
import { Values } from "modules/User/useValues"
import moment from "moment"
import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Form } from "shared/components/Form"
import { RolesSelect } from "shared/components/RolesSelect"

type GeneralInfoTabProps = {
	values: Values,
	user?: UserFull,
}

export const GeneralInfoTab: FC<GeneralInfoTabProps> = ({
	values,
	user,
}) => {
	const navigate = useNavigate()
	const { mutateAsync: editUser, error, reset: resetError, isLoading: isLoadingEdit } = useEditUser()
	const { handleSubmit, reset, control } = useForm<Values>({ defaultValues: values })

	const { openBlock } = useUserContext()

	useEffect(() => {
		reset(values)
	}, [values, reset])

	const edit = (data: Values) => {
		editUser(data)
			.then(resetError)
	}

	const onOpenBlock = () => {
		if (!user) return

		openBlock(user)
	}

	return (
		<Box sx={{ py: 3 }}>
			<Form control={control} onSubmit={handleSubmit(edit)}>
				<Typography variant="h6" pb={2}>
					Общие данные
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6} xl={4}>
						<TextField name="lastName" label="Фамилия" rules={{ required: true }} size="small" />
					</Grid>
					<Grid item xs={12} md={6} xl={4}>
						<TextField name="firstName" label="Имя" rules={{ required: true }} size="small" />
					</Grid>
					<Grid item xs={12} md={6} xl={4}>
						<TextField name="patronymic" label="Отчество" size="small" />
					</Grid>
					<Grid item xs={12} md={6} xl={4}>
						<TextField name="userName" label="Логин" size="small" />
					</Grid>
					<Grid item xs={12} md={6} xl={4}>
						<TextField name="email" label="Email" rules={{ required: true }} size="small" />
					</Grid>
					<Grid item xs={12} md={6} xl={4}>
						<RolesSelect name="roles" label="Роли" />
					</Grid>
				</Grid>
				{error?.response?.data?.Detail &&
					<Typography color="error" textAlign="center" mt={2}>{error?.response?.data?.Detail}</Typography>}
				<Stack mt={3} direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="space-between">
					<Stack direction="row" spacing={2}>
						<LoadingButton type="submit" variant="text" loading={isLoadingEdit}>
							Сохранить
						</LoadingButton>
						<Button color="error" type="button" variant="text" onClick={() => navigate(-1)}>
							Назад
						</Button>
					</Stack>
					<Button variant="contained" color="error" onClick={onOpenBlock} disabled={!!user?.blockDate}>
						{user?.blockDate ? `Заблокирован ${moment(user.blockDate).format("DD.MM.YYYY HH:mm")}` : "Заблокировать"}
					</Button>
				</Stack>
			</Form>
		</Box>
	)
}