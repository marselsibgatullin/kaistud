import { Box, Card, CircularProgress, Link, Typography } from "@mui/material";
import { useSystemInfo } from "api/SystemInfoService/hooks";
import { useHeaderTitle } from "modules/layout/Header/hooks/useHeaderTitle";
import { FC } from "react";
import { APP_VERSION, APP_VERSION_DATE, BASE_URL } from "../../global/constants";
import moment from "moment";

const AboutSystem: FC = () => {
  const { data: systemInfo, isLoading } = useSystemInfo()

  useHeaderTitle("О системе")

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Card variant="outlined" sx={{ p: 3 }}>
        {
          isLoading
            ? <CircularProgress />
            :
            <Box>
              <Box>
                <Typography component="span" variant="body2" fontWeight="bold">Версия сервера:</Typography>
                <Typography component="span" variant="body2"> v.{systemInfo?.apiReleaseVersion} (от {systemInfo?.apiReleaseDate})</Typography>
              </Box>
              <Box>
                <Typography component="span" variant="body2" fontWeight="bold">Версия клиентской части:</Typography>
                <Typography component="span" variant="body2"> v.{APP_VERSION} (от {moment(APP_VERSION_DATE).format("DD.MM.YYYY")})</Typography>
              </Box>
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  Руководство пользователя: <Link target="_blank" href={BASE_URL + systemInfo?.userGuide} variant="body2">скачать</Link>
                </Typography>
              </Box>
            </Box>
        }
      </Card >
    </Box >
  )
}

export default AboutSystem