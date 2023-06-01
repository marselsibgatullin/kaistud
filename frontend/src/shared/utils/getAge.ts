import moment from "moment";

export const getAge = (birthDate: string | undefined) =>
  birthDate ? moment().diff(moment(birthDate), "years", false) : "-"