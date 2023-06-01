import { useMemo } from "react"
import { Column } from "shared/components/Table"
import {Teacher} from "../../api/TeachersService/TeachersService.interface";

export const useColumns = () => {
  const columns: Column<Teacher>[] = useMemo(() => [
    {
      title: "ID",
      dataKey: "id",
      renderColumn: (id) => id
    },
    {
      title: "ФИО",
      dataKey: "teacherFio",
      renderColumn: (teacherFio) => teacherFio
    },
    {
      title: "User ID",
      dataKey: "userId",
      renderColumn: (userId) => userId
    }
  ], [])

  return columns
}