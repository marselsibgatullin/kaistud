import { Roles } from "../../global/constants"

export type LoginData = {
  userName: string,
  password: string,
}

export type LoginMutationData = {
  data: LoginData,
  isTeacher: boolean,
};

export type UserData = {
  accessToken: string,
  refreshToken: string,
  expires: string,
}

export type TokenData = {
  roles: string,
}

export type Profile = {
  userName: string,
  email: string,
  isLastDayOfQ: boolean,
}