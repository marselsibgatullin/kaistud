import { FileInfo } from './FileService.interface';
import { API } from "../axios"
import { Service } from "../service"

class FileService extends Service {
  readonly endpoints = {
    upload: "/",
    uploadMultiple: "/UploadMultiple",
    internalUpload: "/InternalUpload",
    download: "/:id",
    delete: "/:id",
  }

  constructor() {
    super({ api: API })
    super.setPrefix("/FileManager")
  }

  getFile(id: string) {
    return this.api.get<Blob>(this.endpoints.download, { urlParams: { id }, responseType: "arraybuffer" })
  }

  uploadFile(file: File) {
    let formData = new FormData()
    formData.append(file.name, file)

    return this.api.post<FileInfo>(this.endpoints.upload, formData)
  }
}

export const fileService = new FileService()
