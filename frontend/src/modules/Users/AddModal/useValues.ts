import { AddUserData } from "api/UserService/UserService.interface"
import { Roles } from "global/constants"
import { useMemo } from "react"

export const useValues = () => {
  const defaultValues: AddUserData = useMemo(() => ({
    roles: [Roles.Student],
    firstNmae: "",
    lastName: "",
    patronymic: "",
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
  }), [])

  return { defaultValues }
}