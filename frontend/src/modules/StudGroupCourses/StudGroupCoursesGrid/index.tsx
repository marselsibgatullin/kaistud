import {Box, Button, Skeleton} from "@mui/material"
import {APP_LINKS} from "global/appLinks"
import {FC} from "react"
import {generatePath, useNavigate} from "react-router"
import {BaseTable} from "shared/components/Table"
import {useTableQuery} from "shared/hooks/useTableQuery"
import {AddModal} from "../AddModal"
import {Values} from "../useFilters";
import {useColumns} from "../useColumns";
import {useStudGroupCoursesContext} from "../context/studGroupCourses.context";
import {useStudGroupCourses} from "../../../api/StudGroupCoursesService/hooks";
import {StudGroupCourse} from "../../../api/StudGroupCoursesService/StudGroupCoursesService.interface";
import {useRoles} from "../../../shared/hooks/useRoles";
import {Roles} from "../../../global/constants";

export const StudGroupCoursesGrid: FC = () => {
    const navigate = useNavigate()

    const {query, setPage, setPerPage} = useTableQuery<Values>()
    const userRoles = useRoles()
    const {openAdd} = useStudGroupCoursesContext()

    const {data: studGroupCourses, isLoading: isLoadingStudGroupCourses} = useStudGroupCourses({
        start: query.page,
        length: query.perPage,
    })

    const onView = (data: StudGroupCourse) => {
        navigate(generatePath(APP_LINKS.StudGroupCourse, {id: (data.id).toString()}))
    }

    const columns = useColumns()

    return (
        <Box sx={{p: {xs: 2, md: 3}}}>
            {
                userRoles.includes(Roles.Admin) &&
                <Button onClick={openAdd} variant="outlined" sx={{my: 2}}>
                    Добавить
                </Button>
            }
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
            <AddModal/>
        </Box>
    )
}