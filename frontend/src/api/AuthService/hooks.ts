import { QueryOptions, useApiMutation, useApiQuery } from "api/query";
import { authService } from ".";
import { useAuthContext } from "../../modules/AuthContext.context";
import { Api } from "../axios";
import {LoginData, LoginMutationData, Profile} from "./authService.interface";

export const useLogin = () => {
    const { login } = useAuthContext()

    return useApiMutation(
        ({ data, isTeacher }: LoginMutationData) =>
            authService
                .login(data, isTeacher)
                .then(Api.getResponseData),
        {
            onSuccess: login,
        }
    )
}

export const PROFILE_KEY = "profile"
type ProfileKey = [typeof PROFILE_KEY]

export const useProfile = (options: QueryOptions<Profile, ProfileKey> = {}) => {
  const { isLoggedIn } = useAuthContext()

  return useApiQuery<Profile, ProfileKey>(
    [PROFILE_KEY],
    () => authService.getProfile().then(Api.getResponseData),
    {
      staleTime: 60 * 60 * 1000,
      cacheTime: 65 * 60 * 1000,
      ...options,
      enabled: isLoggedIn,
    }
  )
}