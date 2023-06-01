import {FC, lazy, Suspense} from "react"
import {Navigate, Route, Routes} from "react-router-dom"
import {APP_LINKS} from "../global/appLinks"
import {LinearProgress} from "@mui/material"
import {AccessControl} from "shared/components/AccessControl"
import {Roles} from "global/constants"

const FullPageLayout = lazy(() => import("./layout/FullPageLayout"))
const BaseLayout = lazy(() => import("./layout/BaseLayout"))
const Login = lazy(() => import("./auth/Login"))
const NotFound = lazy(() => import("./NotFound"))
const Profile = lazy(() => import("./Profile"))
const Home = lazy(() => import("./Home"))
const AboutSystem = lazy(() => import("./AboutSystem"))
const Users = lazy(() => import("./Users"))
const User = lazy(() => import("./User"))
const Teachers = lazy(() => import("./Teachers"))
const Courses = lazy(() => import("./Courses"))
const StudGroupCourses = lazy(() => import("./StudGroupCourses"))
const ElectiveCourses = lazy(() => import("./ElectiveCourses"))
const ElectiveCourse = lazy(() => import("./ElectiveCourse"))
const MyElectiveCourses = lazy(() => import("./MyElectiveCourses"))
const Exam = lazy(() => import("./Exam"))
const Exams = lazy(() => import("./Exams"))

export const AppRouter: FC = () => {
    return (
        <Suspense fallback={<LinearProgress/>}>
            <Routes>
                <Route element={<BaseLayout/>}>
                    <Route path={APP_LINKS.Home} element={<Home/>}/>
                    <Route path={APP_LINKS.NotFound} element={<NotFound/>}/>
                    <Route path={APP_LINKS.AboutSystem} element={<AboutSystem/>}/>
                    <Route path={APP_LINKS.StudGroupCourses} element={<StudGroupCourses/>}/>
                    <Route path={APP_LINKS.Profile} element={
                        <AccessControl
                            auth
                            roles={[Roles.Student]}
                        >
                            <Profile />
                        </AccessControl>
                    }/>
                    <Route path={APP_LINKS.Users} element={
                        <AccessControl
                            auth
                            roles={[Roles.Admin]}
                        >
                            <Users/>
                        </AccessControl>
                    }/>
                    <Route path={APP_LINKS.User} element={
                        <AccessControl
                            auth
                            roles={[Roles.Admin]}
                        >
                            <User/>
                        </AccessControl>
                    }/>
                    <Route path={APP_LINKS.Teachers} element={
                        <AccessControl
                            auth
                            roles={[Roles.Admin]}
                        >
                            <Teachers/>
                        </AccessControl>
                    }/>
                    <Route path={APP_LINKS.Courses} element={
                        <AccessControl
                            auth
                            roles={[Roles.Admin]}
                        >
                            <Courses/>
                        </AccessControl>
                    }/>
                    <Route path={APP_LINKS.ElectiveCourses} element={
                        <AccessControl
                            auth
                            roles={[Roles.Student, Roles.Teacher]}
                        >
                            <ElectiveCourses/>
                        </AccessControl>
                    }/>
                    <Route path={APP_LINKS.ElectiveCourse} element={
                        <AccessControl
                            auth
                            roles={[Roles.Student, Roles.Teacher]}
                        >
                            <ElectiveCourse/>
                        </AccessControl>
                    }/>
                    <Route path={APP_LINKS.MyElectiveCourses} element={
                        <AccessControl
                            auth
                            roles={[Roles.Student]}
                        >
                            <MyElectiveCourses/>
                        </AccessControl>
                    }/>
                    <Route path={APP_LINKS.MyElectiveCourse} element={
                        <AccessControl
                            auth
                            roles={[Roles.Student]}
                        >
                            <ElectiveCourse/>
                        </AccessControl>
                    }/>
                    <Route path={APP_LINKS.Exam} element={
                        <AccessControl
                            auth
                            roles={[Roles.Student, Roles.Teacher]}
                        >
                            <Exam/>
                        </AccessControl>
                    }/>
                    <Route path={APP_LINKS.Exams} element={
                        <AccessControl
                            auth
                            roles={[Roles.Teacher]}
                        >
                            <Exams />
                        </AccessControl>
                    }/>
                </Route>

                <Route element={
                    <AccessControl
                        auth={false}
                        errorComponent={<Navigate to={APP_LINKS.Home}/>}
                    >
                        <FullPageLayout/>
                    </AccessControl>}
                >
                    <Route path={APP_LINKS.Login} element={<Login/>}/>
                </Route>

                <Route path="*" element={<Navigate to={APP_LINKS.NotFound} replace/>}/>
            </Routes>
        </Suspense>
    )
}
