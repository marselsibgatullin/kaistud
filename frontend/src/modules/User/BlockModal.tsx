import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { useBlockUser } from "api/UserService/hooks";
import { FC, FormEventHandler, useEffect } from "react";
import { useUserContext } from "./context/user.context";

export const BlockModal: FC = () => {
  const { modalState, closeModal } = useUserContext()

  const { mutateAsync: blockUser, error, reset: resetError, isLoading: isLoadingBlock } = useBlockUser()

  const block: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (modalState.type !== "block") return

    blockUser({ id: modalState.user.id })
      .then(closeModal)
  }

  useEffect(() => {
    resetError()
  }, [modalState.type])

  return (
    <Dialog
      open={modalState.type === "block"}
      onClose={closeModal}
      maxWidth="sm"
      fullWidth
      keepMounted={false}
    >
      <form onSubmit={block}>
        <DialogTitle textAlign="center">Блокировка</DialogTitle>

        <DialogContent>
          <DialogContentText textAlign="center" color="black">
            Вы действительно хотите заблокировать пользователя {modalState.user?.firstName} {modalState.user?.lastName} {modalState.user?.patronymic} ({modalState.user?.email})?
          </DialogContentText>

          {error?.response?.data?.Detail &&
            <Typography color="error" textAlign="center" mt={2}>{error?.response?.data?.Detail}</Typography>}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeModal} variant="text">Отмена</Button>
          <LoadingButton type="submit" color="error" loading={isLoadingBlock}>Заблокировать</LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}