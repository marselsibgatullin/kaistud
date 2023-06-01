import { Box, Button, Card, Skeleton, Stack, TextField } from "@mui/material"
import Grid from "@mui/material/Grid"
import { useUsers } from "api/UserService/hooks"
import { User } from "api/UserService/UserService.interface"
import { APP_LINKS } from "global/appLinks"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { generatePath, useNavigate } from "react-router"
import { Form } from "shared/components/Form"
import { RolesSelect } from "shared/components/RolesSelect"
import { BaseTable } from "shared/components/Table"
import { useTableQuery } from "shared/hooks/useTableQuery"
import { AddModal } from "../AddModal"
import { BlockModal } from "../BlockModal"
import { useUsersContext } from "../context/users.context"
import { useColumns } from "../useColumns"
import { useFilters, Values } from "../useFilters"

export const UsersGrid: FC = () => {
	const navigate = useNavigate()

	const { query, setFilters, setPage, setPerPage } = useTableQuery<Values>()
	const { defaultValues, values } = useFilters(query)
	const { handleSubmit, reset, control } = useForm<Values>({ defaultValues: values })

	const { openAdd, openBlock } = useUsersContext()

	const { data: users, isLoading: isLoadingUsers } = useUsers({
		start: query.page,
		length: query.perPage,
		firstName: query.firstName,
		lastName: query.lastName,
		email: query.email,
		roles: query.roles?.length ? query.roles : undefined,
	})

	const resetSearch = () => {
		reset(defaultValues)
		setFilters(defaultValues)
	}

	const onView = (data: User) => {
		navigate(generatePath(APP_LINKS.User, { id: (data.id).toString() }))
	}

	const columns = useColumns()

	return (
		<Box sx={{ p: { xs: 2, md: 3 } }}>
			<Form control={control} onSubmit={handleSubmit(setFilters)}>
				<Card variant="outlined" sx={{ p: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6} xl={3}>
							<TextField name="lastName" label="Фамилия" size="small" />
						</Grid>
						<Grid item xs={12} md={6} xl={3}>
							<TextField name="firstName" label="Имя" size="small" />
						</Grid>
						<Grid item xs={12} md={6} xl={3}>
							<TextField name="email" label="Email" size="small" />
						</Grid>
						<Grid item xs={12} md={6} xl={3}>
							<RolesSelect name="roles" label="Роли" />
						</Grid>
					</Grid>
					<Stack direction="row" spacing={2} sx={{ mt: 3 }}>
						<Button
							color="primary"
							type="submit"
						>
							Найти
						</Button>
						<Button onClick={resetSearch} color="secondary">
							Сбросить
						</Button>
					</Stack>
				</Card>
			</Form>
			<Button onClick={openAdd} variant="outlined" sx={{ my: 2 }}>
				Добавить
			</Button>
			{
				isLoadingUsers ?
					<Skeleton animation="wave" variant="rounded" height={300} />
					:
					<BaseTable
						isViewable
						isDeletable
						onView={onView}
						onDelete={openBlock}
						data={users?.data ?? []}
						columns={columns}
						count={users?.count ?? 0}
						page={query.page}
						perPage={query.perPage}
						setPage={setPage}
						setPerPage={setPerPage}
					/>
			}
			<AddModal />
			<BlockModal />
		</Box>
	)
}