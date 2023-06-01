import { IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close'
import { closeSnackbar, SnackbarKey } from 'notistack'

export const NotificationActions = (snackbarId: SnackbarKey) => (
  <IconButton onClick={() => closeSnackbar(snackbarId)} color="light">
    <CloseIcon color="disabled" />
  </IconButton>
)