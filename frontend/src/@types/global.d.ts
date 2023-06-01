interface AuthFailedEvent {
  message?: string,
  code?: string,
}

interface WindowEventMap {
  "authFailed": CustomEvent<AuthFailedEvent>,
}

type PaginationList<T> = {
  data: T[],
  count: number,
}

type TimeObject = {
  ticks: number,
  days: number,
  hours: number,
  milliseconds: number,
  minutes: number,
  seconds: number,
  totalDays: number,
  totalHours: number,
  totalMilliseconds: number,
  totalMinutes: number,
  totalSeconds: number,
}