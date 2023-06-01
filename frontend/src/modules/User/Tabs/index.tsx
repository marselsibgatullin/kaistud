import { Box, Card, Tab, Tabs } from "@mui/material"
import { useUser } from "api/UserService/hooks"
import { useHeaderTitle } from "modules/layout/Header/hooks/useHeaderTitle"
import { FC } from "react"
import { useParams } from "react-router"
import { useTab } from "shared/hooks/useTab"
import { getFullName } from "shared/utils/getFullName"
import { BlockModal } from "../BlockModal"
import { useValues } from "../useValues"
import { GeneralInfoTab } from "./GeneralInfoTab"
import { PasswordTab } from "./PasswordTab"

export const UserTabs: FC = () => {
	const { id } = useParams()

	const { data } = useUser(id!, { enabled: !!id })
	const { values } = useValues(data)

	const { tabIndex, handleChangeTab } = useTab()

	useHeaderTitle(`Пользователь ${getFullName(data)}`)

	return (
		<Box sx={{ p: { xs: 2, md: 3 } }}>
			<Card variant="outlined">
				<Tabs sx={{ px: { xs: 0, md: 3 } }} allowScrollButtonsMobile variant="scrollable" value={tabIndex} onChange={handleChangeTab}>
					<Tab label="Данные пользователя" />
					<Tab label="Пароль" />
				</Tabs>

				<Box sx={{ px: 3 }}>
					{tabIndex === 0 && <GeneralInfoTab values={values} user={data} />}
					{tabIndex === 1 && <PasswordTab id={id!} />}
				</Box>
			</Card>
			<BlockModal />
		</Box>
	)
}
