import {
    Box,
    Button,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material"
import {Dispatch, FC, MouseEvent, SetStateAction, useState, useEffect} from "react"
import styles from "./index.module.scss"
import {Link} from "react-router-dom"
import {APP_LINKS} from "global/appLinks"
import PersonIcon from '@mui/icons-material/Person'
import {useHeaderContext} from "./context/headerContext"
import {NAV_WIDTH, Roles} from "global/constants"
import logo from "shared/img/logo.png"
import {useProfile} from "api/AuthService/hooks"
import Logout from '@mui/icons-material/Logout'
import {useAuthContext} from "modules/AuthContext.context"
import {useRoles} from "shared/hooks/useRoles"
import {useUserRoles} from "api/UserService/hooks"
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import {useStudents} from "../../../api/StudentsService/hooks";

type HeaderProps = {
    isNavOpened: boolean,
    setIsNavOpened: Dispatch<SetStateAction<boolean>>,
}

export const Header: FC<HeaderProps> = ({isNavOpened, setIsNavOpened}) => {
    const {data: profile} = useProfile()
    const {title} = useHeaderContext()
    const {data: roles} = useUserRoles({isAllRoles: true})
    const userRoles = useRoles()
    const {data: students} = useStudents()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const {setSelectedGroup, selectedGroup} = useHeaderContext()

    const profileButton = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const closeMenu = () => {
        setAnchorEl(null)
    }

    const toggleNav = () => {
        setIsNavOpened(prev => !prev)
    }

    const {logout} = useAuthContext()

    const handleChange = (event: any) => {
        setSelectedGroup(event.target.value)
    }

    useEffect(() => {
        if (students?.data?.length) {
            setSelectedGroup(students.data[0].id);
        }
    }, [students, setSelectedGroup]);

    return (
        <header className={styles.header}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                    <IconButton onClick={toggleNav} className={styles["header__burger"]}>
                        {isNavOpened ? <MenuOpenIcon/> : <MenuIcon/>}
                    </IconButton>

                    <Box sx={{width: {md: NAV_WIDTH}}}>
                        <Link to={APP_LINKS.Home} className={styles["header__logo-link"]}>
                            <img src={logo} className={styles["header__logo"]} alt="logo"/>
                        </Link>
                    </Box>

                    <Typography sx={{display: {xs: "none", md: "block"}}} variant="button"
                                fontSize={17}>{title}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Box minWidth="150px">
                        {
                            userRoles.includes(Roles.Student) &&
                            <TextField label="Номер группы" size="small" select value={selectedGroup}
                                       onChange={handleChange}>
                                {students?.data?.map(student => (
                                    <MenuItem value={student.id} key={student.id}>{student.studGroupText}</MenuItem>
                                ))}
                            </TextField>
                        }
                    </Box>
                    <Button
                        color="light"
                        onClick={profileButton}
                        className={styles["header__profile-button"]}
                    >
                        {profile?.userName}
                    </Button>
                    <IconButton
                        color="primary"
                        onClick={profileButton}
                        className={styles["header__profile-button--mobile"]}
                    >
                        <PersonIcon/>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={!!anchorEl}
                        onClose={closeMenu}
                    >
                        <Box px={2} py={1} textAlign="center">
                            <Typography variant="body1">{profile?.userName}</Typography>
                        </Box>

                        <Divider/>

                        <Box px={2} py={1} textAlign="center">
                            Роли:
                            {userRoles.map((currentRole) =>
                                <Typography key={currentRole} variant="body1">
                                    {roles?.find((role) => role.name === currentRole)?.description}
                                </Typography>
                            )}
                        </Box>

                        <Divider/>

                        <MenuItem onClick={logout} sx={{justifyContent: "center"}}>
                            <ListItemIcon>
                                <Logout fontSize="small"/>
                            </ListItemIcon>
                            Выход
                        </MenuItem>
                    </Menu>
                </Stack>
            </Stack>
        </header>
    )
}