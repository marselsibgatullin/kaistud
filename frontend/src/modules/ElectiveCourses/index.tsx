import { FC } from "react";
import {ElectiveCoursesGrid} from "./ElectiveCoursesGrid";
import {useHeaderTitle} from "../layout/Header/hooks/useHeaderTitle";
import {ElectiveCoursesContextProvider} from "./context/electiveCourses.context";

const ElectiveCoursesPage: FC = () => {
    useHeaderTitle("Факультативные курсы")

  return (
      <ElectiveCoursesContextProvider>
          <ElectiveCoursesGrid />
      </ElectiveCoursesContextProvider>
  )
}

export default ElectiveCoursesPage