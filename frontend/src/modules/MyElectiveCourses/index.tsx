import {Box, Skeleton} from "@mui/material"
import {APP_LINKS} from "global/appLinks"
import {FC} from "react"
import {generatePath, useNavigate} from "react-router"
import {BaseTable} from "shared/components/Table"
import {useTableQuery} from "shared/hooks/useTableQuery"
import {Values} from "./useFilters";
import {useStudentElectiveCourses} from "../../api/StudentElectiveCoursesService/hooks";
import {useHeaderContext} from "../layout/Header/context/headerContext";
import {StudentElectiveCourse} from "../../api/StudentElectiveCoursesService/StudentElectiveCoursesService.interface";
import {useColumns} from "./useColumns";
import {useHeaderTitle} from "../layout/Header/hooks/useHeaderTitle";

const MyElectiveCourses: FC = () => {
    useHeaderTitle("Мои факультативные курсы")
    const navigate = useNavigate()

    const {query, setPage, setPerPage} = useTableQuery<Values>()
    const {selectedGroup} = useHeaderContext()

    const {data: courses, isLoading: isLoadingCourses} = useStudentElectiveCourses({
        start: query.page,
        length: query.perPage,
        studentId: selectedGroup ? selectedGroup : undefined,
    })

    const onView = (data: StudentElectiveCourse) => {
        navigate(generatePath(APP_LINKS.MyElectiveCourse, {id: (data.id).toString()}))
    }

    const columns = useColumns()

    return (
        <Box sx={{p: {xs: 2, md: 3}}}>
            {
                isLoadingCourses ?
                    <Skeleton animation="wave" variant="rounded" height={300}/>
                    :
                    <BaseTable
                        isViewable
                        onView={onView}
                        data={courses?.data ?? []}
                        columns={columns}
                        count={courses?.count ?? 0}
                        page={query.page}
                        perPage={query.perPage}
                        setPage={setPage}
                        setPerPage={setPerPage}
                    />
            }
        </Box>
    )
}

export default MyElectiveCourses