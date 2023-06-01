import { FC } from "react";
import { Typography } from "@mui/material"
import styles from "./index.module.scss"
import {useHeaderTitle} from "../layout/Header/hooks/useHeaderTitle";

const NotFound: FC = () => {
    useHeaderTitle("")
  return (
    <div className={styles["not-found"]}>
      <Typography color="error" variant="h5">
        404 Страница не найдена
      </Typography>
    </div>
  )
}

export default NotFound