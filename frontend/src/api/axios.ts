import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError, RawAxiosRequestHeaders } from "axios";
import { API_BASE_URL } from "../global/constants";
import { authService } from "./AuthService";
import { stringify } from "qs";

export type ErrorData = {
  Detail: string,
}

export type ErrorResponse = AxiosError<ErrorData>

declare module "axios" {
  interface AxiosRequestConfig {
    urlParams?: { [key: string]: string | number },
    skipAuth?: boolean,
  }
}

function urlParamsMiddlaware(config: AxiosRequestConfig) {
  if (!config.urlParams) return config

  Object.keys(config.urlParams).forEach(key => {
    config.url = config.url?.replace(`:${key}`, String(config.urlParams?.[key]))
  })

  return config
}

function paramsMiddleware(config: AxiosRequestConfig) {
  if (!config.params) return config

  Object.keys(config.params).forEach(key => {
    if (config.params[key] === "") config.params[key] = undefined
  })

  return config
}

async function authMiddleware(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
  if (config.skipAuth) return config

  let accessToken = authService.token.accessToken

  if (!accessToken) return config

  if (Date.now() > authService.token.expires) {
    try {
      const response = await authService.refresh()

      accessToken = response.data.accessToken
      authService.saveToken(response.data)
    }
    catch (error) {
      const e = error as ErrorResponse

      const authFailed = new CustomEvent<AuthFailedEvent>("authFailed", {
        bubbles: true,
        detail: {
          message: e.response?.data.Detail || e.message,
          code: e.code,
        }
      })
      window.dispatchEvent(authFailed)

      throw new Error("Ошибка рефреш-токена")
    }
  }

  config.headers = {
    ...config.headers as RawAxiosRequestHeaders,
    Authorization: `Bearer ${accessToken}`
  }

  return config
}

function errorHandlerMiddleware(error: Error | AxiosError) {
  return Promise.reject(error)
}

function emptyStringToNull(data: any) {
  if ({}.toString.call(data) !== "[object Object]") return data

  Object.keys(data).forEach(key => {
    data[key] = emptyStringToNull(data[key])

    if (data[key] === "") data[key] = null
  })

  return data
}

export class Api {
  readonly baseUrl: string

  protected readonly api: AxiosInstance

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.api = axios.create({
      baseURL: baseUrl,
      timeout: 60_000,
      paramsSerializer: {
        serialize: params => stringify(params, { arrayFormat: "repeat" })
      }
    })

    this.api.interceptors.request.use(urlParamsMiddlaware)
    this.api.interceptors.request.use(paramsMiddleware)
    this.api.interceptors.request.use(authMiddleware)
    this.api.interceptors.response.use(response => response, errorHandlerMiddleware)
  }

  static getResponseData = <T>(response: AxiosResponse<T>) => response.data

  get<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.api.get<T, R, D>(url, config)
  }

  post<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D | undefined,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.api.post<T, R, D>(url, emptyStringToNull(data), config)
  }

  put<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D | undefined,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.api.put<T, R, D>(url, emptyStringToNull(data), config)
  }

  patch<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    data?: D | undefined,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.api.patch<T, R, D>(url, emptyStringToNull(data), config)
  }

  delete<T = any, R = AxiosResponse<T, any>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined
  ): Promise<R> {
    return this.api.delete<T, R, D>(url, config)
  }
}

export const API = new Api(API_BASE_URL)
