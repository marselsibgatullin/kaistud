import { FC } from "react";
import {TeachersContextProvider} from "./context/teachers.context";
import {TeachersGrid} from "./TeachersGrid";
import {useHeaderTitle} from "../layout/Header/hooks/useHeaderTitle";

const TeachersPage: FC = () => {
    useHeaderTitle("Учителя")

  return (
      <TeachersContextProvider>
          <TeachersGrid />
      </TeachersContextProvider>
  )
}

export default TeachersPage