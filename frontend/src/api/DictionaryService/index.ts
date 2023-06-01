import { API } from "../axios"
import { Service } from "../service"
import { Dictionary } from "./DictionaryService.interface"

class DictionaryService extends Service {
  readonly endpoints = {
    studGroups: "/StudGroups",
  }

  constructor() {
    super({ api: API })
  }

  getStudGroups() {
    return this.api.get<Dictionary[]>(this.endpoints.studGroups)
  }
}

export const dictionaryService = new DictionaryService()
