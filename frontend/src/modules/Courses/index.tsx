import { FC } from "react";
import {CoursesGrid} from "./CoursesGrid";
import {useHeaderTitle} from "../layout/Header/hooks/useHeaderTitle";
import {CoursesContextProvider} from "./context/сourses.context";

const CoursesPage: FC = () => {
    useHeaderTitle("Курсы")

  return (
      <CoursesContextProvider>
          <CoursesGrid />
      </CoursesContextProvider>
  )
}

export default CoursesPage