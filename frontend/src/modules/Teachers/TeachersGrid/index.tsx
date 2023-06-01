import {Box, Button, Skeleton} from "@mui/material"
import {APP_LINKS} from "global/appLinks"
import {FC} from "react"
import {generatePath, useNavigate} from "react-router"
import {BaseTable} from "shared/components/Table"
import {useTableQuery} from "shared/hooks/useTableQuery"
import {AddModal} from "../AddModal"
import {useTeachersContext} from "../context/teachers.context";
import {useTeachers} from "../../../api/TeachersService/hooks";
import {useFilters, Values} from "../useFilters";
import {useColumns} from "../useColumns";
import {Teacher} from "../../../api/TeachersService/TeachersService.interface";

export const TeachersGrid: FC = () => {
    const navigate = useNavigate()

    const {query, setPage, setPerPage} = useTableQuery<Values>()
    const {defaultValues, values} = useFilters(query)

    const {openAdd} = useTeachersContext()

    const {data: teachers, isLoading: isLoadingTeachers} = useTeachers({
        start: query.page,
        length: query.perPage,
    })

    const onView = (data: Teacher) => {
        navigate(generatePath(APP_LINKS.Teacher, {id: (data.id).toString()}))
    }

    const columns = useColumns()

    return (
        <Box sx={{p: {xs: 2, md: 3}}}>
            <Button onClick={openAdd} variant="outlined" sx={{my: 2}}>
                Добавить
            </Button>
            {
                isLoadingTeachers ?
                    <Skeleton animation="wave" variant="rounded" height={300}/>
                    :
                    <BaseTable
                        isViewable
                        onView={onView}
                        data={teachers?.data ?? []}
                        columns={columns}
                        count={teachers?.count ?? 0}
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