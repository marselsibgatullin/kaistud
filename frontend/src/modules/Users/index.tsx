import { useHeaderTitle } from "modules/layout/Header/hooks/useHeaderTitle"
import { FC } from "react"
import { UsersContextProvider } from "./context/users.context"
import { UsersGrid } from "./UsersGrid"

const Users: FC = () => {
    useHeaderTitle("Пользователи")

    return (
        <UsersContextProvider>
            <UsersGrid />
        </UsersContextProvider>
    )
}

export default Users