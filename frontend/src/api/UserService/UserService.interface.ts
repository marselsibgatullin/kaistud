import { Roles } from "global/constants"

export type UsersFilters = {
  start?: number,
  length?: number,
  firstName?: string,
  lastName?: string,
  patronymic?: string,
  isBlocked?: boolean,
  email?: string,
  roles?: Roles[],
}

export type User = {
  id: string,
  fullName: string,
  email: string,
  blockDate: string,
}

export type RoleResponse = {
  name: string,
  description: string,
}

export type RolesFilter = {
  isAllRoles?: boolean,
}

export type UserFull = {
  id: string,
  firstName: string,
  lastName: string,
  patronymic: string,
  email: string,
  blockDate: string,
  roles: RoleResponse[],
  userName: string,
}

export type AddUserData = {
  roles: Roles[],
  firstNmae: string,
  lastName: string,
  patronymic?: string,
  userName: string,
  password: string,
  confirmPassword: string,
  email: string,
}

export type ChangePasswordData = {
  id: string,
  newPassword: string,
  newPasswordConfirm: string,
}

export type EditUserData = {
  id: string,
  roles: Roles[],
  firstName: string,
  lastName: string,
  patronymic?: string,
  blockDate: string,
}

export type BlockUserData = {
  id: string,
}
