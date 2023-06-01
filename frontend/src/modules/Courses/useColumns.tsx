import { useMemo } from "react"
import { Column } from "shared/components/Table"
import {Course} from "../../api/CoursesService/CoursesService.interface";

export const useColumns = () => {
  const columns: Column<Course>[] = useMemo(() => [
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
  ], [])

  return columns
}