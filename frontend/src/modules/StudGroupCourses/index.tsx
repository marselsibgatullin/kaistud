import {FC} from "react";
import {StudGroupCoursesGrid} from "./StudGroupCoursesGrid";
import {useHeaderTitle} from "../layout/Header/hooks/useHeaderTitle";
import {StudGroupCoursesContextProvider} from "./context/studGroupCourses.context";

const CoursesPage: FC = () => {
    useHeaderTitle("Курсы")

    return (
        <StudGroupCoursesContextProvider>
            <StudGroupCoursesGrid/>
        </StudGroupCoursesContextProvider>
    )
}

export default CoursesPage