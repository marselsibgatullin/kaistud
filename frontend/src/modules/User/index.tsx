import { FC } from "react"
import { UserContextProvider } from "./context/user.context"
import { UserTabs } from "./Tabs"

const User: FC = () => {
	return (
		<UserContextProvider>
			<UserTabs />
		</UserContextProvider>
	)
}

export default User