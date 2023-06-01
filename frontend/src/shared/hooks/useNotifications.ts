import { useSnackbar, OptionsObject } from "notistack"
import { useMemo } from "react"

export const useNotifications = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const notification = useMemo(() => ({
    succes: (msg: string, options?: OptionsObject<"success">) => enqueueSnackbar(msg, { variant: "success", ...options }),
    warning: (msg: string, options?: OptionsObject<"warning">) => enqueueSnackbar(msg, { variant: "warning", ...options }),
    info: (msg: string, options?: OptionsObject<"info">) => enqueueSnackbar(msg, { variant: "info", ...options }),
    error: (msg: string, options?: OptionsObject<"error">) => enqueueSnackbar(msg, { variant: "error", ...options }),
    default: (msg: string, options?: OptionsObject<"default">) => enqueueSnackbar(msg, { variant: "default", ...options }),
  }), [enqueueSnackbar])

  return { notification, closeSnackbar }
}