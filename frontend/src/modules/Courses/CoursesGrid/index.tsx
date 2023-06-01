import {Box, Button, Skeleton} from "@mui/material"
import {APP_LINKS} from "global/appLinks"
import {FC} from "react"
import {generatePath, useNavigate} from "react-router"
import {BaseTable} from "shared/components/Table"
import {useTableQuery} from "shared/hooks/useTableQuery"
import {AddModal} from "../AddModal"
import {Values} from "../useFilters";
import {useColumns} from "../useColumns";
import {useCoursesContext} from "../context/сourses.context";
import {useCourses} from "../../../api/CoursesService/hooks";
import {Course} from "../../../api/CoursesService/CoursesService.interface";

export const CoursesGrid: FC = () => {
    const navigate = useNavigate()

    const {query, setPage, setPerPage} = useTableQuery<Values>()
    const {openAdd} = useCoursesContext()

    const {data: courses, isLoading: isLoadingCourses} = useCourses({
        start: query.page,
        length: query.perPage,
    })

    const onView = (data: Course) => {
        navigate(generatePath(APP_LINKS.Course, {id: (data.id).toString()}))
    }

    const columns = useColumns()

    return (
        <Box sx={{p: {xs: 2, md: 3}}}>
            <Button onClick={openAdd} variant="outlined" sx={{my: 2}}>
                Добавить
            </Button>
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
            <AddModal/>
        </Box>
    )
}