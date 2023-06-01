import { LinearProgress, useTheme } from "@mui/material"
import { APP_LINKS } from "global/appLinks"
import { FC, Suspense, useEffect, useMemo, useState } from "react"
import { Navigate, Outlet, useLocation } from "react-router"
import { AccessControl } from "shared/components/AccessControl"
import { checkIsMobile } from "shared/utils/checkIsMobile"
import { Header } from "../Header"
import { Nav } from "../Nav"
import styles from "./index.module.scss"

const BaseLayout: FC = () => {
  const { pathname, search } = useLocation()

  const authLink = useMemo(
    () => `${APP_LINKS.Login}?${new URLSearchParams({ returnUrl: pathname + search })}`,
    [pathname, search]
  )

  const theme = useTheme()
  const [isNavOpened, setIsNavOpened] = useState(false)
  const [isMobile, setIsMobile] = useState(checkIsMobile(theme))

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(checkIsMobile(theme))
    }

    window.addEventListener("resize", checkSize)

    return () => {
      window.removeEventListener("resize", checkSize)
    }
  }, [theme])

  return (
    <AccessControl auth errorComponent={<Navigate to={authLink} />}>
      <div className={styles["base-layout"]}>
        <Header isNavOpened={isNavOpened} setIsNavOpened={setIsNavOpened} />
        <div className={styles["base-layout__container"]}>
          <Nav isOpened={isNavOpened || !isMobile} setIsOpened={setIsNavOpened} isMobile={isMobile} />
          <main className={styles["base-layout__main"]}>
            <Suspense fallback={<LinearProgress />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
      </div>
    </AccessControl>
  )
}

export default BaseLayout