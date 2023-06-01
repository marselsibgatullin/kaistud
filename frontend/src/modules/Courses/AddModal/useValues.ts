import { useMemo } from "react"
import {AddCourse} from "../../../api/CoursesService/CoursesService.interface";

export const useValues = () => {
  const defaultValues: AddCourse = useMemo(() => ({
    name: "",
    description: "",
  }), [])

  return { defaultValues }
}