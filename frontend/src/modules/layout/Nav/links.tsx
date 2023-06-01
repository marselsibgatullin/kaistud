import { APP_LINKS } from "global/appLinks"
import SettingsIcon from '@mui/icons-material/Settings'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import { Roles } from "global/constants"
import Profile from '@mui/icons-material/AccountBox';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import BiotechIcon from '@mui/icons-material/Biotech';
import LinkIcon from '@mui/icons-material/Link';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import UpgradeIcon from '@mui/icons-material/Upgrade';

export type Link = {
  path: string,
  title: string,
  children: undefined,
  icon: any,
  roles: Roles[],
} | {
  path: undefined,
  title: string,
  children: Link[],
  icon: any,
  roles: Roles[],
}

export const links: Link[] = [
  {
    path: APP_LINKS.Profile,
    title: "Профиль",
    children: undefined,
    icon: <Profile />,
    roles: [Roles.Student],
  },
  {
    path: undefined,
    title: "Администрирование",
    icon: <SettingsIcon />,
    roles: [Roles.Admin],
    children: [
      {
        path: APP_LINKS.Users,
        title: "Пользователи",
        children: undefined,
        icon: <PersonSearchIcon />,
        roles: [Roles.Admin],
      },
      {
        path: APP_LINKS.Teachers,
        title: "Учителя",
        children: undefined,
        icon: <SupervisedUserCircleIcon />,
        roles: [Roles.Admin],
      },
      {
        path: APP_LINKS.Courses,
        title: "Курсы",
        children: undefined,
        icon: <BiotechIcon />,
        roles: [Roles.Admin],
      },
    ]
  },
  {
    path: APP_LINKS.StudGroupCourses,
    title: "Связка курсов",
    children: undefined,
    icon: <LinkIcon />,
    roles: [],
  },
  {
    path: APP_LINKS.ElectiveCourses,
    title: "Факультативные курсы",
    children: undefined,
    icon: <AccountBalanceIcon />,
    roles: [Roles.Student, Roles.Teacher],
  },
  {
    path: APP_LINKS.MyElectiveCourses,
    title: "Мои факультативные курсы",
    children: undefined,
    icon: <UpgradeIcon />,
    roles: [Roles.Student],
  },
]