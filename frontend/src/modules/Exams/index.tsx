import {Box, Skeleton} from "@mui/material"
import {APP_LINKS} from "global/appLinks"
import {FC} from "react"
import {generatePath, useNavigate, useParams} from "react-router"
import {BaseTable} from "shared/components/Table"
import {useTableQuery} from "shared/hooks/useTableQuery"
import {Values} from "./useFilters";
import {useStudentElectiveCourses} from "../../api/StudentElectiveCoursesService/hooks";
import {useColumns} from "./useColumns";

const Exams: FC = () => {
    const navigate = useNavigate()

    const {query, setPage, setPerPage} = useTableQuery<Values>()

    const {data: studGroupCourses, isLoading: isLoadingStudGroupCourses} = useStudentElectiveCourses({
        start: query.page,
        length: query.perPage,
        electiveCourseId: query.electiveCourseId,
    })

    const onView = (data: any) => {
        navigate(generatePath(APP_LINKS.Exam))
    }

    const columns = useColumns()

    return (
        <Box sx={{p: {xs: 2, md: 3}}}>
            {
                isLoadingStudGroupCourses ?
                    <Skeleton animation="wave" variant="rounded" height={300}/>
                    :
                    <BaseTable
                        isViewable
                        onView={onView}
                        data={studGroupCourses?.data ?? []}
                        columns={columns}
                        count={studGroupCourses?.count ?? 0}
                        page={query.page}
                        perPage={query.perPage}
                        setPage={setPage}
                        setPerPage={setPerPage}
                    />
            }
        </Box>
    )
}

export default Exams