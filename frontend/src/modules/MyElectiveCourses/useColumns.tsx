import { useMemo } from "react"
import { Column } from "shared/components/Table"
import moment from "moment";
import {StudentElectiveCourse} from "../../api/StudentElectiveCoursesService/StudentElectiveCoursesService.interface";

export const useColumns = () => {
  const columns: Column<StudentElectiveCourse>[] = useMemo(() => [
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
      title: "Оценка",
      dataKey: "grade",
      renderColumn: (grade) => grade
    },
    {
      title: "Дата экзамена",
      dataKey: "examDate",
      renderColumn: (examDate) => examDate ? moment(examDate).format("DD MMM YYYY") : ""
    },
  ], [])

  return columns
}