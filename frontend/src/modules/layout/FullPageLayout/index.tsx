import { Container, LinearProgress } from "@mui/material";
import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";
import styles from "./index.module.scss"

const FullPageLayout: FC = () => {
  return (
    <div className={styles["full-page-layout"]}>
      <Container maxWidth="xl" className={styles["full-page-layout__container"]} component="main">
        <Suspense fallback={<LinearProgress />}>
          <Outlet />
        </Suspense>
      </Container>
    </div>
  )
}

export default FullPageLayout