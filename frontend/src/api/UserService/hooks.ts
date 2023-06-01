import {Api} from "api/axios"
import {QueryOptions, useApiMutation, useApiQuery} from "api/query"
import {useQueryClient} from "react-query"
import {userService} from "."
import {
    AddUserData,
    BlockUserData,
    ChangePasswordData,
    EditUserData,
    RoleResponse,
    RolesFilter,
    User,
    UserFull,
    UsersFilters
} from "./UserService.interface"
import {useNotifications} from "shared/hooks/useNotifications"

export const USERS_KEY = "users"
type UsersKey = [typeof USERS_KEY, UsersFilters]

export const useUsers = (
    data: UsersFilters,
    options: QueryOptions<PaginationList<User>, UsersKey> = {}
) =>
    useApiQuery<PaginationList<User>, UsersKey>(
        [USERS_KEY, data],
        () => userService.getUsers(data).then(Api.getResponseData),
        options,
    )

const USER_KEY = "user"
type UserKey = [typeof USER_KEY, string]

export const useUser = (id: string, options: QueryOptions<UserFull, UserKey> = {}) =>
    useApiQuery<UserFull, UserKey>(
        [USER_KEY, id],
        () => userService.getUser(id)
            .then(Api.getResponseData),
        options,
    )

export const useAddUser = () => {
    const query = useQueryClient()

    return useApiMutation(
        (data: AddUserData) =>
            userService
                .addUser(data)
                .then(Api.getResponseData),
        {
            onSuccess: () => {
                query.invalidateQueries([USERS_KEY])
            }
        }
    )
}

export const useEditUser = () => {
    const query = useQueryClient()
    const {notification} = useNotifications()

    return useApiMutation(
        (data: EditUserData) =>
            userService
                .editUser(data)
                .then(Api.getResponseData),
        {
            onSuccess: (data) => {
                query.invalidateQueries([USERS_KEY])
                query.invalidateQueries([USER_KEY, data.id])
                notification.succes("Пользователь успешно отредактирован")
            }
        }
    )
}

export const useBlockUser = () => {
    const query = useQueryClient()

    return useApiMutation(
        (data: BlockUserData) =>
            userService
                .blockUser(data)
                .then(Api.getResponseData),
        {
            onSuccess: (_, {id}) => {
                query.invalidateQueries([USERS_KEY])
                query.invalidateQueries([USER_KEY, id])
            }
        }
    )
}

const ROLES_KEY = "roles"
type RolesKey = [typeof ROLES_KEY, RolesFilter]

export const useUserRoles = (
    data: RolesFilter,
    options: QueryOptions<RoleResponse[], RolesKey> = {}
) =>
    useApiQuery<RoleResponse[], RolesKey>(
        [ROLES_KEY, data],
        () => userService.getRoles(data).then(Api.getResponseData),
        options,
    )

export const useEditPassword = () => {
    return useApiMutation(
        (data: ChangePasswordData) =>
            userService
                .changePassword(data)
                .then(Api.getResponseData),
    )
}
