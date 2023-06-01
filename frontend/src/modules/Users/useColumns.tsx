import { User } from "api/UserService/UserService.interface"
import moment from "moment"
import { useMemo } from "react"
import { Column } from "shared/components/Table"

export const useColumns = () => {
  const columns: Column<User>[] = useMemo(() => [
    {
      title: "ФИО",
      dataKey: "fullName",
      renderColumn: (fullName) => fullName
    },
    {
      title: "Email",
      dataKey: "email",
      renderColumn: (email) => email
    },
    {
      title: "Дата блокировки",
      dataKey: "blockDate",
      renderColumn: (blockDate) => blockDate ? moment(blockDate).format("DD.MM.YYYY HH:mm") : "-"
    },
  ], [])

  return columns
}