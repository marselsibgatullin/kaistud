import { Moment } from "moment";

export const getMonthRange = (date: Moment) => ({
  start: date.format("YYYY-MM-01T00:00"),
  end: date.format(`YYYY-MM-${date.daysInMonth()}T23:59`)
})