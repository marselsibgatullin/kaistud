import React, { FC } from "react";
import {useHeaderTitle} from "../layout/Header/hooks/useHeaderTitle";
import {ElectiveCourseContextProvider} from "./context/electiveCourse.context";
import ElectiveCourseInfo from "./Information";

const ElectiveCoursePage: FC = () => {
    useHeaderTitle("Факультативный курс")

  return (
      <ElectiveCourseContextProvider>
          <ElectiveCourseInfo />
      </ElectiveCourseContextProvider>
  )
}

export default ElectiveCoursePage