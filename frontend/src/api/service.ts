import { Api } from "./axios"

export type ServiceData = {
  api: Api,
}

export abstract class Service {
  protected readonly api: Api

  private prefix: string = ""

  abstract readonly endpoints: { [key: string]: string }

  constructor({ api }: ServiceData) {
    this.api = api
  }

  protected setPrefix(prefix: string) {
    this.prefix = prefix

    Object.keys(this.endpoints).forEach(endpoint => {
      this.endpoints[endpoint] = this.prefix + this.endpoints[endpoint]
    })
  }
}
