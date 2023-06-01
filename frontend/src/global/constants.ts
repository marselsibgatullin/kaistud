export const BASE_URL = process.env.REACT_APP_API_BASE_URL || ""
export const API_BASE_URL = BASE_URL + "/api"

export const ACCESS_TOKEN = "accessToken"
export const REFRESH_TOKEN = "refreshToken"
export const EXPIRES = "expires"

export const APP_VERSION = "1.01"
export const APP_VERSION_DATE = new Date(2023, 4, 8)

export enum Roles {
  Admin = "ADMIN",
  Student = "STUDENT",
  Teacher = "TEACHER",
}

export enum DateFormats {
  standart = "YYYY-MM-DDTHH-mm"
}

export const NAV_WIDTH = "260px"

export enum WorkloadTypes {
  Low = 30,
  Medium = 70,
  High = 99,
  Full = 100,
}

export const workloadTypesTitles: { [key in WorkloadTypes | "noWorkTime"]: string } = {
  [WorkloadTypes.Low]: "Свободно 70-100%",
  [WorkloadTypes.Medium]: "Свободно 30-70%",
  [WorkloadTypes.High]: "Свободно 1-30%",
  [WorkloadTypes.Full]: "Нет доступного времени",
  "noWorkTime": "Прием не ведется",
}

export const AVAILABLE_TIME_FROM = "08:00"
export const AVAILABLE_TIME_TO = "21:00"

export enum StatusTypes {
  New = 1,
  Confirmed = 2,
  Canceled = 3,
  Finished = 4,
}

export enum FileTypes {
  Contract = 1,
  Conclusion = 2,
}

export const DEFAULT_NOTIFICATION_DURATION = 4000

export enum ReportsTypes {
  AppointmentCount,
  AppointmentCancelCount,
  SpecialistAppointmentEmptyHours,
  DailyReports,
}

export const reportsTypesTitles: { [key in ReportsTypes]: string } = {
  [ReportsTypes.AppointmentCount]: "Количество записей",
  [ReportsTypes.AppointmentCancelCount]: "Количество отмен",
  [ReportsTypes.SpecialistAppointmentEmptyHours]: 'Количество "сгоревших" записей',
  [ReportsTypes.DailyReports]: 'Взаиморасчеты',
}
