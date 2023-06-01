import { useMemo } from "react"
import { Column } from "shared/components/Table"
import {ElectiveCourse} from "../../api/ElectiveCoursesService/ElectiveCoursesService.interface";

export const useColumns = () => {
  const columns: Column<ElectiveCourse>[] = useMemo(() => [
    {
      title: "ID",
      dataKey: "id",
      renderColumn: (id) => id
    },
    {
      title: "Название курса",
      dataKey: "name",
      renderColumn: (name) => name
    },
    {
      title: "ФИО преподавателя",
      dataKey: "teacherText",
      renderColumn: (teacherText) => teacherText
    },
  ], [])

  return columns
}