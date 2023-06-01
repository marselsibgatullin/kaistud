import { FC, ReactElement } from "react"
import { Roles } from "../../global/constants"
import { FCC } from "../../global/types"
import { useAuthContext } from "../../modules/AuthContext.context"
import { useRoles } from "../hooks/useRoles"

const ErrorView: FC = () => (
  <div>Ошибка доступа</div>
)

type AccessControlProps = {
  auth?: boolean | null,
  errorComponent?: ReactElement<any, any> | null,
  roles?: Roles[],
}

export const AccessControl: FCC<AccessControlProps> = ({
  auth = null,
  errorComponent,
  roles,
  children,
}) => {
  const { isLoggedIn } = useAuthContext()
  const userRoles = useRoles()

  const rolesAllowed = !roles || roles.some(role => userRoles.includes(role))
  const isAccessAllowed = auth === null || (!auth && !isLoggedIn) || (auth && isLoggedIn && rolesAllowed)

  if (isAccessAllowed) {
    return <>{children}</>
  }
  else {
    return errorComponent === null ? null : errorComponent ?? <ErrorView />
  }
}
