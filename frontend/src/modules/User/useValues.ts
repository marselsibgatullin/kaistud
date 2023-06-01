import { UserFull } from "api/UserService/UserService.interface";
import { Roles } from "global/constants";
import { useMemo } from "react";

export type Values = {
	id: string,
	roles: Roles[],
	firstName: string,
	lastName: string,
	patronymic?: string,
	blockDate: string,
	email: string,
	userName: string,
}

export const useValues = (user?: UserFull) => {
	const values: Values = useMemo(() => ({
		id: user?.id ?? "",
		roles: user?.roles?.map(x => x.name as Roles) ?? [Roles.Student],
		firstName: user?.firstName ?? "",
		lastName: user?.lastName ?? "",
		patronymic: user?.patronymic ?? "",
		blockDate: user?.blockDate ?? "",
		email: user?.email ?? "",
		userName: user?.userName ?? "",
	}), [user])

	return { values }
}