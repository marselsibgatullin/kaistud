import {AxiosPromise} from "axios"
import Cookies from "js-cookie"
import {ACCESS_TOKEN, EXPIRES, REFRESH_TOKEN} from "../../global/constants"
import {API} from "../axios"
import {Service} from "../service"
import {LoginData, Profile, UserData} from "./authService.interface"

const AUTH_COOKIE_EXPIRES = 180

class AuthService extends Service {
    private refreshRequest: AxiosPromise<UserData> | null = null

    readonly endpoints = {
        login: "/login",
        register: "/register",
        refresh: "/tokens/:refreshToken/refresh",
        userInfo: "/CurrentUserInfo",
    }

    constructor() {
        super({api: API})
        super.setPrefix("/Auth")
    }

    login(data: LoginData, isTeacher: boolean) {
        return this.api.post<UserData>(`${this.endpoints.login}?isTeacher=${isTeacher}`, data)
    }

    async refresh() {
        if (!this.refreshRequest) {
            this.refreshRequest = this.api.post<UserData>(this.endpoints.refresh, {}, {
                skipAuth: true,
                urlParams: {refreshToken: this.token.refreshToken ?? ""}
            })
        }

        const response = await this.refreshRequest

        this.refreshRequest = null

        return response
    }

    saveToken(data: UserData) {
        Cookies.set(ACCESS_TOKEN, data.accessToken, {expires: AUTH_COOKIE_EXPIRES})
        Cookies.set(REFRESH_TOKEN, data.refreshToken, {expires: AUTH_COOKIE_EXPIRES})
        Cookies.set(EXPIRES, String(Date.now() + +data.expires * 1000), {expires: AUTH_COOKIE_EXPIRES})
    }

    removeToken() {
        Cookies.remove(ACCESS_TOKEN)
        Cookies.remove(REFRESH_TOKEN)
        Cookies.remove(EXPIRES)
    }

    get token() {
        return {
            accessToken: Cookies.get(ACCESS_TOKEN),
            refreshToken: Cookies.get(REFRESH_TOKEN),
            expires: +(Cookies.get(EXPIRES) ?? 0),
        }
    }

    getProfile() {
        return this.api.get<Profile>(this.endpoints.userInfo)
    }
}

export const authService = new AuthService()
