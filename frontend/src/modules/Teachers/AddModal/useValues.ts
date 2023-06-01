import { AddUserData } from "api/UserService/UserService.interface"
import { Roles } from "global/constants"
import { useMemo } from "react"
import {AddTeacher} from "../../../api/TeachersService/TeachersService.interface";

export const useValues = () => {
  const defaultValues: AddTeacher = useMemo(() => ({
    teacherFio: "",
    userId: "",
  }), [])

  return { defaultValues }
}