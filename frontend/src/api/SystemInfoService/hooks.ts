import { Api } from "api/axios"
import { QueryOptions, useApiQuery } from "api/query"
import { systemInfoService } from "."
import { SystemInfo } from "./SystemInfoService.interface"

const SYSTEMINFO_KEY = "system_info"
type SystemInfoKey = [typeof SYSTEMINFO_KEY]

export const useSystemInfo = (options: QueryOptions<SystemInfo, SystemInfoKey> = {}) => {
    return useApiQuery<SystemInfo, SystemInfoKey>(
        [SYSTEMINFO_KEY],
        () => systemInfoService.getSystemInfo().then(Api.getResponseData),
        {
            staleTime: 60 * 60 * 1000,
            cacheTime: 65 * 60 * 1000,
            ...options,
        }
    )
}