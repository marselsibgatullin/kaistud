import {Box, Button, Skeleton} from "@mui/material"
import {APP_LINKS} from "global/appLinks"
import {FC} from "react"
import {generatePath, useNavigate} from "react-router"
import {BaseTable} from "shared/components/Table"
import {useTableQuery} from "shared/hooks/useTableQuery"
import {AddModal} from "../AddModal"
import {Values} from "../useFilters";
import {useColumns} from "../useColumns";
import {useElectiveCourses} from "../../../api/ElectiveCoursesService/hooks";
import {useRoles} from "../../../shared/hooks/useRoles";
import {useElectiveCoursesContext} from "../context/electiveCourses.context";
import {ElectiveCourse} from "../../../api/ElectiveCoursesService/ElectiveCoursesService.interface";
import {Roles} from "../../../global/constants";

export const ElectiveCoursesGrid: FC = () => {
    const navigate = useNavigate()
    const {query, setPage, setPerPage} = useTableQuery<Values>()

    const {openAdd} = useElectiveCoursesContext()
    const userRoles = useRoles()

    const {data: courses, isLoading: isLoadingCourses} = useElectiveCourses({
        start: query.page,
        length: query.perPage,
    })

    const onView = (data: ElectiveCourse) => {
        navigate(generatePath(APP_LINKS.ElectiveCourse, {id: (data.id).toString()}))
    }

    const columns = useColumns()

    return (
        <Box sx={{p: {xs: 2, md: 3}}}>
            {
                userRoles.includes(Roles.Teacher) &&
                <Button onClick={openAdd} variant="outlined" sx={{my: 2}}>
                    Добавить
                </Button>
            }
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