import Cookies from "js-cookie"
import jwtDecode from "jwt-decode"
import { useLayoutEffect } from "react"
import { useState } from "react"
import { TokenData } from "../../api/AuthService/authService.interface"
import { ACCESS_TOKEN, Roles } from "../../global/constants"
import { useAuthContext } from "../../modules/AuthContext.context"

const getRoles = (token: string) => jwtDecode<TokenData>(token).roles.split(",") as Roles[]

export const useRoles = () => {
  const { isLoggedIn } = useAuthContext()

  const [roles, setRoles] = useState<Roles[]>([])

  useLayoutEffect(() => {
    const token = Cookies.get(ACCESS_TOKEN)
    setRoles(token ? getRoles(token) : [])
  }, [isLoggedIn])

  return roles
}
