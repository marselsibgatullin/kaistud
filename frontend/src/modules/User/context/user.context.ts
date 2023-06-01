import { useCallback, useState } from "react"
import { createCallableCtx } from "shared/utils/createCallableCtx"
import { UserFull } from 'api/UserService/UserService.interface';

type ModalState = {
  type: "block",
  user: UserFull,
} | {
  type: null,
  user?: undefined,
}

const useHook = () => {
  const [modalState, setModalState] = useState<ModalState>({ type: null })

  const openBlock = useCallback((user: UserFull) => {
    setModalState({ type: "block", user })
  }, [])

  const closeModal = useCallback(() => {
    setModalState({ type: null })
  }, [])

  return {
    modalState,
    openBlock,
    closeModal,
  }
}

export const [useUserContext, UserContextProvider] = createCallableCtx(useHook, { name: "UserContextProvider" })

