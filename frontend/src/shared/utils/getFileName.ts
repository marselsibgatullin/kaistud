import { AxiosResponse } from "axios";

export const getFileName = (response: AxiosResponse<Blob>) => decodeURIComponent(response.headers["content-disposition"]?.split("filename*=UTF-8''")[1]?.split(`;`)[0] ?? "")