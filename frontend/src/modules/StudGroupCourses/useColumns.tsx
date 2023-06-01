import { useMemo } from "react"
import { Column } from "shared/components/Table"
import {StudGroupCourse} from "../../api/StudGroupCoursesService/StudGroupCoursesService.interface";

export const useColumns = () => {
  const columns: Column<StudGroupCourse>[] = useMemo(() => [
    {
      title: "ID",
      dataKey: "id",
      renderColumn: (id) => id
    },
    {
      title: "Название курса",
      dataKey: "courseText",
      renderColumn: (courseText) => courseText
    },
    {
      title: "Номер группы",
      dataKey: "studGroupText",
      renderColumn: (studGroupText) => studGroupText
    },
    {
      title: "Преподаватель",
      dataKey: "teacherText",
      renderColumn: (teacherText) => teacherText
    },
  ], [])

  return columns
}