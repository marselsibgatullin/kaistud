import { API } from "../axios"
import { Service } from "../service"
import { AddUserData, BlockUserData, ChangePasswordData, EditUserData, RoleResponse, RolesFilter, User, UserFull, UsersFilters } from "./UserService.interface"

class UserService extends Service {
  readonly endpoints = {
    users: "/List",
    user: "/Get/:id",
    roles: "/Roles",
    add: "/Add",
    changePassword: "/ChangePassword",
    edit: "/Update",
    block: "/Block",
  }

  constructor() {
    super({ api: API })
    super.setPrefix("/Users")
  }

  getUsers(params: UsersFilters) {
    return this.api.get<PaginationList<User>>(this.endpoints.users, { params })
  }

  getUser(id: string) {
    return this.api.get<UserFull>(this.endpoints.user, { urlParams: { id } })
  }

  getRoles(params?: RolesFilter) {
    return this.api.get<RoleResponse[]>(this.endpoints.roles, { params })
  }

  addUser(data: AddUserData) {
    return this.api.post<UserFull>(this.endpoints.add, data)
  }

  changePassword(data: ChangePasswordData) {
    return this.api.put(this.endpoints.changePassword, data)
  }

  editUser(data: EditUserData) {
    return this.api.put<UserFull>(this.endpoints.edit, data)
  }

  blockUser(data: BlockUserData) {
    return this.api.put(this.endpoints.block, data)
  }
}

export const userService = new UserService()
