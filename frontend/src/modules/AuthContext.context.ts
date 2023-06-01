import { useQueryClient } from 'react-query';
import { APP_LINKS } from "global/appLinks"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import useUrl from "shared/hooks/useUrl"
import { authService } from "../api/AuthService"
import { UserData } from "../api/AuthService/authService.interface"
import { createCallableCtx } from "../shared/utils/createCallableCtx"
import { PROFILE_KEY } from 'api/AuthService/hooks';

type AuthModalOptions = {
  redirectLink?: string,
}

const useHook = () => {
  const navigate = useNavigate()
  const { returnUrl } = useUrl()

  const query = useQueryClient()

  const [isLoggedIn, setIsLoggedIn] = useState(!!authService.token.accessToken)

  const openLogin = useCallback((options?: AuthModalOptions) => {
    let params = new URLSearchParams()
    if (options?.redirectLink) params.set("returnUrl", options.redirectLink)

    navigate({
      pathname: APP_LINKS.Login,
      search: params.toString(),
    })
  }, [navigate])

  const login = useCallback((data: UserData) => {
    setIsLoggedIn(true)
    authService.saveToken(data)
    if (returnUrl) {
      navigate(returnUrl)
    }
    query.invalidateQueries([PROFILE_KEY])
  }, [returnUrl, navigate, query])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    authService.removeToken()
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      window.addEventListener("authFailed", logout)
    }

    return () => {
      window.removeEventListener("authFailed", logout)
    }
  }, [isLoggedIn, logout])

  return {
    isLoggedIn,
    login,
    logout,
    openLogin,
  }
}

export const [useAuthContext, AuthContextProvider] = createCallableCtx(useHook, { name: "AuthContextProvider" })

