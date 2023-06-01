import { API } from "../axios"
import { Service } from "../service"
import { SystemInfo } from "./SystemInfoService.interface"

class SystemInfoService extends Service {
  readonly endpoints = {
    info: "",
  }

  constructor() {
    super({ api: API })
    super.setPrefix("/SystemInfo")
  }

  getSystemInfo() {
    return this.api.get<SystemInfo>(this.endpoints.info)
  }
}

export const systemInfoService = new SystemInfoService()
