import moment from "moment"
import { FC } from "react"
import Moment from "react-moment"
import "moment/locale/ru"
import { AppRouter } from "./modules/AppRouter"
import { AuthContextProvider } from "./modules/AuthContext.context"
import { useLocationSwitcher } from "./shared/hooks/useLocationSwitcher"
import CssBaseline from '@mui/material/CssBaseline'
import { StyledEngineProvider } from "@mui/material"
import { KaiStudTheme } from "./theme/kaistud"
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import { HeaderContextProvider } from "modules/layout/Header/context/headerContext"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from "@mui/x-date-pickers"
import { SnackbarProvider } from 'notistack'
import { DEFAULT_NOTIFICATION_DURATION } from "global/constants"
import { NotificationActions } from "shared/components/Notifications"

moment.locale("ru")
Moment.globalLocale = "ru"

export const App: FC = () => {
  useLocationSwitcher()

  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      variant="success"
      autoHideDuration={DEFAULT_NOTIFICATION_DURATION}
      action={NotificationActions}
    >
      <AuthContextProvider>
        <HeaderContextProvider>
          <StyledEngineProvider injectFirst>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <CssVarsProvider theme={KaiStudTheme}>
                <CssBaseline />
                <AppRouter />
              </CssVarsProvider>
            </LocalizationProvider>
          </StyledEngineProvider>
        </HeaderContextProvider>
      </AuthContextProvider>
    </SnackbarProvider>
  )
}
