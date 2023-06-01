import { Api } from './../axios';
import { fileService } from './index';
import { useApiMutation } from "api/query"
import { getFileName } from "shared/utils/getFileName"

export const useDownloadFile = () => {
	return useApiMutation(
		(id: string) =>
			fileService
				.getFile(id)
				.then((response) => ({
					name: getFileName(response),
					file: response.data
				}))
	)
}

export const useUploadFile = () => {
	return useApiMutation(
		(file: File) =>
			fileService
				.uploadFile(file)
				.then(Api.getResponseData)
	)
}
