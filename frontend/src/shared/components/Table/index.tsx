import { useTheme } from '@mui/material/styles';
import { ReactNode, MouseEvent, ChangeEvent } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, IconButton, tableCellClasses, TableHead } from '@mui/material';
import styled from '@emotion/styled';
import View from '@mui/icons-material/Visibility';
import Scheduler from '@mui/icons-material/CalendarMonth';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

export const BaseTableCell = styled(TableCell)(() => {
	const theme = useTheme()

	return {
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.primary.main,
			color: theme.palette.common.white,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
		}
	}
})

export const BaseTableRow = styled(TableRow)(() => {
	const theme = useTheme()

	return {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
		// hide last border
		'&:last-child td, &:last-child th': {
			border: 0,
		},
	}
})
interface TablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (
		event: MouseEvent<HTMLButtonElement>,
		newPage: number,
	) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (
		event: MouseEvent<HTMLButtonElement>,
	) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page + 1 >= Math.ceil(count / rowsPerPage)}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page + 1 >= Math.ceil(count / rowsPerPage)}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
}

export type Column<RecordType extends Record<string, any>> = {
	key: string | number,
	dataKey?: undefined,
	title: string,
	renderColumn: (data: any, record: RecordType) => ReactNode,
	backgroundColor?: (data: any, record: RecordType) => string,
	color?: (data: any, record: RecordType) => string,
} | {
	key?: undefined,
	dataKey: string,
	title: string,
	renderColumn: (data: any, record: RecordType) => ReactNode,
	backgroundColor?: (data: any, record: RecordType) => string,
	color?: (data: any, record: RecordType) => string,
}

export type TableProps<T extends Record<string, any>> = {
	data: T[],
	columns: Column<T>[],
	count?: number,
	page?: number,
	perPage?: number,
	setPage?: any,
	setPerPage?: any,
	isViewable?: boolean,
	isEditable?: boolean,
	isScheduler?: boolean,
	isDeletable?: boolean,
	onView?: any,
	onEdit?: any,
	onScheduler?: any,
	onDelete?: any,
	noPagination?: boolean,
}

export const BaseTable = <T extends Record<string, any>>({
	data,
	columns,
	count,
	page = 1,
	perPage = 10,
	isDeletable = false,
	isViewable = false,
	isScheduler = false,
	isEditable = false,
	onView,
	onScheduler,
	onEdit,
	onDelete,
	setPage,
	setPerPage,
	noPagination = false
}: TableProps<T>) => {
	const handleChangePage = (
		event: MouseEvent<HTMLButtonElement> | null,
		newPage: number,
	) => {
		setPage(newPage + 1)
	};

	const handleChangeRowsPerPage = (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		if (!event.target.value)
			setPerPage(count)
		else
			setPerPage(parseInt(event.target.value, 10))
		setPage(1)
	};

	return (
		<TableContainer component={Paper} sx={{ overflow: "auto", maxWidth: "100%" }}>
			<Table size="small">
				<TableHead>
					<BaseTableRow>
						{(isEditable || isScheduler || isViewable || isDeletable) && <BaseTableCell style={{ width: 150 }} align="center"></BaseTableCell>}
						{
							columns.map((column) =>
								<BaseTableCell align="center" key={column.key ?? column.dataKey}>
									{column.title}
								</BaseTableCell>
							)
						}
					</BaseTableRow>
				</TableHead>
				<TableBody>
					{data.map((row, index) => (
						<BaseTableRow key={index}
							sx={{
								backgroundColor: `${row?.isDeleted ? "#e7c0c0 !important" : "transparent"}`,
							}}
						>
							{
								(isEditable || isScheduler || isViewable || isDeletable) &&
								<BaseTableCell>
									{
										isViewable &&
										<IconButton onClick={() => onView(row)} size="small" aria-label="view">
											<View />
										</IconButton>
									}
									{
										isScheduler &&
										<IconButton onClick={() => onScheduler(row)} size="small" aria-label="scheduler">
											<Scheduler />
										</IconButton>
									}
									{
										isEditable &&
										<IconButton onClick={() => onEdit(row)} size="small" aria-label="edit">
											<Edit />
										</IconButton>
									}
									{
										isDeletable &&
										<IconButton onClick={() => onDelete(row)} size="small" aria-label="delete">
											<Delete color='error' />
										</IconButton>
									}
								</BaseTableCell>
							}
							{
								columns.map((col) =>
									<BaseTableCell
										sx={{
											backgroundColor: `${col?.backgroundColor?.(col.dataKey ? row[col.dataKey] : undefined, row) ?? ""}`,
											color: `${col?.color?.(col.dataKey ? row[col.dataKey] : undefined, row) ?? ""}`,
										}}
										align="center" key={col.dataKey ?? col.key}>
										{col.renderColumn(col.dataKey ? row[col.dataKey] : undefined, row)}
									</BaseTableCell>
								)
							}
						</BaseTableRow>
					))}
					{!data?.length && (
						<TableRow>
							<BaseTableCell align="center" colSpan={columns.length + +(isEditable || isScheduler || isViewable || isDeletable)}>
								Список пуст
							</BaseTableCell>
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						{
							!noPagination && count !== undefined &&
							<TablePagination
								sx={{ width: "100%", overflow: "hidden" }}
								rowsPerPageOptions={[10, 25, 50, { label: 'Все', value: -1 }]}
								colSpan={columns.length + +(isEditable || isScheduler || isViewable || isDeletable)}
								count={count}
								rowsPerPage={perPage}
								page={page - 1}
								labelRowsPerPage={"Отображать по:"}
								SelectProps={{
									inputProps: {
										'aria-label': 'rows per page',
									},
									native: true,
								}}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
						}
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer >
	)
}
